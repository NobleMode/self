import { Module } from "@nestjs/common";
import { Pool } from "pg";
export const PG_CONNECTION = 'PG_CONNECTION';

const dbProvider = {
    provide: PG_CONNECTION,
    useValue: new Pool({
        user: "postgres",
        host: "localhost",
        database: "selfproject",
        password: "1234",
        port: 5432,
    }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class dbConnect {}