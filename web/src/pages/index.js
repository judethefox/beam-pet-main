import { createUseStyles } from "react-jss";
import Head from "next/head";
import PeopleContainer from "@/components/PeopleContainer";

const useStyles = createUseStyles({
  divider: {
    border: "none",
    borderTop: "2px solid #F0F0F0",
    margin: 0,
    maxWidth: 240,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Beam Pets</title>
      </Head>
      <main>
        <h1>Welcome to Beam Pets!</h1>
        <p>
          Get started by editing <code>pages/index.js</code>
        </p>
        <hr className={classes.divider} />
        <PeopleContainer />
      </main>
    </div>
  );
}
