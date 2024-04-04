import { TUserRegister } from './../../../Model/userRegister.schema';
import {createSlice} from "@reduxjs/toolkit"

type TUserState = {
    user: TUserRegister | null
}
const initialState: TUserState={
    user: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUsers: (state, action)=>{
            state.user = action.payload
        }
    }
})

export const {setUsers} = userSlice.actions;
export default userSlice.reducer;