"use client";

import { deleteTodo } from "@/app/data";

export function DeleteForm({ id, todo }: { id: string; todo: string }) {
  return (
    <form action={deleteTodo}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="todo" value={todo} />
      <button type="submit">Delete</button>
    </form>
  );
}
