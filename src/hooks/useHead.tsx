import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export interface HeadProps {
  title: string;
}

type HeadPropsState = [HeadProps, Dispatch<SetStateAction<HeadProps>>];

export const createHeadProps = (head?: Partial<HeadProps>): HeadProps => ({
  title: "Harvard Business School",
  ...head,
});

const HeadContext = createContext<HeadPropsState>([createHeadProps(), (p) => p]);

interface HeadProviderProps extends Partial<HeadProps> {
  children: ReactNode;
}

export function HeadProvider({ children, ...props }: HeadProviderProps) {
  const [head, setHead] = useState<HeadProps>(createHeadProps(props));

  useEffect(() => {
    console.log("updating title", head.title);
    document.title = head.title;
  }, [head.title]);

  return <HeadContext.Provider value={[head, setHead]}> {children}</HeadContext.Provider>;
}

export function useHead() {
  const [head, setHead] = useContext(HeadContext);

  const setTitle = (fn: (title: string) => string) => {
    setHead((head) => ({ ...head, title: fn(head.title) }));
  };

  return {
    title: head.title,
    setTitle,
  };
}
