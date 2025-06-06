-- TODO

DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE TABLE folders (
  id serial PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

create table files (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size INT NOT NULL,
  folder_id INT NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
  UNIQUE (name, folder_id)
);
