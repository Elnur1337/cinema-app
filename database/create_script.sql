CREATE DATABASE cinema_app CHARACTER SET UTF8MB4;
USE cinema_app;

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL
);

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(20) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE movies (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TMDB_id INT NOT NULL UNIQUE
);

CREATE TABLE hall_types (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(10) NOT NULL
);

CREATE TABLE halls (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES hall_types(id)
);

CREATE TABLE screening_types (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(20) NOT NULL
);

CREATE TABLE screening_visions (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vision_name VARCHAR(10) NOT NULL
);

CREATE TABLE screenings (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    starting_date_time TIMESTAMP NOT NULL,
    ending_date_time TIMESTAMP NOT NULL,
    first_pause BOOL NOT NULL,
    second_pause BOOL NOT NULL,
    ticket_price DECIMAL(5,2) NOT NULL,
    private_screening BOOL NOT NULL,
    hall_id INT NOT NULL,
    movie_id INT NOT NULL,
    type_id INT NOT NULL,
    vision_id INT NOT NULL,
    FOREIGN KEY (hall_id) REFERENCES halls(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (type_id) REFERENCES screening_types(id),
    FOREIGN KEY (vision_id) REFERENCES screening_visions(id)
);

CREATE TABLE private_screening_reqs (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    starting_date_time TIMESTAMP NOT NULL,
    first_pause BOOL NOT NULL,
    second_pause BOOL NOT NULL,
    people_number INT NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    is_accepted BOOL NOT NULL,
    TMDB_id INT NOT NULL,
    hall_id INT NOT NULL,
    user_id INT NOT NULL,
    vision_id INT NOT NULL,
    FOREIGN KEY (hall_id) REFERENCES halls(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vision_id) REFERENCES screening_visions(id)
);

CREATE TABLE seat_types (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(15) NOT NULL
);

CREATE TABLE seats (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    hall_id INT NOT NULL,
    FOREIGN KEY (hall_id) REFERENCES halls(id),
    FOREIGN KEY (type_id) REFERENCES seat_types(id)
);

CREATE TABLE taken_seats (
	screening_id INT NOT NULL,
    seat_id INT NOT NULL,
    user_id INT,
    PRIMARY KEY (screening_id, seat_id),
    FOREIGN KEY (screening_id) REFERENCES screenings(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);