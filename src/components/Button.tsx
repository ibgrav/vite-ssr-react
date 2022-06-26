import { useEffect, useState } from "react";
import { useHead } from "src/hooks/useHead";

export default function Button() {
  const [count, setCount] = useState(0);

  const { setTitle } = useHead();

  useEffect(() => {
    setTitle((title) => count + title.substring(0, 3));
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
