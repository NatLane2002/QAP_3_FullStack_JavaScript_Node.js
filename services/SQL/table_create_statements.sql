CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    postID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    commentID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID),
    postID INT REFERENCES posts(postID),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
