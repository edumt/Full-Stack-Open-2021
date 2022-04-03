import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  render(<BlogForm handleBlogCreation={createBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("create");

  userEvent.type(inputs[0], "mocking a new blog");
  userEvent.type(inputs[1], "Jest");
  userEvent.type(inputs[2], "localhost:3000");
  userEvent.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][1]).toStrictEqual({
    title: "mocking a new blog",
    author: "Jest",
    url: "localhost:3000",
  });
});
