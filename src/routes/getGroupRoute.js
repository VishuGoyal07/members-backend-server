import * as admin from 'firebase-admin';
import {getGroup,getMemberPopulatedGroup,getOwnerPopulatedGroup} from '../db';

export const getGroupRoute={
    method:'get',
    path:'/groups/:id',
    handler:async(req,res)=>{
        const token=req.headers.authtoken;
        const {id}=req.params;
        const user=await admin.auth().verifyIdToken(token);

        if(!user||!token)
        {
            res.status(401).json({message:"must be logged in to view group"});
        }

        const group=await getGroup(id);

        if(group.ownerId==user.user_id)
        {
            const OwnerPopulatedGroup=await getOwnerPopulatedGroup(id);
            return res.status(200).json(OwnerPopulatedGroup);
        }
        if(group.members.includes(user.user_id))
        {
            const memberPopulatedGroup=await getMemberPopulatedGroup(id);
            return res.status(200).json(memberPopulatedGroup);
        }

        res.status(200).json(group);
    }
}