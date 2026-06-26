import Fastify from "fastify";
import cors from "@fastify/cors";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import "dotenv/config";

const app = Fastify({ logger: false });

app.register(cors, {
  origin: true,
});

// health check
app.get("/api/health", async () => {
  return { ok: true };
});

// sample route
app.get("/api/users", async () => {
  return db.select().from(users);
});

app.post("/api/users", async (req: any) => {
  const name = req.body.name;

  await db.insert(users).values({ name });

  return { ok: true };
});


app.listen({ port: Number(process.env.API_PORT) || 3001, host: "0.0.0.0" });