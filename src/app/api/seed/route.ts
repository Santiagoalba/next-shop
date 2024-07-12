import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

    // const todo = await prisma.todo.create({
    //     data: { description: 'Estudiar Postgres'}
    // })
    const user = await prisma.user.create({
      data: {
        email: 'prueba123@mail.com',
        password: bcrypt.hashSync('password'),
        roles: ['admin','client','super-user'],
        todos: {
          create: [
            { description: 'Jugar juegos', complete: true },
            { description: 'Hacer algo', complete: false },
            { description: 'Tomar mate', complete: false },
            { description: 'Comer pizza', complete: false },
            { description: 'Llenar DB', complete: false },      
        ]
        }
      }
    })

    // console.log(todo);

    // await prisma.todo.deleteMany({ where: { complete: false }});

    await prisma.todo.createMany({
        data: [
            { description: 'Jugar juegos', complete: true },
            { description: 'Hacer algo', complete: false },
            { description: 'Tomar mate', complete: false },
            { description: 'Comer pizza', complete: false },
            { description: 'Llenar DB', complete: false },      
        ]
    })

  return NextResponse.json({
    message: 'Seed executed'
  });
}