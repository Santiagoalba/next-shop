import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';

export const signInWithEmailAndPassword = async(email: string, password: string ) => {

    if(!email || !password) return null;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const dbUser = await signUpWithEmailAndPassword( email, password );
        return dbUser;
    }

    if ( !bcrypt.compareSync(password, user.password ?? '')) {
        return null
    }

    return user;

}


export const signUpWithEmailAndPassword = async( email: string, password: string ) => {
    const user = await prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0],
        }
    });

    return user;
}