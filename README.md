# Library Management System

This is a full-stack Library Management System built with Next.js, TypeScript, MongoDB, and Node.js. The system manages users, books, and book transactions like issuing and returning, along with rent calculations. Additionally, it provides APIs to interact with the system and optional frontend functionalities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Features

- **User Management**: Add and manage users in the system.
- **Book Management**: Add books with relevant details like name, category, and rent per day.
- **Transaction Management**: Issue and return books, with rent calculation based on the duration of issue.
- **Comprehensive API**: Various APIs to query users, books, and transaction history.
- **Frontend**: Optional frontend built with Next.js and TypeScript to interact with the backend APIs.

## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  
- **Backend**:
  - Node.js
  - TypeScript
  - MongoDB (Database)
  
- **Authentication**:
  - NextAuth.js

- **Deployment**: 
  - Vercel (for frontend)
  - MongoDB Atlas (for database)

## API Endpoints

### User Endpoints

- `GET /api/users`: Retrieve a list of all users.

### Book Endpoints

- `GET /api/books`: Retrieve a list of all books.
- `GET /api/books?name=bookName`: Search books by name or term.
- `GET /api/books?category=categoryName`: Search books by category.
- `GET /api/books?rentMin=10&rentMax=50`: Search books by rent price range.

### Transaction Endpoints

- `POST /api/transactions`: Issue a book to a user. Requires `book name`, `user name`, `issue date` and `return date`.
- `GET /api/transactions?bookName=bookName`: Get the transaction history of a specific book.
- `GET /api/transactions?userName=userName`: Get the list of books issued to a specific user.
- `GET /api/transactions?startDate=startDat&endDate=endDate`: Get a list of books issued in a specific date range.

### Helper Endpoints

- `GET /api/users`: Get a list of all users.
- `GET /api/books`: Get a list of all books.

## Deployment
[LIVE](https://library-management-app-fzn.vercel.app/)
