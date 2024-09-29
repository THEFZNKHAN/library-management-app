"use client";

import { Suspense, useState } from "react";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";

export default function BooksPage() {
    const [refreshList, setRefreshList] = useState(false);

    const handleBookAdded = () => {
        setRefreshList(!refreshList);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Add New Book</h2>
                    <BookForm onBookAdded={handleBookAdded} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Book List</h2>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BookList refreshList={refreshList} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
