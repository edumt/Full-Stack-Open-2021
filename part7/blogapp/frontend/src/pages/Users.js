import { useState, useEffect } from "react";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
