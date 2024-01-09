import { addUser,login } from "../controlers/user.js";
import express from "express";

const router = express.Router();

router.post('/', addUser);
router.post('/login',login);

export default router;
