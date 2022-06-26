import { Suspense } from "react";
import Page, { PageProps } from "src/components/Page";
import { createHeadProps, HeadProps, HeadProvider } from "src/hooks/useHead";

declare global {
  interface Window {
    RENDER_PROPS?: RenderProps;
  }
}

export interface RenderProps {
  head: HeadProps;
  page: PageProps;
}

export function createRenderProps(props: Partial<RenderProps>): RenderProps {
  return {
    head: createHeadProps(props.head),
    page: { url: "/", ...props.page },
  };
}

export function Render(props: RenderProps) {
  return (
    <Suspense>
      <HeadProvider {...props.head}>
        <Page {...props.page} />
      </HeadProvider>
    </Suspense>
  );
}
