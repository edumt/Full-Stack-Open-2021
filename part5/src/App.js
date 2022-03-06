import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <Blogs blogs={blogs} user={user} />
      )}
    </div>
  );
};

export default App;
