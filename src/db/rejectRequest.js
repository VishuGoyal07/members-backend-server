import {db} from './db';


export const rejectRequest=async(requestId)=>{
    const connection=db.getConnection();
    const request=await connection.collection('requests').findOne({id:requestId});
    await connection.collection('requests').deleteOne({id:requestId});
};