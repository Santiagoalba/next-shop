'use client';

import { addTodo } from "@/app/actions/add-todo";
import { IoTrashOutline } from "react-icons/io5";
import { z } from 'zod';
import toast from "react-hot-toast";
import { deleteTodo } from "@/app/actions/delete-todo";


const todoSchema = z.object({
    title: z.string().min(3).max(30).trim(),
})


export const TodoForm = () => { 

    const handleCreateTodo = async (formData: FormData) => {

        const title = formData.get('title')?.toString();

        const todo =  { title };

        const validatedTodo = todoSchema.safeParse(todo);

        const { title: validatedTitle } = validatedTodo.data;

        if (!validatedTitle) return;

        console.log(validatedTitle);

        const result = await addTodo( { validatedTitle } );
    
        if ( result.error ) {
          toast.error('Hubo un error en la creacion de la tarea intente nuevamente.');
          return;
        }

        toast.success(result.message);
        
    }

    const handleDelete = async() => {
      const result = await deleteTodo();
      console.log(result);
      toast.success(result.message);

    }
  return (
    <div className="flex">
    <form  action={handleCreateTodo} className='flex w-full mb-2'>
      <input type="text"
        className="pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué tarea vas a hacer?" 
        name="title"
        />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>


    </form>
      <button 
        onClick={handleDelete} className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete
      </button>
    </div>
  )
}