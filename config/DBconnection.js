import mongoose from "mongoose";
export const connectTodb = () => {
    const mongoURI = process.env.DB_CONNECTION || "mongodb://0.0.0.0:27017";
    mongoose.connect(`${mongoURI}/${process.env.DB_NAME || "hw_15"}`).then(suc => {
        console.log("mongodb connected on host " + suc.connection.host)
    }).catch(err => {
        console.log(err);
        console.log("cannot connect mongodb");
        process.exit(1)
    })
}

