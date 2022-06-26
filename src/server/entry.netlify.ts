import { Handler } from "@netlify/functions";
import { renderNode } from "src/render/render.node";

import html from "../../dist/client/index.html?raw";

export const entryNetlify: Handler = async (event) => {
  const body = await renderNode({ html, url: event.rawUrl });

  return {
    statusCode: 200,
    headers: { "content-type": "text/html" },
    body,
  };
};
