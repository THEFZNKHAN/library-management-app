import { connectDB } from "../lib/db.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";

const seedDB = async () => {
    await connectDB();

    const users = [
        { name: "John Doe", email: "john@example.com", phone: "1234567890" },
        { name: "Jane Smith", email: "jane@example.com", phone: "0987654321" },
        {
            name: "Alice Johnson",
            email: "alice@example.com",
            phone: "1231231234",
        },
        { name: "Bob Brown", email: "bob@example.com", phone: "3213213210" },
        {
            name: "Charlie Davis",
            email: "charlie@example.com",
            phone: "9876543210",
        },
    ];

    const books = [
        {
            name: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "Fiction",
            rentPerDay: 10,
        },
        {
            name: "To Kill a Mockingbird",
            author: "Harper Lee",
            category: "Fiction",
            rentPerDay: 15,
        },
        {
            name: "1984",
            author: "George Orwell",
            category: "Dystopian",
            rentPerDay: 20,
        },
        {
            name: "The Catcher in the Rye",
            author: "J.D. Salinger",
            category: "Fiction",
            rentPerDay: 12,
        },
        {
            name: "Moby Dick",
            author: "Herman Melville",
            category: "Adventure",
            rentPerDay: 18,
        },
        {
            name: "Pride and Prejudice",
            author: "Jane Austen",
            category: "Romance",
            rentPerDay: 11,
        },
        {
            name: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            category: "Fantasy",
            rentPerDay: 25,
        },
        {
            name: "The Hobbit",
            author: "J.R.R. Tolkien",
            category: "Fantasy",
            rentPerDay: 22,
        },
        {
            name: "The Da Vinci Code",
            author: "Dan Brown",
            category: "Thriller",
            rentPerDay: 17,
        },
        {
            name: "Harry Potter and the Sorcerer’s Stone",
            author: "J.K. Rowling",
            category: "Fantasy",
            rentPerDay: 19,
        },
        {
            name: "Harry Potter and the Chamber of Secrets",
            author: "J.K. Rowling",
            category: "Fantasy",
            rentPerDay: 20,
        },
        {
            name: "The Hunger Games",
            author: "Suzanne Collins",
            category: "Dystopian",
            rentPerDay: 13,
        },
        {
            name: "Dune",
            author: "Frank Herbert",
            category: "Science Fiction",
            rentPerDay: 21,
        },
        {
            name: "The Shining",
            author: "Stephen King",
            category: "Horror",
            rentPerDay: 18,
        },
        {
            name: "Brave New World",
            author: "Aldous Huxley",
            category: "Dystopian",
            rentPerDay: 14,
        },
        {
            name: "Animal Farm",
            author: "George Orwell",
            category: "Satire",
            rentPerDay: 16,
        },
        {
            name: "Fahrenheit 451",
            author: "Ray Bradbury",
            category: "Dystopian",
            rentPerDay: 18,
        },
        {
            name: "Gone Girl",
            author: "Gillian Flynn",
            category: "Thriller",
            rentPerDay: 13,
        },
        {
            name: "The Road",
            author: "Cormac McCarthy",
            category: "Post-apocalyptic",
            rentPerDay: 12,
        },
        {
            name: "The Girl with the Dragon Tattoo",
            author: "Stieg Larsson",
            category: "Thriller",
            rentPerDay: 17,
        },
    ];

    try {
        await User.deleteMany({});
        await Book.deleteMany({});

        await User.insertMany(users);
        await Book.insertMany(books);

        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        process.exit();
    }
};

seedDB();
