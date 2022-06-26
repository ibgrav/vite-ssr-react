import type { IncomingMessage, ServerResponse } from "http";
import { renderNode } from "src/render/render.node";

export interface EntryNodeProps {
  req: IncomingMessage;
  res: ServerResponse;
  html: string;
}

export async function entryNode({ req, res, html }: EntryNodeProps) {
  const doc = await renderNode({ html, url: req.url || "/" });

  res.setHeader("content-type", "text/html");
  res.statusCode = 200;
  res.end(doc);
}
