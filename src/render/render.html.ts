import { RenderProps } from "./Render";

interface RenderDocProps {
  html: string;
  app: string;
  props: RenderProps;
}

export function renderHtml({ app, props, html }: RenderDocProps) {
  const head = `<title>${props.head.title}</title>`;

  return html
    .replace("<!--app-->", app)
    .replace("<!--head-->", head)
    .replace("/*--props--*/", `window.RENDER_PROPS = ${JSON.stringify(props)};`);
}
