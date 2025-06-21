import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// async function test() {
//   try {
//     const users = await prisma.person.findMany();
//     console.log('DB connected, users:', users);
//   } catch (e) {
//     console.error('DB connection failed:', e);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// test();

export default prisma;