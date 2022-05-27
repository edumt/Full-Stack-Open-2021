import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "" };

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
export const tempNotification =
  (notification, timeInSeconds = 3) =>
  (dispatch) => {
    dispatch(setNotification(notification));
    clearInterval(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, timeInSeconds * 1000);
  };

export default notificationSlice.reducer;
