import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    name: String,
    phone: String,
    tz: String,
    bornDate: { type: Date, default: Date.now() }
})

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    numPages: Number,
    author: authorSchema,
    types: [String],
    publishDate: { type: Date, default: Date.now() }
})

export const bookModel = mongoose.model("books", bookSchema);
