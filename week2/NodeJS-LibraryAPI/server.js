'use strict'

import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import { readFile } from 'fs/promises';
const data = JSON.parse(await readFile('./books.json'));

const app = express();
app.use(express.json());

// Read book
app.get('/books', (req, res) => readBook(req, res));

// Create book
app.post('/books', (req, res) => createBook(req, res));

// Update book
app.put('/books/:id', (req, res) => updateBook(req, res));

// Delete book
app.delete('/books/:id', (req, res) => deleteBook(req, res));


function invalidRequest(req) {
  if (!req.body || !req.body.title || !req.body.author) {
    return true;
  }
  else {
    return false;
  }
}

function readBook(req, res) {
  res.header('Content-Type', 'application/json');
  res.send(data);
}

function createBook(req, res) {
  if (invalidRequest(req)) {
    res.status(400).send('Invalid Request !');
  }
  else {
    const newBook = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author
    };
    data.push(newBook);
    res.send(data);
  }
}

function updateBook(req, res) {
  if (invalidRequest(req)) {
    res.status(400).send('Invalid Request !');
  }
  else {
    const book = data.find(book => book.id === req.params.id);
    if (!book) {
      res.status(404).send('Book not found !');
    }
    else {
      book.title = req.body.title;
      book.author = req.body.author;
      res.send(data);
    }
  }
}

function deleteBook(req, res) {
  if (invalidRequest(req)) {
    res.status(400).send('Invalid Request !');
  }
  else {
    const book = data.find(book => book.id === req.params.id);
    if (!book) {
      res.status(404).send('Book not found !');
    }
    else {
      data.splice(data.indexOf(book), 1);
      res.status(200).send(data);
    }
  }
}


app.listen(3000, () => console.log('Server started on port 3000'));