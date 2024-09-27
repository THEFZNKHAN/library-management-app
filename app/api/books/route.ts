import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/book.model";

interface QueryType {
    name?: { $regex: string; $options: string };
    category?: string;
    rentPerDay?: {
        $gte?: number;
        $lte?: number;
    };
}

export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const { searchParams } = req.nextUrl;
        const name = searchParams.get("name");
        const category = searchParams.get("category");
        const minRent = searchParams.get("minRent");
        const maxRent = searchParams.get("maxRent");

        const query: QueryType = {};
        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        if (minRent || maxRent) {
            query.rentPerDay = {};
            if (minRent) query.rentPerDay.$gte = Number(minRent);
            if (maxRent) query.rentPerDay.$lte = Number(maxRent);
        }

        const books = await Book.find(query);
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json(
            { error: `Error fetching books: ${error}` },
            { status: 500 }
        );
    }
}
