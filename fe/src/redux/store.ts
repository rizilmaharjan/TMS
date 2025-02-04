import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice"
import memberReducer from "./features/user/memberSlice"
import taskReducer from "./features/tasks/taskSlice";
import profileReducer from "./features/profile/profileSlice"
export const store = configureStore({
    reducer:{
        userInfo: userReducer,
        membersInfo: memberReducer,
        assignedTasks: taskReducer,
        profilePicture: profileReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch