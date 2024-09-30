import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { issueBook, returnBook } from "@/lib/api";

export default function TransactionForm() {
    const [bookName, setBookName] = useState("");
    const [userId, setUserId] = useState("");
    const [date, setDate] = useState("");
    const [isIssue, setIsIssue] = useState(true);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isIssue) {
                await issueBook({ bookName, userId, issueDate: date });
            } else {
                await returnBook({ bookName, userId, returnDate: date });
            }
            setMessage("Request Send Successfully!!");
            setBookName("");
            setUserId("");
            setDate("");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                required
            />
            <Input
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
            <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <div>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        className="form-radio"
                        name="transactionType"
                        checked={isIssue}
                        onChange={() => setIsIssue(true)}
                    />
                    <span className="ml-2">Issue Book</span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input
                        type="radio"
                        className="form-radio"
                        name="transactionType"
                        checked={!isIssue}
                        onChange={() => setIsIssue(false)}
                    />
                    <span className="ml-2">Return Book</span>
                </label>
            </div>
            <p>{message}</p>
            <Button type="submit">
                {isIssue ? "Issue Book" : "Return Book"}
            </Button>
        </form>
    );
}
