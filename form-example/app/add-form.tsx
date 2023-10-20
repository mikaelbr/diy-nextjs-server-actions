"use client";

import { createTodo } from "@/app/data";

export function AddForm() {
  return (
    <form action={createTodo}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <button type="submit">Add</button>
    </form>
  );
}
