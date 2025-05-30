import { prisma } from "@/db";
import Link from "next/link";
import { TodoItem } from "@/components/TodoItem";
import { redirect } from "next/navigation";

async function getTodos() {
  return await prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } });
}

async function deleteTodo(id: string) {
  "use server"

  await prisma.todo.delete({ where: { id } });

  redirect(".");
}

export default async function Home() {

  const todos = getTodos();

  return (
      <>
          <header className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">Todos</h1>
              <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">New</Link>
          </header>
          <ul className="pl-4">
            {(await todos).map(todo => (
              <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            ))}
          </ul>
      </>
  );
}
