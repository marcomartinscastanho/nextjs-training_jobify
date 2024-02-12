const { PrismaClient } = require("@prisma/client");
const data = require("../assets/mock-data.json");
const prisma = new PrismaClient();

const main = async () => {
  const clerkId = "user_2cBx7mphgHLrZ1yXW6WHLXftfTk";
  const jobs = data.map((job) => ({ ...job, clerkId }));
  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
