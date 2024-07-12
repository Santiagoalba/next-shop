'use server';

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const deleteTodo = async() => {

        const session = await auth();

        if(!session) {
            redirect('/api/auth/signin')
        }

        const userId = session?.user?.id;

        const result = await prisma.todo.deleteMany({where: { complete: true, authorId: userId }});
        revalidatePath('/dashboard/rest-todos');
        return { result, message: 'Tareas completadas! :)'}
}