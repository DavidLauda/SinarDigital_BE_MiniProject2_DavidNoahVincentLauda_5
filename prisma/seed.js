const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");


  try {
    await prisma.candidate.deleteMany();
    console.log("Deleted existing candidates.");
  } catch (e) {
    console.log("No candidates to delete or table not found yet.");
  }

 
  const webDev = await prisma.division.upsert({
    where: { name: "Web Development" },
    update: {},
    create: { name: "Web Development" },
  });

  const uiUx = await prisma.division.upsert({
    where: { name: "UI/UX Design" },
    update: {},
    create: { name: "UI/UX Design" },
  });

  const bic = await prisma.division.upsert({
    where: { name: "Business IT Case" },
    update: {},
    create: { name: "Business IT Case" },
  });

  console.log("Divisions created/found.");


  const divisions = [webDev.id, uiUx.id, bic.id];
  const candidatesData = [];

  for (let i = 1; i <= 20; i++) {
    const randomDiv = divisions[Math.floor(Math.random() * divisions.length)];

    const gpa = (Math.random() * (4.0 - 2.5) + 2.5).toFixed(2);

    candidatesData.push({
      name: `Candidate ${i}`,

      nim: `25000${i.toString().padStart(3, "0")}`,
      gpa: parseFloat(gpa),
      divisionId: randomDiv,
      photo: null,
    });
  }


  console.log("Inserting 20 candidates...");

  for (const candidate of candidatesData) {
    await prisma.candidate.create({
      data: candidate,
    });
  }

  console.log("Seeding completed successfully: 20 Candidates created.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
