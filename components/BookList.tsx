"use client";

import { useState, useEffect } from "react";
import { Book } from "@/types";
import { getBooks } from "@/lib/api";
import { Input } from "@/components/ui/input";

export default function BookList({ refreshList }: { refreshList: boolean }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks({ name: searchTerm });
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [searchTerm, refreshList]);

    return (
        <div>
            <Input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <ul className="space-y-2 mb-4">
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book._id} className="border p-2 rounded">
                            <h3 className="font-bold">{book.name}</h3>
                            <p>Author: {book.author}</p>
                            <p>Category: {book.category}</p>
                            <p>Rent per day: ${book.rentPerDay}</p>
                        </li>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </ul>
        </div>
    );
}
