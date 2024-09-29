import axios from "axios";
import { Book, User, Transaction } from "@/types";

const api = axios.create({
    baseURL: "/api",
});

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
    const response = await api.post<Transaction>("/transactions/return", data);
    return response.data;
};

export const getBookTransactions = async (
    bookName: string
): Promise<{
    issuedPeople: Transaction[];
    totalRent: number;
}> => {
    const response = await api.get<{
        issuedPeople: Transaction[];
        totalRent: number;
    }>(`/transactions/book/${bookName}`);
    return response.data;
};

export const getUserTransactions = async (
    userId: string
): Promise<{
    booksIssued: Transaction[];
}> => {
    const response = await api.get<{ booksIssued: Transaction[] }>(
        `/transactions/user/${userId}`
    );
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
