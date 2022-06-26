//@ts-check

import { readFileSync } from "fs";
import { createServer } from "http";
import { resolve } from "path";
import sirv from "sirv";
import { entryNode } from "../dist/node/entry.node.js";

const port = parseInt(process.env.PORT || "5173");
const html = readFileSync(resolve(process.cwd(), "dist/client/index.html"), "utf-8");

const assets = sirv("dist/client", {
  maxAge: 31536000, // 1Y
  immutable: true,
  extensions: [],
});

const server = createServer((req, res) => {
  assets(req, res, async () => {
    await entryNode({ req, res, html });
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`http://localhost:${port}/`);
});
