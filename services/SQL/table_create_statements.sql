CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE login (
    loginID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID),
    loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logoutTime TIMESTAMP
);

CREATE TABLE wishlist (
    wishlistID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID),
    itemName VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    priority INT
);
