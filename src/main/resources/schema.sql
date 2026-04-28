CREATE DATABASE calendar;
USE calendar;


CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL
);

INSERT INTO events (title, date, time) VALUES ('Meeting', '2026-04-29', '10:00:00');
DELETE FROM events Where id=8;
SELECT * FROM events;
SHOW DATABASES;
