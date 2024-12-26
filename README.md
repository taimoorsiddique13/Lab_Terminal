
# Library Management System

This is a backend application for managing a library, including books, authors, borrowers, and borrowing processes.

## Features

- **Book Management**: Add, update, delete books; manage available copies.
- **Author Management**: Add, update, delete authors; ensure constraints on linked books.
- **Borrower Management**: Add, update, delete borrowers; manage borrowing limits based on membership type.
- **Borrow/Return System**: Handle borrowing/returning books with validations and rules.

## Endpoints

### Books
- `POST /books` - Add a new book.
- `PUT /books/:id` - Update a book by ID.
- `DELETE /books/:id` - Delete a book by ID.
- `GET /books` - List all books.

### Authors
- `POST /authors` - Add a new author.
- `PUT /authors/:id` - Update an author by ID.
- `DELETE /authors/:id` - Delete an author by ID.
- `GET /authors` - List all authors.
- `GET /authors/exceeding-limit` - List authors with more than 5 books.

### Borrowers
- `POST /borrowers` - Add a new borrower.
- `PUT /borrowers/:id` - Update a borrower by ID.
- `DELETE /borrowers/:id` - Delete a borrower by ID.
- `POST /borrowers/borrow` - Borrow a book.
- `POST /borrowers/return` - Return a book.

## Setup

1. Install dependencies: `npm install`
2. Start the server: `node server.js`

The server will run on [http://localhost:3000](http://localhost:3000).

## Requirements
- Node.js
- MongoDB

---
Enjoy managing your library system with ease!
