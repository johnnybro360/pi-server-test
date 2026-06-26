import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(__dirname);
console.log(path.join(__dirname, "../../client/dist"));


const app = Fastify({ logger: false });

app.register(cors, {
  origin: true,
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "../../client/dist"),
  prefix: "/",
  decorateReply: false
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

app.setNotFoundHandler((req, reply) => {
  if (req.url.startsWith("/api")) {
    reply.code(404).send({ error: "Not found" });
    return;
  }

  const filePath = path.join(__dirname, "../../client/dist/index.html");
  const html = fs.readFileSync(filePath, "utf-8");

  reply.type("text/html").sendFile(html);
});

app.listen({ port: Number(process.env.API_PORT) || 3001, host: "0.0.0.0" });