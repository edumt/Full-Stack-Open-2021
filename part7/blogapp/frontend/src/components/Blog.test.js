import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../pages/Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Jest",
  url: "localhost",
  likes: 420,
  user: { name: "asdf", username: "asdf" },
};

const user = { username: "asdf" };

test("renders with basic content", () => {
  render(<Blog blog={blog} />);

  screen.getByText(`${blog.title} | ${blog.author}`);
  const url = screen.queryByText(blog.url);
  expect(url).toBeNull();
  const likes = screen.queryByText(blog.likes);
  expect(likes).toBeNull();
});

test("expands content when view button is clicked", () => {
  render(<Blog blog={blog} user={user} />);

  const button = screen.getByText("view");
  userEvent.click(button);
  screen.getByText(blog.url);
  screen.getByText(`likes ${blog.likes}`);
});

test("like button is clicked twice", () => {
  const mockHandler = jest.fn();
  render(<Blog blog={blog} user={user} handleLike={mockHandler} />);
  const toggleButton = screen.getByText("view");
  userEvent.click(toggleButton);
  const likeButton = screen.getByText("like");
  userEvent.click(likeButton);
  userEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
