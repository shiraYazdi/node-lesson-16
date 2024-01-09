import { addBook, getAllBooks, getBookById } from '../controlers/book.js';
import express from "express";

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook);

export default router;
