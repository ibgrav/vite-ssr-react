import { hydrateRoot } from "react-dom/client";
import { createRenderProps, Render, RenderProps } from "./Render";

export function renderClient() {
  const props: RenderProps = window.RENDER_PROPS || createRenderProps({ page: { url: location.pathname } });

  hydrateRoot(document.querySelector("#app")!, <Render {...props} />, {
    onRecoverableError(e) {
      console.error("hydrate error");
    },
  });
}
