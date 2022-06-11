CREATE TABLE Todo (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status BOOLEAN NOT NULL DEFAULT false
);


insert into Todo (id, title, status) values (1, 'Clean the room!', 0);
insert into Todo (id, title, status) values (2, 'Read a book', 0);
insert into Todo (id, title, status) values (3, 'Learn rust', 0);
insert into Todo (id, title, status) values (4, 'Play piano', 0);
insert into Todo (id, title, status) values (5, 'Sing a song', 0);
insert into Todo (id, title, status) values (6, 'Build a house', 0);
insert into Todo (id, title, status) values (7, 'Call the police', 0);
insert into Todo (id, title, status) values (8, 'Go shopping', 0);
insert into Todo (id, title, status) values (9, 'Play cards', 0);
insert into Todo (id, title, status) values (10, 'Buy a new TV', 0);
insert into Todo (id, title, status) values (11, 'Rent a car', 0);
insert into Todo (id, title, status) values (12, 'Watch Star Wars', 0);
insert into Todo (id, title, status) values (13, 'Throw some money in the air', 0);
insert into Todo (id, title, status) values (14, 'Play poker', 0);
insert into Todo (id, title, status) values (15, 'Visit Paris', 0);
insert into Todo (id, title, status) values (16, 'Call the doctor', 0);
insert into Todo (id, title, status) values (17, 'Buy ice cream', 0);
insert into Todo (id, title, status) values (18, 'Make a salad', 0);
insert into Todo (id, title, status) values (19, 'Prepare BBQ', 0);
insert into Todo (id, title, status) values (20, 'Book a hotel', 0);
