import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { tempNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, tempNotification }) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote(content);
    tempNotification(`you created '${content}'`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  tempNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
