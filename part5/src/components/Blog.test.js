import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Jest",
    url: "localhost",
    likes: 420,
  };

  render(<Blog blog={blog} />);

  screen.getByText(`${blog.title} | ${blog.author}`);
  const url = screen.queryByText(blog.url);
  expect(url).toBeNull();
  const likes = screen.queryByText(blog.likes);
  expect(likes).toBeNull();
});
