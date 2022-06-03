const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { copyFileSync } = require('fs');

app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
    host: 'localhost',
    // port: 3305,
    // user: 'root',
    // password: 'Amerdelic1.',
    user: 'elnurdev',
    password: 'elnurdev',
    database: 'cinema_app'
});

app.post('/getuser', (req, res)  => {
    const email = req.body.localEmail;
    const pass = req.body.localPassword;
    const query = 'SELECT users.id, CONCAT(users.first_name, " ", users.last_name) AS username, roles.role_name FROM users JOIN roles ON users.role_id = roles.id WHERE email = ? AND pass = ?';
    database.query(query, [email, pass], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/getscreenings', (req, res) => {
    const query = `
        SELECT 
            screenings.id, 
            DATE_FORMAT(screenings.starting_date_time, "%M %e - %k:%i") AS starting_date_time, 
            DATE_FORMAT(screenings.ending_date_time, "%M %e - %k:%i") AS ending_date_time, 
            screenings.first_pause, 
            screenings.second_pause, 
            screenings.hall_id, 
            screenings.ticket_price, 
            movies.TMDB_id, 
            screening_types.type_name,
            DAYNAME(screenings.starting_date_time) AS day_name,
            screening_visions.vision_name
        FROM screenings 
        JOIN movies ON screenings.movie_id = movies.id 
        JOIN screening_types ON screenings.type_id = screening_types.id 
        JOIN screening_visions ON screenings.vision_id = screening_visions.id
        WHERE screenings.starting_date_time > NOW();
        `;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.post('/getscreenings', (req, res) => {
    const movieId = req.body.movie_id;
    const query = `
        SELECT 
            screenings.id, 
            DATE_FORMAT(screenings.starting_date_time, "%M %e - %k:%i") AS starting_date_time, 
            DATE_FORMAT(screenings.ending_date_time, "%M %e - %k:%i") AS ending_date_time,  
            screenings.hall_id, 
            movies.TMDB_id, 
            screening_types.type_name,
            DAYNAME(screenings.starting_date_time) AS day_name,
            screening_visions.vision_name
        FROM screenings 
        JOIN movies ON screenings.movie_id = movies.id 
        JOIN screening_types ON screenings.type_id = screening_types.id 
        JOIN screening_visions ON screenings.vision_id = screening_visions.id
        WHERE 
            screenings.starting_date_time > NOW()
            AND
            movies.TMDB_id = ?;
        `;
        database.query(query, [movieId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.get('/getmovies', (req, res) => {
    const query = `
        SELECT  
            DISTINCT movies.TMDB_id, 
            DAYNAME(screenings.starting_date_time) AS day_name
        FROM screenings 
        JOIN movies ON screenings.movie_id = movies.id 
        JOIN screening_types ON screenings.type_id = screening_types.id 
        WHERE screenings.starting_date_time > NOW() AND screening_types.type_name != 'Private';
        `;
    database.query(query, [], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.post('/getscreeningdata', (req, res) => {
    const screeningId = req.body.screening_id;
    const hallId = req.body.hall_id;
    const query = `
    SELECT
        seats.id,
        seat_types.type_name,
        CASE WHEN taken_seats.screening_id IS NOT NULL 
            THEN 'Taken'
            ELSE 'Not taken'
        END AS is_taken
    FROM seats
    JOIN seat_types ON seats.type_id = seat_types.id
    LEFT JOIN taken_seats ON taken_seats.seat_id = seats.id AND taken_seats.screening_id = ?
    WHERE seats.hall_id = ?
    ORDER BY seats.id;
    `;
    database.query(query, [screeningId, hallId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.post('/sellticket', (req, res) => {
    const screeningId = req.body.screening_id;
    const seatId = req.body.seat_id;
    const query = 'INSERT INTO taken_seats(screening_id, seat_id, user_id) VALUES (?, ?, NULL);';
    database.query(query, [screeningId, seatId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
app.get('/getads', (req, res) => {
    const query = `
        SELECT  
            DISTINCT movies.TMDB_id
        FROM screenings 
        JOIN movies ON screenings.movie_id = movies.id 
        JOIN screening_types ON screenings.type_id = screening_types.id 
        WHERE screenings.starting_date_time > NOW();
        `;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
app.get('/gethalls', (req, res) => {
    const query = `
        SELECT
            halls.id,
            hall_types.type_name
        FROM halls
        JOIN hall_types ON halls.type_id = hall_types.id;
    `;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
app.get('/getscreeningtypes', (req, res) => {
    const query = "SELECT * FROM screening_types WHERE type_name != 'Private'";
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
app.post('/addscreening', (req, res) => {
    console.log(req.body);
    let firstPause = 0, secondPause = 0;
    let runtime = req.body.movieRuntime;
    if (req.body.secondPause) {
        runtime += 15;
        secondPause  = 1;
    }
    if (req.body.firstPause) {
        runtime += 15;
        firstPause = 1;
    }
    const query = `
        SELECT *
        FROM screenings
        WHERE 
            hall_id = ${req.body.selectedHall}
            AND
            (
            "${req.body.startingDateTime}" BETWEEN starting_date_time AND ending_date_time
            OR
		    (SELECT DATE_ADD("${req.body.startingDateTime}", INTERVAL ${runtime} MINUTE)) BETWEEN starting_date_time AND ending_date_time
            )
        `;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result[0]) {
                res.send("Time is already taken!");
            } else {
                let movieId;
                const query = `SELECT id FROM movies WHERE TMDB_id = ${req.body.selectedMovieId}`;
                database.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result[0]) {
                            const query = `
                                        INSERT INTO screenings(starting_date_time, ending_date_time, first_pause, second_pause, ticket_price, hall_id, movie_id, type_id, vision_id)
                                        VALUES ("${req.body.startingDateTime}", DATE_ADD("${req.body.startingDateTime}", INTERVAL ${runtime} MINUTE), ${firstPause}, ${secondPause}, ${req.body.ticketPrice}, ${req.body.selectedHall}, ${result[0].id}, ${req.body.selectedType}, ${req.body.selectedVision})`;
                            database.query(query, (err,result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send("Screening added!");
                                }
                            });
                        } else {
                            const query = `INSERT INTO movies(TMDB_id) VALUES (${req.body.selectedMovieId})`;
                            database.query(query, (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    const query = `SELECT id FROM movies WHERE TMDB_id = ${req.body.selectedMovieId}`;
                                    database.query(query, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            const query = `
                                                INSERT INTO screenings(starting_date_time, ending_date_time, first_pause, second_pause, ticket_price, hall_id, movie_id, type_id, vision_id)
                                                VALUES ("${req.body.startingDateTime}", DATE_ADD("${req.body.startingDateTime}", INTERVAL ${runtime} MINUTE), ${firstPause}, ${secondPause}, ${req.body.ticketPrice}, ${req.body.selectedHall}, ${result[0].id}, ${req.body.selectedType}, ${req.body.selectedVision})`;
                                            database.query(query, (err,result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    res.send("Screening added!");
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    })
})

app.post('/makeprivatereq', (req, res) => {
    console.log(req.body);
    let firstPause = 0, secondPause = 0;
    let runtime = req.body.movieRuntime;
    if (req.body.secondPause) {
        runtime += 15;
        secondPause  = 1;
    }
    if (req.body.firstPause) {
        runtime += 15;
        firstPause = 1;
    }
   const query = `
        SELECT *
        FROM screenings
        WHERE 
            hall_id = ${req.body.selectedHall}
            AND
            (
            "${req.body.startingDateTime}" BETWEEN starting_date_time AND ending_date_time
            OR
		    (SELECT DATE_ADD("${req.body.startingDateTime}", INTERVAL ${runtime} MINUTE)) BETWEEN starting_date_time AND ending_date_time
            )
        `;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result[0]) {
                res.send("Time is already taken!");
            } else {
                const query = `
                            INSERT INTO private_screening_reqs(starting_date_time, first_pause, second_pause, people_number, price, is_accepted, TMDB_id, hall_id, user_id, vision_id)
                            VALUES ("${req.body.startingDateTime}", ${firstPause}, ${secondPause}, ${req.body.numberOfPeople}, 150, 0, ${req.body.selectedMovieId}, ${req.body.selectedHall}, ${req.body.userId}, ${req.body.selectedVision})`;
                database.query(query, (err,result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send("Request made!");
                    }
                });
            }
        }
    });
})

app.get('/getprivatereqs', (req, res) => {
    const query = 'SELECT *, DATE_FORMAT(starting_date_time, "%M %e - %k:%i") AS starting_date_time_formated FROM private_screening_reqs WHERE is_accepted = 0 AND starting_date_time > NOW()';
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
app.post('/acceptreq', (req, res) => {
    const id = req.body.id;
    const query = `UPDATE private_screening_reqs SET is_accepted = 1 WHERE id = ${id};`;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
})
app.post('/declinereq', (req, res) => {
    const id = req.body.id;
    const query = `UPDATE private_screening_reqs SET is_accepted = 2 WHERE id = ${id};`;
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
})
app.post('/register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const birthdate = req.body.birthdate;

    const query = `
                INSERT INTO users(first_name, last_name, birthdate, email, pass, phone_number, role_id)
                VALUES ('${firstName}', '${lastName}', '${birthdate}', '${email}', '${password}', '${phoneNumber}', 1);`;
    database.query(query, (err, result) => {
        if (err) {
            res.send(err.code);
        } else {
            res.send(result);
        }
    })
})
app.post('/buyticket', (req, res) => {
    const screeningId = req.body.screening_id;
    const seatId = req.body.seat_id;
    const userId = req.body.user_id;
    const query = 'INSERT INTO taken_seats(screening_id, seat_id, user_id) VALUES (?, ?, ?);';
    database.query(query, [screeningId, seatId, userId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})
app.listen(3001, () => {
    console.log('Server running on port 3001!');
});