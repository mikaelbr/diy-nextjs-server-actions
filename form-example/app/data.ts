"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const todoItem = z.object({
  id: z.string().min(1),
  todo: z.string().min(1),
});

type Todo = z.infer<typeof todoItem>;

let todos: Todo[] = [];

export async function getData() {
  return todos;
}

export async function createTodo(formData: FormData) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const data = schema.parse({
    todo: formData.get("todo"),
  });

  todos.push({
    id: Math.random().toString(),
    todo: data.todo,
  });

  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const data = todoItem.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  todos = todos.filter((i) => i.id !== data.id);

  revalidatePath("/");
}
