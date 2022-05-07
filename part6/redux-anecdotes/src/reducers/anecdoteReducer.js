import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    // vote(state, action) {
    //   const anecdote = state.find((anecdote) => anecdote.id === action.payload);
    //   anecdote.votes++;
    // },
    setAnecdotes(_, action) {
      return action.payload;
    },
    update(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
      );
    },
  },
});

export const { appendAnecdote, setAnecdotes, update } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (votedAnecdote) => {
  return async (dispatch) => {
    const anecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote);
    dispatch(update(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
