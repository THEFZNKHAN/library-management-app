"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
    bookName: string;
    issueDate: string;
    returnDate?: string;
}

interface Result {
    booksIssued: Book[];
}

const UserBookHistory = () => {
    const [userNames, setUserNames] = useState<{ name: string }[]>([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users");
                setUserNames(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try {
            const response = await axios.get(`/api/transactions`, {
                params: { userName: selectedUserName },
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
            <h2 className="text-2xl font-semibold mb-4">User Book History</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    value={selectedUserName}
                    onChange={(e) => setSelectedUserName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="" disabled>
                        Select a user
                    </option>
                    {userNames.map((user) => (
                        <option key={user.name} value={user.name}>
                            {user.name}
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
                    <h3 className="text-xl font-semibold">Books Issued:</h3>
                    <ul className="mt-2">
                        {result.booksIssued.map((book, idx) => (
                            <li key={idx} className="border-b py-2">
                                {book.bookName} - Issued on{" "}
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

export default UserBookHistory;
