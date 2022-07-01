import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/reducers/userReducer";

const Header = ({ user }) => {
  if (!user) return null;

  const dispatch = useDispatch();

  return (
    <header style={{ backgroundColor: "lightgrey", padding: "4px 8px" }}>
      <Link to="/" style={{ marginRight: "5px" }}>
        blogs
      </Link>
      <Link to="/users" style={{ marginRight: "5px" }}>
        users
      </Link>
      {user.name} logged-in{" "}
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedBlogappUser");
          dispatch(setUser(null));
        }}
      >
        logout
      </button>
    </header>
  );
};

export default Header;
