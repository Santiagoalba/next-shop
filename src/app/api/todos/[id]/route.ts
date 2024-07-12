import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Args {
    params: {
        id: string;
    }
}

export async function GET(request: Request, args: Args) { 

    const id = args.params.id;

    const todo = await prisma.todo.findUnique(
        { 
            where: {
                id: id
            }
        }
    )

    if ( !todo) {
        return NextResponse.json({ errorMessage: `La tarea no fue encontrada.` }, { status: 404 })
    }

  return NextResponse.json({
    todo
  })
}

// VALIDACIONES PUT

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
  })

export async function PUT(request: Request, args: Args) { 

    const id = args.params.id;

    const todo = await prisma.todo.findUnique(
        { 
            where: {
                id: id
            }
        }
    )

    if ( !todo) {
        return NextResponse.json({ errorMessage: `La tarea no fue encontrada.` }, { status: 404 })
    }

    const data = await putSchema.validate(await request.json());

    try {
        const { complete, description } = data;
    
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })
    
        return NextResponse.json({
          updatedTodo
        });
        
    } catch (error) {
        return NextResponse.json(
            error, { status: 400 }
        );
    }
  }