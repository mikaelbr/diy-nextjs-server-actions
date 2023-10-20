"use client";

import { createTodo } from "@/app/data.actions";
import Form from "./Form";

export function AddForm() {
  return (
    <Form action={createTodo}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" autoFocus required />
      <button type="submit">Add</button>
    </Form>
  );
}
