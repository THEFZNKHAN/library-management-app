"use client";

import { useState, useEffect } from "react";
import { User } from "@/types";
import { getUsers } from "@/lib/api";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <ul className="space-y-2 mb-4">
            {users.map((user) => (
                <li key={user._id} className="border p-2 rounded">
                    <h3 className="font-bold">{user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </li>
            ))}
        </ul>
    );
}
