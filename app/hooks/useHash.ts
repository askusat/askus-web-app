import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useHash() {
  const router = useRouter();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      console.log(`Path changing to ${url}`);
      setHash(url);
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return hash;
}
