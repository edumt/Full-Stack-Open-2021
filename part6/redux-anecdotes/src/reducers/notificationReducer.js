import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

let timeoutID = null;
export const tempNotification = (text, timeInSeconds) => (dispatch) => {
  dispatch(setNotification(text));
  clearInterval(timeoutID);
  timeoutID = setTimeout(() => {
    dispatch(removeNotification());
  }, timeInSeconds * 1000);
};

export default notificationSlice.reducer;
