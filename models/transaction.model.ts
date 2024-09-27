import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
    book: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    issueDate: Date;
    returnDate?: Date;
    rentAmount?: number;
}

const TransactionSchema: Schema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    rentAmount: { type: Number },
});

export default mongoose.models.Transaction ||
    mongoose.model<ITransaction>("Transaction", TransactionSchema);
