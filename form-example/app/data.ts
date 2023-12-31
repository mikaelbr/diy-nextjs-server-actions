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

  try {
    todos.push({
      id: Math.random().toString(),
      todo: data.todo,
    });

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(formData: FormData) {
  const data = todoItem.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    todos = todos.filter((i) => i.id !== data.id);
    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
