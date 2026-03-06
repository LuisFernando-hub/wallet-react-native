import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js"

dotenv.config();

const app = express();

// if(process.env.NODE_ENV === "production") job.start();

// Middleware
// app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.use((req,res,next) => {
    console.log("Hey we hit a req, the method is", req.method)
    next();
})

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
})

app.use("/api/transactions", transactionsRoute);

let isConnected = false;
app.use(async (req, res, next) => {
    if (!isConnected) {
        await initDB();
        isConnected = true;
    }
    next();
});

// Para rodar LOCALMENTE (não afeta a Vercel)
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5001;
    initDB().then(() => {
        app.listen(PORT, () => console.log("Server local na porta", PORT));
    });
}

export default app;