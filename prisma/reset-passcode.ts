import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const MIN_PASSCODE_LENGTH = 6;

const passcode = process.argv[2];
if (!passcode) {
  console.error('Usage: npm run passcode:reset -- "<new-passcode>"');
  process.exit(1);
}
if (passcode.length < MIN_PASSCODE_LENGTH) {
  console.error(
    `❌ Passcode must be at least ${MIN_PASSCODE_LENGTH} characters.`,
  );
  process.exit(1);
}

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL or DIRECT_URL for the passcode reset.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passcodeHash = await bcrypt.hash(passcode, 12);
  await prisma.settings.upsert({
    where: { id: 1 },
    update: { passcodeHash },
    create: { id: 1, passcodeHash },
  });
  console.log("✅ Admin passcode updated.");
  console.log(
    "Note: existing admin sessions stay valid for up to 7 days. " +
      "If you suspect the old passcode was compromised, also rotate AUTH_SECRET.",
  );
}

main()
  .catch((e) => {
    console.error("❌ Passcode reset failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
