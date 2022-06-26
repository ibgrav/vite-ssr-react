import { renderToPipeableStream } from "react-dom/server";
import { Render, RenderProps } from "./Render";
import { Writable } from "stream";
import { renderHtml } from "./render.html";

interface RenderNodeProps {
  url: string;
  html: string;
}

export async function renderNode({ url, html }: RenderNodeProps) {
  const props: RenderProps = { page: { url }, head: { title: "HBS" } };

  const { app } = await renderFromNodeStream({ props });

  return renderHtml({ app, props, html });
}

interface RenderFromNodeStreamProps {
  props: RenderProps;
}

interface RenderFromNodeStreamResponse {
  app: string;
  error?: Error;
}

function renderFromNodeStream({ props }: RenderFromNodeStreamProps): Promise<RenderFromNodeStreamResponse> {
  return new Promise((resolve) => {
    let app = "";
    const writer = new Writable({ write: (chunk) => (app += String(chunk)) });

    const stream = renderToPipeableStream(<Render {...props} />, {
      onAllReady() {
        stream.pipe(writer);
        resolve({ app });
      },
      onError(e) {
        console.error(e);
        resolve({ app, error: e as Error });
      },
      onShellError(e) {
        console.error(e);
        resolve({ app, error: e as Error });
      },
    });
  });
}
