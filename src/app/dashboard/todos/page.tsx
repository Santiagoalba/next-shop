export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
 title: 'Todos Page',
 description: 'Todos Page',
};

import prisma from "@/app/lib/prisma";
import { TodosGrid } from "@/app/todos/components/TodosGrid";
import { TodoForm } from "./components/TodoForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TodosPage() {

  const session = await auth();

  if (!session?.user) {
    redirect('api/auth/signin')
  }

  const userId = session.user.id;

  const todos = await prisma.todo.findMany({ where: { authorId: userId }, orderBy: { complete: 'asc' } })

  return (
    <div>
        <TodoForm />
        <TodosGrid todos={ todos }/>
    </div>
  );
}