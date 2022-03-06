const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  let style = {
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
    style = { ...style, color: color, borderColor: color };
  };

  const { message, type } = notification;
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
