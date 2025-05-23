import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const id = params.id;

  try {
    const article = await prisma.article.findUnique({
      where: { id: id }, 
      select: {
        id: true,
        auteurId: true,
        titre: true,
        texte: true,
        image: true,
        date: true,
        vue: true,
        reaction1: true,
        reaction2: true,
        auteur:{
          select:{
            id: true,
            pseudo: true,
          }
        },
        commentaires: {
          select: {
            id: true,
            texte: true,
            date: true,
            reaction1: true,
            reaction2: true,
            commentataire:{
              select:{
                id: true,
                pseudo: true,
              }
            },
          },
        },
      },
    });

    


    if (!article) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération de l'article" },
      { status: 500 }
    );
  }
}
