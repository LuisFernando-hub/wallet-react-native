import express from "express";

const app = express();

// if(process.env.NODE_ENV === "production") job.start();

// Middleware
// app.use(rateLimiter);
// app.use(cors());
// app.use(express.json());

// app.use((req,res,next) => {
//     console.log("Hey we hit a req, the method is", req.method)
//     next();
// })

// const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
})

// app.use("/api/transactions", transactionsRoute);

// initDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("Server is running on port", PORT);
//     });
// })
