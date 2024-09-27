import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/transaction.model";
import Book from "@/models/book.model";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const body = await req.json();
        const { bookName, userId, issueDate, returnDate } = body;

        const book = await Book.findOne({ name: bookName });
        const user = await User.findById(userId);

        if (!book || !user) {
            return NextResponse.json(
                { error: "Book or User not found" },
                { status: 404 }
            );
        }

        let transaction;

        if (returnDate) {
            transaction = await Transaction.findOne({
                book: book._id,
                user: user._id,
                returnDate: null,
            });
            if (!transaction) {
                return NextResponse.json(
                    { error: "No active transaction found" },
                    { status: 404 }
                );
            }

            const daysRented = Math.ceil(
                (new Date(returnDate).getTime() -
                    transaction.issueDate.getTime()) /
                    (1000 * 3600 * 24)
            );
            const rentAmount = daysRented * book.rentPerDay;

            transaction.returnDate = new Date(returnDate);
            transaction.rentAmount = rentAmount;
            await transaction.save();
        } else {
            transaction = new Transaction({
                book: book._id,
                user: user._id,
                issueDate: new Date(issueDate),
            });
            await transaction.save();
        }

        return NextResponse.json(transaction);
    } catch (error) {
        return NextResponse.json(
            { error: `Error processing transaction: ${error}` },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const { searchParams } = req.nextUrl;
        const bookName = searchParams.get("bookName");
        const userId = searchParams.get("userId");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const query: {
            book?: string;
            user?: string;
            issueDate?: { $gte: Date; $lte: Date };
        } = {};

        if (bookName) {
            const book = await Book.findOne({ name: bookName });
            if (book) query.book = book._id.toString();
        }

        if (userId) query.user = userId;

        if (startDate && endDate) {
            query.issueDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const transactions = await Transaction.find(query).populate(
            "book user"
        );
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json(
            { error: `Error fetching transactions: ${error}` },
            { status: 500 }
        );
    }
}
