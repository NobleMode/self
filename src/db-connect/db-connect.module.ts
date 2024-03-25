import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { PG_CONNECTION } from "./constants";
import { config } from 'dotenv';
config();

const dbProvider = {
    provide: PG_CONNECTION,
    useValue: new Pool({
        user: "postgres",
        host: "localhost",
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
    }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class dbConnect {}