import React from "react";

import Helmet from "react-helmet";

import { PlanetCardWrapper } from "../components/planet-card-wrapper";
import styles from "./home.module.css";

export interface PlanetMetadata {
  name: string;
  robots?: string[];
  captain?: string;
  description?: string;
  status?: PossibleStatusCodes;
  imageSource?: string;
}

export type PossibleStatusCodes = 0 | 1 | 2 | 3;

export interface HomeProps {
  planets: PlanetMetadata[];
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  return (
    <div className={styles["homeContainer"]}>
      <Helmet>
        <title>Xpand</title>
        <meta property="og:title" content="Xpand" />
      </Helmet>
      <div className={styles["titleContainer"]}>
        <span className={styles["title"]}>xpand</span>
      </div>
      <div className={styles["bodyContainer"]}>
        {props.planets.map((planet, key) => (
          <PlanetCardWrapper {...planet} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Home;
