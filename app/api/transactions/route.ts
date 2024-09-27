import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction, { ITransaction } from "@/models/transaction.model";
import Book, { IBook } from "@/models/book.model";
import User, { IUser } from "@/models/user.model";
import mongoose from "mongoose";

type TransactionInput = {
    bookName: string;
    userId: string;
    userName?: string;
    issueDate: string;
    returnDate?: string;
};

type TransactionOutput = {
    book: string;
    user: string;
    issueDate: Date;
    returnDate?: Date;
    rentAmount?: number;
};

const findBook = async (bookName: string): Promise<IBook | null> => {
    return Book.findOne({ name: bookName });
};

const findUser = async (
    userId: string | undefined,
    userName: string | undefined
): Promise<IUser | null> => {
    if (userId) {
        return User.findById(userId);
    }
    if (userName) {
        return User.findOne({ name: userName });
    }
    return null;
};

const findActiveTransaction = async (
    bookId: mongoose.Types.ObjectId
): Promise<ITransaction | null> => {
    return Transaction.findOne({
        book: bookId,
        returnDate: null,
    });
};

const calculateRent = (
    issueDate: Date,
    returnDate: Date,
    rentPerDay: number
): number => {
    const daysRented = Math.ceil(
        (returnDate.getTime() - issueDate.getTime()) / (1000 * 3600 * 24)
    );
    return daysRented * rentPerDay;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB();

    try {
        const body: TransactionInput = await req.json();
        const { bookName, userId, userName, issueDate, returnDate } = body;

        const book = await findBook(bookName);
        const user = await findUser(userId, userName);

        if (!book || !user) {
            return NextResponse.json(
                { error: "Book or User not found" },
                { status: 404 }
            );
        }

        const activeTransaction = await findActiveTransaction(
            book._id as mongoose.Types.ObjectId
        );

        if (!returnDate && activeTransaction) {
            return NextResponse.json(
                {
                    error: "This book is already issued to someone else. Please try again later.",
                },
                { status: 400 }
            );
        }

        let transaction: ITransaction;

        if (returnDate) {
            const existingTransaction = await Transaction.findOne({
                book: book._id,
                user: user._id,
                returnDate: null,
            });

            if (!existingTransaction) {
                return NextResponse.json(
                    { error: "No active transaction found" },
                    { status: 404 }
                );
            }

            const rentAmount = calculateRent(
                existingTransaction.issueDate,
                new Date(returnDate),
                book.rentPerDay
            );

            existingTransaction.returnDate = new Date(returnDate);
            existingTransaction.rentAmount = rentAmount;
            transaction = await existingTransaction.save();
        } else {
            const newTransaction = new Transaction({
                book: book._id,
                user: user._id,
                issueDate: new Date(issueDate),
            });
            transaction = await newTransaction.save();
        }

        const output: TransactionOutput = {
            book: book.name,
            user: user.name,
            issueDate: transaction.issueDate,
            returnDate: transaction.returnDate,
            rentAmount: transaction.rentAmount,
        };

        return NextResponse.json(output);
    } catch (error) {
        console.error("Error processing transaction:", error);
        return NextResponse.json(
            { error: "Error processing transaction" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    await connectDB();

    try {
        const { searchParams } = req.nextUrl;
        const bookName = searchParams.get("bookName");
        const userId = searchParams.get("userId");
        const userName = searchParams.get("userName");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        if (bookName) {
            const book = await findBook(bookName);
            if (!book) {
                return NextResponse.json(
                    { error: "Book not found" },
                    { status: 404 }
                );
            }

            const transactions = await Transaction.find({
                book: book._id,
            }).populate<{ user: IUser }>("user");

            const currentlyIssued = transactions.find((t) => !t.returnDate);

            const issuedPeople = transactions.map((t) => ({
                user: t.user.name,
                issueDate: t.issueDate,
                returnDate: t.returnDate,
            }));

            const totalRent = transactions.reduce(
                (acc, t) => acc + (t.rentAmount || 0),
                0
            );

            return NextResponse.json({
                issuedPeopleCount: issuedPeople.length,
                issuedPeople,
                currentlyIssued: currentlyIssued
                    ? currentlyIssued.user.name
                    : "Not issued at the moment",
                totalRent,
            });
        }

        if (userId || userName) {
            const user = await findUser(
                userId || undefined,
                userName || undefined
            );
            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            const transactions = await Transaction.find({
                user: user._id,
            }).populate<{ book: IBook }>("book");

            const booksIssued = transactions.map((t) => ({
                bookName: t.book.name,
                issueDate: t.issueDate,
                returnDate: t.returnDate,
            }));

            return NextResponse.json({ booksIssued });
        }

        if (startDate && endDate) {
            const transactions = await Transaction.find({
                issueDate: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            }).populate<{ book: IBook; user: IUser }>("book user");

            const booksIssued = transactions.map((t) => ({
                bookName: t.book.name,
                issuedTo: t.user.name,
                issueDate: t.issueDate,
                returnDate: t.returnDate,
            }));

            return NextResponse.json({ booksIssued });
        }

        return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { error: "Error fetching transactions" },
            { status: 500 }
        );
    }
}
