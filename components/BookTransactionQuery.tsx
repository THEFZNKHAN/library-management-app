"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const BookTransactionQuery = () => {
    const [books, setBooks] = useState<{ name: string }[]>([]);
    const [selectedBook, setSelectedBook] = useState("");
    interface TransactionResult {
        issuedPeopleCount: number;
        currentlyIssued: string | null;
        totalRent: number;
        issuedPeople: {
            user: string;
            issueDate: string;
            returnDate: string | null;
        }[];
    }

    const [result, setResult] = useState<TransactionResult | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("/api/books");
                setBooks(response.data);
            } catch (err) {
                console.error("Error fetching books:", err);
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try {
            const response = await axios.get(`/api/transactions`, {
                params: { bookName: selectedBook },
            });
            setResult(response.data);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data?.error || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <div className="p-6 bg-white text-black shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Book Transaction Query
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="" disabled>
                        Select a book
                    </option>
                    {books.map((book) => (
                        <option key={book.name} value={book.name}>
                            {book.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Search
                </button>
            </form>

            {error && <div className="mt-4 text-red-500">{error}</div>}
            {result && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Results:</h3>
                    <p>Total People Who Issued: {result.issuedPeopleCount}</p>
                    <p>
                        Currently Issued:{" "}
                        {result.currentlyIssued || "Not issued at the moment"}
                    </p>
                    <p>Total Rent Generated: ₹{result.totalRent}</p>
                    <ul className="mt-2">
                        {result.issuedPeople.map((person, idx) => (
                            <li key={idx} className="border-b py-2">
                                {person.user} - Issued on{" "}
                                {new Date(
                                    person.issueDate
                                ).toLocaleDateString()}
                                {person.returnDate
                                    ? ` - Returned on ${new Date(
                                          person.returnDate
                                      ).toLocaleDateString()}`
                                    : " - Not Returned Yet"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BookTransactionQuery;
