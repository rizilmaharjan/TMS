import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profilePicture: "",
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;
