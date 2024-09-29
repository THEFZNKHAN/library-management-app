"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/lib/api";

export default function UserForm({ onUserAdded }: { onUserAdded: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser({ name, email, phone, password });
            onUserAdded();
            setMessage("User added successfully!");
            setTimeout(() => setMessage(""), 3000);
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
        } catch (error) {
            console.error("Error creating user:", error);
            setMessage("Error creating user.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <p>{message}</p>
            <Button type="submit">Add User</Button>
        </form>
    );
}
