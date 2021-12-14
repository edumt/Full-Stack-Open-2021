const Notification = ({ message }) => {
  const successStyle = {
    color: "green",
    backgroundColor: "#bbb",
    padding: "10px",
    margin: "20px 0",
    border: "2px solid green",
    borderRadius: "5px",
    fontSize: "24px",
    fontFamily: "sans-serif",
  };
  const errorStyle = {
    color: "red",
    backgroundColor: "#bbb",
    padding: "10px",
    margin: "20px 0",
    border: "2px solid red",
    borderRadius: "5px",
    fontSize: "24px",
    fontFamily: "sans-serif",
  };

  if (message === null) return null;

  let style = {};
  switch (message.type) {
    case "success":
      style = successStyle;
      break;
    case "error":
      style = errorStyle;
      break;

    default:
      break;
  }

  return <div style={style}>{message.text}</div>;
};

export default Notification;
