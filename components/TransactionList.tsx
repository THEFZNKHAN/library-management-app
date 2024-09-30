"use client";

import { useState } from "react";
import {
    getBookTransactions,
    getUserTransactions,
    getTransactionsByDateRange,
} from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

interface TransactionItem {
    book: string;
    user: string;
    issueDate: string;
    returnDate?: string;
    rentAmount?: number;
}

export default function TransactionList() {
    const [transactions, setTransactions] = useState<TransactionItem[]>([]);
    const [bookName, setBookName] = useState("");
    const [userName, setUserName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalRent, setTotalRent] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const fetchBookTransactions = async () => {
        try {
            setError(null);
            if (!bookName) {
                setError("Please enter a valid book name.");
                return;
            }
            const data = await getBookTransactions(bookName);
            if (data) {
                const mappedTransactions = data.issuedPeople.map(
                    (transaction: Transaction) => ({
                        book: bookName,
                        user: transaction.user.name,
                        issueDate: transaction.issueDate,
                        returnDate: transaction.returnDate,
                        rentAmount: transaction.rentAmount,
                    })
                );
                setTransactions(mappedTransactions);
                setTotalRent(data.totalRent);
            }
        } catch (error) {
            console.error("Error fetching book transactions:", error);
            setError("Failed to fetch book transactions. Please try again.");
        }
    };

    const fetchUserTransactions = async () => {
        try {
            setError(null);
            const data = await getUserTransactions(userName);
            const mappedTransactions = data.booksIssued.map(
                (transaction: Transaction) => ({
                    user: userName,
                    book: transaction.book.name,
                    issueDate: transaction.issueDate,
                    returnDate: transaction.returnDate,
                    rentAmount: transaction.rentAmount,
                })
            );
            console.log(mappedTransactions);
            setTransactions(mappedTransactions);
        } catch (error) {
            console.error("Error fetching user transactions:", error);
            setError("Failed to fetch user transactions. Please try again.");
        }
    };

    const fetchTransactionsByDateRange = async () => {
        try {
            setError(null);
            const data = await getTransactionsByDateRange(startDate, endDate);
            const mappedTransactions = data.booksIssued.map(
                (transaction: Transaction) => ({
                    book: transaction.book.name,
                    user: transaction.user.name,
                    issueDate: transaction.issueDate,
                    returnDate: transaction.returnDate,
                    rentAmount: transaction.rentAmount,
                })
            );
            setTransactions(mappedTransactions);
        } catch (error) {
            console.error("Error fetching transactions by date range:", error);
            setError(
                "Failed to fetch transactions by date range. Please try again."
            );
        }
    };

    return (
        <div className="space-y-4 mb-4">
            <div className="flex space-x-2">
                <Input
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />
                <Button onClick={fetchBookTransactions}>Search by Book</Button>
            </div>
            <div className="flex space-x-2">
                <Input
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Button onClick={fetchUserTransactions}>Search by User</Button>
            </div>
            <div className="flex space-x-2">
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button onClick={fetchTransactionsByDateRange}>
                    Search by Date Range
                </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {totalRent > 0 && (
                <p className="font-bold">Total Rent Generated: ${totalRent}</p>
            )}
            {transactions.length > 0 ? (
                <ul className="space-y-2">
                    {transactions.map((transaction, index) => (
                        <li key={index} className="border p-2 rounded">
                            <p>Book: {transaction.book}</p>
                            <p>User: {transaction.user}</p>
                            <p>Issue Date: {transaction.issueDate}</p>
                            {transaction.returnDate && (
                                <p>Return Date: {transaction.returnDate}</p>
                            )}
                            {transaction.rentAmount && (
                                <p>Rent Amount: ${transaction.rentAmount}</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
}
