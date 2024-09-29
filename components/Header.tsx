"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Library App
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/books">Books</Link>
                        </li>
                        <li>
                            <Link href="/users">Users</Link>
                        </li>
                        <li>
                            <Link href="/transactions">Transactions</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    {session ? (
                        <Button onClick={() => signOut()}>Sign out</Button>
                    ) : (
                        <Link href="/api/auth/signin">
                            <Button>Sign in</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
