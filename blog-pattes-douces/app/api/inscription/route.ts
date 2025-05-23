import { prisma } from "@/src/db/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const { pseudo, mail, biographie, password } = await request.json();

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { pseudo: pseudo },
                { email: mail }
            ]
        }
    });

    if (existingUser) {
        if (existingUser.pseudo === pseudo) {
            return NextResponse.json({ message: "Ce pseudo est déjà utilisé" }, { status: 400 });
        }
        if (existingUser.email === mail) {
            return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            pseudo,
            email: mail,
            biographie,
            password: hashedPassword,
        },
    });
    
    return NextResponse.json({ message: "Inscription réussie" }, { status: 200 });
}