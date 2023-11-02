import { BaseModel } from "./BaseModel";

/*
    id          Int    @id @default(autoincrement())
    user        User   @relation(fields: [userId], references: [id])
    owner       String
    dependencie String
    userId      Int
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
*/
export default class Request extends BaseModel {
    static  tableName = 'requests'
}