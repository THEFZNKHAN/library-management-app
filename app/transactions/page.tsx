"use client";

import { Suspense } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function TransactionsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        New Transaction
                    </h2>
                    <TransactionForm />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        Transaction List
                    </h2>
                    <Suspense fallback={<div>Loading Transactions...</div>}>
                        <TransactionList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
