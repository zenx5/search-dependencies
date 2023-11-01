import { actionDelete, actionGet, actionGetAll, actionSave } from "./firebase/action";

export class User {
    static  tableName = 'users'

    static async get( id:string|null=null ) {
        if( id ) return await actionGet(this.tableName, id)
        return await actionGetAll(this.tableName)
    }

    static async delete(id:string) {
        return await actionDelete(this.tableName, id)
    }

    static async post(data:any) {
        return await actionSave(this.tableName, data)
    }

    static async put(id:string, data:any ) {
        return await actionSave(this.tableName, data, id)
    }
}