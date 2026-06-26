import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const clientDistPath =
  process.env.CLIENT_DIST_PATH ?? path.join(__dirname, "../../client/dist");

const app = Fastify({ logger: !isProd });

type CreateUserBody = {
  name: string;
};

app.register(cors, {
  origin: true,
});

if (isProd) {
  app.register(fastifyStatic, {
    root: clientDistPath,
    prefix: "/",
  });
}

// health check
app.get("/api/health", async () => {
  return { ok: true };
});

// sample route
app.get("/api/users", async () => {
  return db.select().from(users);
});

app.post<{ Body: CreateUserBody }>("/api/users", async (req, reply) => {
  const { name } = req.body;

  if (!name?.trim()) {
    throw new Error("Name required");
  }
  
  await db.insert(users).values({ name });

  return { ok: true };
});

if (isProd) {
  app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith("/api")) {
      return reply.code(404).send({
        error: "Not found",
      });
    }

    return reply.sendFile("index.html");
  });
}

try {
  await app.listen({
    port: Number(process.env.API_PORT) || 3001,
    host: "0.0.0.0",
  });

  console.log(`Server started on port ${process.env.API_PORT ?? 3001}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
