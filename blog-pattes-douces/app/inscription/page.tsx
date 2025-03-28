import prisma from "@/src/db/prisma1"
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";

// déclarer les variables en dehors des fonctions 
let alerte=""
export default function Inscription() {
  
  

  async function createPost(formData: FormData) {
    "use server";
    // récupère les valeurs des inputs
    const pseudo = formData.get("pseudo") as string;
    const bio = formData.get("bio") as string;
    const mail = formData.get("mail") as string;
    const password = formData.get("password") as string;


    // creation d'un user
    // il est important de mettre await ici 
    // ça permet d'attendre jusqu'à ce qu'à ce que la variable vérifie toute la base avant de continuer
    // ne pas mettre await renverra toujours "Promise" c'est à dire false
    const user_check = await prisma.user.findFirst({where:{pseudo: pseudo }})

    if (!(user_check)){
    await prisma.user.create({
      data: {
      pseudo, 
      bio,
      mail,
      password
      },
    });

    alerte=""
    
    // redirection vers la page user (à changer)

    revalidatePath("/inscription");
    redirect("/inscription");
  }else{
    alerte="Ce user existe deja, veuiller utiliser un autre nom"
    console.log("la valeur de alerte est changé")
    revalidatePath("/inscription");
    redirect("/inscription");
  }
  
  }
 
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form action={createPost} className="space-y-6">
        {/* pseudo */}
        <div>
          <label htmlFor="pseudo" className="block text-lg mb-2">
            pseudo
          </label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            placeholder="Enter your post pseudo"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        {/* message d'alerte quand le user existe deja */}
        <h2>{alerte}</h2>

        {/* bio */}
        <div>
          <label htmlFor="bio" className="block text-lg mb-2">
            bio
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Write your post bio here..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        {/* mail */}
        <div>
          <label htmlFor="mail" className="block text-lg mb-2">
          mail
          </label>
          <input
            type="text"
            id="mail"
            name="mail"
            placeholder="Enter your post mail"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        {/* mot de passe */}
        <div>
          <label htmlFor="password" className="block text-lg mb-2">
          password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter your post password"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Inscription
        </button>
      </Form>
    </div>
  );
}