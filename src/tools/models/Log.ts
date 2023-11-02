import { BaseModel } from "./BaseModel";

/*
    id          String  @id @default(autoincrement())
    user        User    @relation(fields: [userId], references: [id])
    type        String
    description String
    userId      Int
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
*/
export default class Log extends BaseModel {
    static  tableName = 'logs'
}