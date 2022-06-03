const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'elnurdev',
    password: 'elnurdev',
    database: 'cinema_app'
});

let query = 'INSERT INTO seats(type_id, hall_id) VALUES (1, 1)';
for (let counter = 0; counter < 99; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (2, 1)';
for (let counter = 0; counter < 13; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (3, 1)';
for (let counter = 0; counter < 13; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (1, 2)';
for (let counter = 0; counter < 111; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (2, 2)';
for (let counter = 0; counter < 10; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (3, 2)';
for (let counter = 0; counter < 10; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (1, 3)';
for (let counter = 0; counter < 111; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (2, 3)';
for (let counter = 0; counter < 10; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (3, 3)';
for (let counter = 0; counter < 10; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

query = 'INSERT INTO seats(type_id, hall_id) VALUES (1, 4)';
for (let counter = 0; counter < 128; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (2, 4)';
for (let counter = 0; counter < 16; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (3, 4)';
for (let counter = 0; counter < 16; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

query = 'INSERT INTO seats(type_id, hall_id) VALUES (1, 5)';
for (let counter = 0; counter < 66; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (2, 5)';
for (let counter = 0; counter < 11; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
query = 'INSERT INTO seats(type_id, hall_id) VALUES (3, 5)';
for (let counter = 0; counter < 11; counter++) {
    database.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

database.end(() => {
    console.log("Konekcija prekinuta!");
});