import { BaseModel } from "./BaseModel";

/*
    id            String    @id @default(autoincrement())
    email         String    @unique
    username      String    @unique
    firstname     String
    lastname      String
    avatarUrl     String
    password      String
    githubuser    String    @unique
    requestLimit  Int
    updateLimit   DateTime
    Logs          Logs[]
    Request       Request[]
    createdAt     DateTime  @default(now())
    updatedAt     DateTime  @updatedAt
*/
export default class User extends BaseModel {
    static  tableName = 'users'
}