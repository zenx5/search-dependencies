import { getDoc, getDocs, updateDoc, addDoc, deleteDoc, doc, onSnapshot, collection, query, where } from "firebase/firestore"

import db from "./config"


export const onSnap = (name:string, callback:(arg0:any)=>void, id:string|null) => {
    if( id ) {
        onSnapshot( doc(db, name, id) , doc => callback({
            ...doc.data(),
            id: doc.id,
        }))
    } else {
        onSnapshot( collection(db, name), snap => callback(
            snap.docs.map( doc => ({
                    ...doc.data(),
                    id: doc.id
                })
            )
        ) )
    }
}

export const actionSave = async (
    name:string,
    data:any,
    id:string|null = null
 ) => {
    try{
        if( id ) {
            updateDoc( doc(db, name, id),  data )
        } else {
            addDoc( collection(db, name), data )
        }
        return true
    } catch( error ) {
        console.log( error )
        return false
    }
}

export const actionDelete = async (name:string, id:string) => {
    try{
        await deleteDoc(
          doc(db, name, id)
        )
        return true
    } catch( error ) {
        console.log( error )
        return false
    }
}

export const actionGet = async (name:string, id:string) => {
    const docRef = doc(db, name, id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? ({ id:docSnap.id, ...docSnap.data() }) : {}
}

export const actionSearch = async (name:string, target:string, condition:any, value:string) => {
    const querySentence = query(
        collection(db, name),
        where(target, condition, value)
    )
    const docsSnap = await getDocs(querySentence)
    return docsSnap.docs.map( doc => ({ id:doc.id, ...doc.data()}) )
}

export const actionGetAll = async (name:string) => {
    const docRef = collection(db, name);
    const docsSnap = await getDocs(docRef);
    return docsSnap.docs.map( doc => ({ id:doc.id, ...doc.data()}) )
}