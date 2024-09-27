import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    bookId: string;
    userId: string;
    issueDate: Date;
    returnDate: Date;
    totalRent: number;
}

const transactionSchema: Schema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    totalRent: { type: Number },
});

export default mongoose.models.Transaction ||
    mongoose.model<ITransaction>("Transaction", transactionSchema);
