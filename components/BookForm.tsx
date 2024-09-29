"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBook } from "@/lib/api";

export default function BookForm({ onBookAdded }: { onBookAdded: () => void }) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBook({
                name,
                author,
                category,
                rentPerDay: Number(rentPerDay),
            });
            onBookAdded();
            // Reset form
            setName("");
            setAuthor("");
            setCategory("");
            setRentPerDay("");
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Book Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <Input
                type="number"
                placeholder="Rent per day"
                value={rentPerDay}
                onChange={(e) => setRentPerDay(e.target.value)}
                required
            />
            <Button type="submit">Add Book</Button>
        </form>
    );
}
