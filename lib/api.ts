import axios from "axios";
import { Book, User, Transaction } from "@/types";

const api = axios.create({
    baseURL: "/api",
});

interface BookTransactionsResponse {
    issuedPeopleCount: number;
    issuedPeople: Transaction[];
    totalRent: number;
}

interface UserTransactionsResponse {
    booksIssued: Transaction[];
}

export const getBooks = async (params?: {
    name?: string;
    category?: string;
    minRent?: number;
    maxRent?: number;
}): Promise<Book[]> => {
    const response = await api.get<Book[]>("/books", { params });
    return response.data;
};

export const createBook = async (
    bookData: Omit<Book, "_id">
): Promise<Book> => {
    const response = await api.post<Book>("/books", bookData);
    return response.data;
};

export const issueBook = async (data: {
    bookName: string;
    userId: string;
    issueDate: string;
}): Promise<Transaction> => {
    const response = await api.post<Transaction>("/transactions", data);
    return response.data;
};

export const returnBook = async (data: {
    bookName: string;
    userId: string;
    returnDate: string;
}): Promise<Transaction> => {
    const response = await api.post<Transaction>("/transactions", data);
    return response.data;
};

export const getBookTransactions = async (
    bookName: string
): Promise<BookTransactionsResponse | null> => {
    try {
        console.log(`Fetching transactions for book: ${bookName}`);
        const response = await api.get<BookTransactionsResponse>(
            "/transactions",
            {
                params: { bookName },
            }
        );

        if (response.status !== 200) {
            throw new Error(`API returned status ${response.status}`);
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Axios error:",
                error.response?.data || error.message
            );
        } else {
            console.error("Unknown error:", error);
        }
        throw new Error("An error occurred while fetching book transactions");
    }
};

export const getUserTransactions = async (
    userId: string
): Promise<UserTransactionsResponse> => {
    const response = await api.get<UserTransactionsResponse>("/transactions", {
        params: { userId },
    });
    return response.data;
};

export const getTransactionsByDateRange = async (
    startDate: string,
    endDate: string
): Promise<{ booksIssued: Transaction[] }> => {
    const response = await api.get<{ booksIssued: Transaction[] }>(
        "/transactions",
        {
            params: { startDate, endDate },
        }
    );
    return response.data;
};

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
};

export const createUser = async (
    userData: Omit<User, "_id">
): Promise<User> => {
    const response = await api.post<User>("/users", userData);
    return response.data;
};
