import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    name: string;
    author: string;
    category: string;
    rentPerDay: number;
}

const bookSchema: Schema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true },
});

export default mongoose.models.Book ||
    mongoose.model<IBook>("Book", bookSchema);
