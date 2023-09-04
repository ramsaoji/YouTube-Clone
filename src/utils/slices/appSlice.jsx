import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isSidebarOpen: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    sidebarOpenClose: (state, action) => {
      // You can access parameters from the action.payload
      const { openOrClose } = action.payload;
      state.isSidebarOpen = openOrClose;
    },
  },
});

export const { toggleSidebar, sidebarOpenClose } = appSlice.actions;
export default appSlice.reducer;
