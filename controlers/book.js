import mongoose from "mongoose";
import { bookModel } from "../models/book.js"

const getAllBooks = async (req, res) => {
    let { search } = req.query;
    let perPage = req.query.perPage || 5;
    let page = req.query.page || 1;
    let ex = new RegExp(search)
    console.log(search)
    try {
        let filter = {};
        if (search) {
            filter.name = ex;
            console.log(filter)
        }
        let allBooks = await bookModel.find(filter)
        .skip((page-1)*(perPage))
        .limit(perPage);
        res.json(allBooks);
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}

const getBookById = async (req, res) => {
    let { bookId } = req.params;
    try {
        if (!mongoose.isValidObjectId(bookId)) {
            console.log(bookId)
            return res.status(400).send("code isn't valid")
        }
        let book = await bookModel.findById(req.params.bookId)
        if (!book)
            return res.status(404).send("not found!")
        res.json(book)
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}

const addBook = async (req, res) => {
    try {
        let { name, price, types, numPages, author } = req.body;
        if (!name || !author)
            return res.status(404).json({ type: "missing paramters", message: "name or author" })
        let sameBook = await bookModel.findOne({ name, author });
        if (sameBook)
            return res.status(409).json({ type: "same book", message: "same details" })
        let newBook = await bookModel.create({ name, numPages, price, types, author });
        res.json(newBook);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export { getAllBooks, getBookById, addBook };