import { BaseModel } from "./BaseModel";


/*
    id          Int   @id @default(autoincrement())
    navigator   String
    code        String @unique
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
*/
export default class Extensions extends BaseModel {
    static  tableName = 'extensions'
}