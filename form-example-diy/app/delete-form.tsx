"use client";

import { deleteTodo } from "@/app/data.actions";
import Form from "./Form";

export function DeleteForm({ id, todo }: { id: string; todo: string }) {
  return (
    <Form action={deleteTodo}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="todo" value={todo} />
      <button type="submit">Delete</button>
    </Form>
  );
}
