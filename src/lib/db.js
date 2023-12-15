// lib/db.js
// lib/db.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // En producción, siempre crea una nueva instancia de PrismaClient
  prisma = new PrismaClient();
} else {
  // En desarrollo, crea una instancia de PrismaClient por solicitud (no en el navegador)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
