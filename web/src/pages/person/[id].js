import Head from "next/head";
import { useRouter } from "next/router";
import PersonContainer from "@/components/PersonContainer";
import { useEffect, useState } from "react";

export default function Person() {
  const router = useRouter();
  const [id, setId] = useState();

  useEffect(() => {
    if (router && router.query) {
      const {
        query: { id }
      } = router;
      setId(id);
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>Profile Page</title>
      </Head>
      <main>{id && <PersonContainer id={id} />}</main>
    </div>
  );
}
