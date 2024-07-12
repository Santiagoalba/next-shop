import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) { 

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('take') ?? '0');

    if(isNaN(take)) {
      return NextResponse.json('La paginación tiene que ser un número', { status: 400 })
    }

    if(isNaN(skip)) {
      return NextResponse.json('El skip tiene que ser un número', { status: 400 })
    }

    const todos = await prisma.todo.findMany({ take: take, skip: skip });

  return NextResponse.json(({ todos }), { status: 200 } );
}

// VALIDACIONES POST

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})



export async function POST(request: Request) { 

  
  try {
    const { complete, description } = await postSchema.validate( await request.json() );
  
    const todo = await prisma.todo.create({data: { description, complete }})
  
    return NextResponse.json(todo); 
  } catch (error: any) {
    return NextResponse.json( { error: error.errors }, { status: 400 } )
  }
}
