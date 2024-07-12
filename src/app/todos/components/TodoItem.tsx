import { Todo } from "@prisma/client";
import styles from './TodoItem.module.css';
import { IoCheckbox, IoCheckboxOutline, IoCheckmark, IoSquare, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const { description, complete } = todo;

  return (
    <div className="w-1/2 p-1">
      <div className={`${ complete ? styles.todoDone : styles.todoPending }`}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        
          <div onClick={() => toggleTodo( todo.id, !todo.complete )} className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${ complete ? 'bg-blue-100' : 'bg-red-100'}`}>
            {
              complete 
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
            }
            
          </div>

          <div className="text-center sm:text-left">
            { description }
          </div>

        </div>
      </div>
    </div>
  )
}
