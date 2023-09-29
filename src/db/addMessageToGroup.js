import {db} from './db';

export const addMessageToGroup=async(groupId,userId,text)=>{
    const connection=db.getConnection();
    await connection.collection('messages').insertOne({groupId,userId,text});
    
}