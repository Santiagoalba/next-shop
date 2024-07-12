"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
    validatedTitle: string;
}

export const addTodo = async ({ validatedTitle }: Props) => {

    const session = await auth();

    console.log(session);

    if (!session?.user) {
        redirect('api/auth/signin');
    }
    
    const userId = session.user.id;

    try {

        const newTodo = await prisma.todo.create({
            data: {
                description: validatedTitle,
                authorId: userId
            }
        });
        revalidatePath('/dashboard/rest-todos');
        return {
            newTodo,
            message: 'Task created successfully'
        }
    } catch (error) {
        console.log(error);
        return ({error, message: 'Failed to create the task'})
    }

    
}