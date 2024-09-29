export interface Book {
    _id: string;
    name: string;
    author: string;
    category: string;
    rentPerDay: number;
}

export interface Transaction {
    _id: string;
    book: Book;
    user: User;
    issueDate: string;
    returnDate?: string;
    rentAmount?: number;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}
