import { db } from "./index.js";
import { users } from "./schema.js";

async function seed() {
    console.log("🌱 Seeding database...");
  
    await db.delete(users); // clean table first (optional)
  
    await db.insert(users).values([
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Alice" }
    ]);
  
    console.log("✅ Seed complete");
    process.exit(0);
  }

  seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });