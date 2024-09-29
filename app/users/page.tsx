"use client";

import { Suspense, useState } from "react";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";

export default function UsersPage() {
    const [userListKey, setUserListKey] = useState(0);

    const handleUserAdded = () => {
        setUserListKey((prevKey) => prevKey + 1);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Add New User</h2>
                    <UserForm onUserAdded={handleUserAdded} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">User List</h2>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserList key={userListKey} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
