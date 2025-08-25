import { neon } from "@neondatabase/serverless";
import "dotenv/config";


//Creates a SQL connection to the Neon database
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Status code 1 means failure, 0 success
    }
}