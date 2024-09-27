"use client";

import React, { useState } from "react";
import axios from "axios";

interface Book {
    bookName: string;
    issuedTo: string;
    issueDate: string;
    returnDate?: string;
}

interface Result {
    booksIssued: Book[];
}

const DateRangeBooks = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try {
            const response = await axios.get(`/api/transactions`, {
                params: { startDate, endDate },
            });
            setResult(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <div className="p-6 bg-white text-black shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Books Issued Within Date Range
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
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
                    <ul className="mt-2">
                        {result.booksIssued.map((book, idx) => (
                            <li key={idx} className="border-b py-2">
                                {book.bookName} - Issued to {book.issuedTo} on{" "}
                                {new Date(book.issueDate).toLocaleDateString()}
                                {book.returnDate
                                    ? ` - Returned on ${new Date(
                                          book.returnDate
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

export default DateRangeBooks;
