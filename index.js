import express from "express";
import { config } from "dotenv";
import { connectTodb } from "./config/DBconnection.js"
import bookRouter from "./routes/book.js";
import userRouter from "./routes/user.js";
import { errorHandling } from "./middlewares/errorHandling.js";

config();
connectTodb();
const app = express();

app.use(express.json());
app.use("/api/books", bookRouter)
app.use("/api/users", userRouter)
app.use(errorHandling)
let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

