import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.document.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        id: "user_alice",
        name: "Alice",
        email: "alice@example.com",
      },
      {
        id: "user_bob",
        name: "Bob",
        email: "bob@example.com",
      },
      {
        id: "user_sarah",
        name: "Sarah",
        email: "sarah@example.com",
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });