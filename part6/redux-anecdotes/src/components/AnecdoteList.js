import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter),
      )
      .sort((a, b) => b.votes - a.votes),
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
