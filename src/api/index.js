// Node.js API with Express

// Step 1: Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Step 2: Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Step 3: Use bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Step 4: In-memory storage for books
let books = [];

// Middleware to validate the dummy token
function validateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_VALUE

    // Check if the token exists and is prefixed with 'dummy_token_'
    if (token && token.startsWith('dummy_token_')) {
        next(); // Token is valid, proceed to the next middleware or route handler
    } else {
        res.status(401).send('Unauthorized: Token is invalid or missing');
    }
}

// Step 5: Define the /token endpoint
app.post('/token', (req, res) => {
    const { username, password } = req.body;
    // In a real application, you would validate the username and password
    // For this example, return a dummy token
    if (username && password) {
        res.json({ token: 'dummy_token_' + username });
    } else {
        res.status(400).send('Username and password are required');
    }
});

// Step 6: Define the books create endpoint
app.post('/books', validateToken, (req, res) => {
    const book = req.body;
    book.id = books.length;
    // In a real application, you would validate the book object
    // For this example, just add it to the books array
    books.push(book);

    res.status(201).send({ id: book.id });
});

// Step 7: Define the books get endpoint
app.get('/books', validateToken, (req, res) => {
    // Return the first 100 books
    res.json(books.slice(0, 100));
});

// Step 8: Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});