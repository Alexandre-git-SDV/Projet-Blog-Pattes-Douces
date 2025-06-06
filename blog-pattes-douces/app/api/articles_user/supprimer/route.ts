import { NextResponse } from "next/server";
import {prisma} from "@/src/db/prisma";

export async function POST(req: Request) {
    try {
      const { id } = await req.json();

      await prisma.commentaire.deleteMany({
        where: { article_sourceId: id }
      });
    
      await prisma.article.delete({ where: { id } });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to delete article" }, { status: 500 });
    }
  }
  