import { addUser,login, getAllUsers } from "../controlers/user.js";
import express from "express";

const router = express.Router();

router.post('/', addUser);
router.post('/login',login);
router.get('/', getAllUsers);

export default router;
