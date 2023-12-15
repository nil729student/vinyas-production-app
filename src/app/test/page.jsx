import prisma from '../../lib/prisma'

export default async function Page() {
    // fech usuarios: id , nombre
    const resultat = await prisma.Usuario.findMany({
        select: {
            id: true,
            nombre: true
        }
    });

    console.log(resultat);
  }


