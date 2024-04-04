import { TUserRegister } from './../../../Model/userRegister.schema';
import {createSlice} from "@reduxjs/toolkit"

type TMembersState = {
    members: TUserRegister[]
}
const initialState: TMembersState={
    members: []
}
const memberSlice = createSlice({
    name: "members",
    initialState,
    reducers:{
        setMembers: (state, action)=>{
            state.members = action.payload
        }
    }
})

export const {setMembers} = memberSlice.actions;
export default memberSlice.reducer;