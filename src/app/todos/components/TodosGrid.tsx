'use client';

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

import * as todosApi from '@/app/todos/helpers/todos';
import { useRouter } from "next/navigation";

interface Props {
    todos?: Todo[];
}


export const TodosGrid = ({todos = []}: Props) => {
  
  const router = useRouter();
  
  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo( id, complete);

    router.refresh();
  }

  return (
    <div className="flex flex-wrap">
        {
            todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleTodo={ toggleTodo }/>
            })
        }
    </div>
  )
}
