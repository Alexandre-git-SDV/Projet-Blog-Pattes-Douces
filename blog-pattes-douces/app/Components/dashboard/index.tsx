"use client";

import { useEffect, useState } from "react";

type Article = {
    id: string;
    auteurId: string;
    titre: string;
    texte: string;
    image?: string;
    date: string;
    vue: any[];
    reaction1: any[];
    reaction2: any[];
    
};

export default function Post_user() { // Composant pour afficher les articles d'un utilisateur
  const [articles, setArticles] = useState<Article[]>([]);
  const pseudo = typeof window !== "undefined" ? localStorage.getItem("pseudo") : null; // Récupération de l'id_user depuis le localStorage
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null; // Récupération de l'id_user depuis le localStorage

  useEffect(() => { // Récupération des articles de l'utilisateur
    const fetchArticles = async (): Promise<void> => {
      try {
        const response = await fetch("/api/article");
        if (!response) throw new Error("Erreur lors du chargement de vos articles");

        const data: Article[] = await response.json();
        const userArticles = data.filter((article) => article.auteurId === userId); // Filtrer par id_user
        setArticles(userArticles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, [userId]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Vos Statistiques récentes</h1>
      <div className="space-y-6">
        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">Total d'articles</h2>
          <p className="text-gray-500">{articles.length} Articles Publiés</p>
        </div>

        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">Total de Vues</h2>
          <p className="text-gray-500">
            {articles.reduce((total, article) => total + article.vue.length, 0)} Vues
          </p>
        </div>

        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">Total de Réactions</h2>
          <p className="text-gray-500">
            {articles.reduce((total, article) => total + article.reaction1.length + article.reaction2.length, 0)} Réactions
          </p>
        </div>

        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold">{pseudo}</h2>
          <div className="flex space-x-4">
            <p className="text-sm text-gray-400">
              Total de Vues : {articles.reduce((total, article) => total + article.vue.length, 0)}
            </p>
            <p className="text-sm text-blue-400">
              Total de Like : {articles.reduce((total, article) => total + article.reaction1.length, 0)}
            </p>
            <p className="text-sm text-red-400">
              Total de Dislike : {articles.reduce((total, article) => total + article.reaction2.length, 0)}
            </p>
            <p className="text-sm text-green-400">
              Total de Réactions : {articles.reduce((total, article) => total + article.reaction1.length + article.reaction2.length, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
