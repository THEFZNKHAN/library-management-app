import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">
                Welcome to Library Management System
            </h1>
            <div className="flex space-x-4">
                <Link href="/books">
                    <Button>Manage Books</Button>
                </Link>
                <Link href="/users">
                    <Button>Manage Users</Button>
                </Link>
                <Link href="/transactions">
                    <Button>Manage Transactions</Button>
                </Link>
            </div>
        </div>
    );
}
