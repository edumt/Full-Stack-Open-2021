const Notification = ({ notification }) => {
  const { message, type } = notification;

  if (message === "") return null;

  const style = {
    backgroundColor: "lightgrey",
    fontSize: "20px",
    padding: "10px",
    margin: "20px 0",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "5px",
    fontFamily: "sans-serif",
  };

  const applyColor = (color) => {
    style.color = color;
    style.borderColor = color;
  };

  switch (type) {
    case "error":
      applyColor("red");
      break;
    case "success":
      applyColor("green");
      break;
    case "warn":
      applyColor("yellow");
      break;
    default:
      // applyColor("black");
      break;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
