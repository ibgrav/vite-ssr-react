//@ts-check

import { resolve } from "path";
import { readFile } from "fs/promises";
import { createServer as createHttpServer } from "http";
import { createServer as createViteServer } from "vite";

const port = parseInt(process.env.PORT || "5173");

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  const server = createHttpServer((req, res) => {
    vite.middlewares(req, res, async () => {
      try {
        let html = await readFile(resolve(process.cwd(), "index.html"), "utf-8");
        html = await vite.transformIndexHtml(req.url || "/", html);

        /** @type {import('../src/server/entry.node').entryNode} */
        const entry = (await vite.ssrLoadModule("/src/server/entry.node.ts")).entryNode;

        await entry({ req, res, html });
      } catch (e) {
        const error = /** @type {Error} */ (e);
        vite.ssrFixStacktrace(error);
        res.statusCode = 500;
        res.end(error);
      }
    });
  });

  return { vite, server };
}

createServer().then(({ server }) => {
  server.listen(port, "0.0.0.0", () => {
    console.log(`http://localhost:${port}/`);
  });
});
