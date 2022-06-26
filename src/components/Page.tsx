import { lazy } from "react";

const Button = lazy(() => import("./Button"));

export interface PageProps {
  url: string;
}

export default function Page({ url }: PageProps) {
  return (
    <main>
      <h1>Page {url}</h1>

      <Button />
    </main>
  );
}
