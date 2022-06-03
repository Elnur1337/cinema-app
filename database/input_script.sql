INSERT INTO roles (role_name) VALUES ('Member'), ('Moderator'), ('Administrator');
INSERT INTO hall_types (type_name) VALUES ('2D'), ('2D Extreme'), ('3D'), ('3D Extreme'), ('Real 3D'), ('4DX');
INSERT INTO halls (type_id) VALUES (1), (2), (2), (5), (6);
INSERT INTO screening_types (type_name) VALUES ('Normal'), ('Premiere'), ('Prepremiere'), ('Late night'), ('Kids'), ('Private');
INSERT INTO seat_types (type_name) VALUES ('Normal'), ('VIP'), ('LoveBox');
INSERT INTO screening_visions (vision_name) VALUES ('2D'), ('2D Extreme'), ('3D'), ('3D Extreme'), ('Real 3D'), ('4DX');
INSERT INTO users (first_name, last_name, birthdate, email, pass, phone_number, role_id) VALUES
('Elnur', 'Bjelić', '2002-11-09', 'elnur.bjelic1337@gmail.com', 'elnurdev', '0603179304', 3),
('Amer', 'Delić', '2003-10-22', 'amer.delic1337@gmail.com', '12345', '555333', 1);
INSERT INTO 
screenings(id, starting_date_time, ending_date_time, first_pause, second_pause, ticket_price, private_screening, hall_id, movie_id, type_id, vision_id) 
VALUES 
(9,'2022-05-30 18:00:00','2022-05-30 20:06:00',0,0,8.00,0,2,1,2,2),
(10,'2022-05-30 22:50:00','2022-05-31 00:56:00',0,0,12.00,0,5,1,1,5),
(11,'2022-05-30 22:50:00','2022-05-31 00:56:00',0,0,8.00,0,2,1,1,2),
(12,'2022-05-30 22:50:00','2022-05-31 00:56:00',0,0,10.00,0,4,1,1,4),
(13,'2022-05-31 22:50:00','2022-06-01 00:56:00',0,0,10.00,0,4,1,1,4),
(14,'2022-05-31 22:50:00','2022-06-01 00:56:00',0,0,10.00,0,5,1,1,4),
(15,'2022-05-31 20:30:00','2022-05-31 22:36:00',0,0,10.00,0,2,1,4,2),
(16,'2022-05-31 18:00:00','2022-05-31 20:07:00',0,0,8.00,0,2,3,1,2),
(17,'2022-05-31 18:00:00','2022-05-31 20:07:00',0,0,8.00,0,1,3,1,2),
(18,'2022-05-31 18:00:00','2022-05-31 20:07:00',0,0,8.00,0,4,3,1,2),
(19,'2022-05-31 18:00:00','2022-05-31 20:07:00',0,0,8.00,0,3,3,1,2),
(20,'2022-05-30 18:00:00','2022-05-30 20:07:00',0,0,8.00,0,3,3,1,2),
(21,'2022-05-30 18:00:00','2022-05-30 20:07:00',0,0,8.00,0,1,3,1,2),
(22,'2022-05-30 18:00:00','2022-05-30 20:07:00',0,0,8.00,0,4,3,1,2);
