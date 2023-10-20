import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";
import { getData } from "./data.actions";

export default async function Home() {
  const todos = await getData();

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
            <DeleteForm id={todo.id} todo={todo.todo} />
          </li>
        ))}
      </ul>
    </main>
  );
}
