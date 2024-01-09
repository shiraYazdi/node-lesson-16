import { addBook, getAllBooks, getBookById } from '../controlers/book.js';
import { auth } from "../middlewares/auth.js"
import express from "express";

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', auth, addBook);

export default router;
