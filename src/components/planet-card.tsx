import React, { useRef, useState } from "react";

import styles from "./planet-card.module.css";
import { PlanetMetadata, PossibleStatusCodes } from "../pages/home";

type StatusMeta = {
  text: string;
  color: string;
};

interface IPlanetCard extends PlanetMetadata {
  handleSaveChanges: (description: string, status: PossibleStatusCodes) => void;
  // validation could be handled by save changes, up to debate which is better
  validateChanges: (description?: string, status?: number) => string;
}

const statusNumberToMeta: Record<number, StatusMeta> = {
  0: { text: "TODO", color: "var(--dl-color-black)" },
  1: { text: "En route", color: "var(--dl-color-dark-gray)" },
  2: { text: "OK", color: "var(--dl-color-success)" },
  3: { text: "!OK", color: "var(--dl-color-danger)" },
};

const PlanetCard: React.FC<IPlanetCard> = (props: IPlanetCard) => {
  const { imageSource, name, status = 0, description, captain, robots } = props;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleSave = () => {
    setValidationMessage("");
    const description = descriptionRef.current?.value;
    const status = parseInt(statusRef.current?.value || "0");

    const validationMessage = props.validateChanges(description, status);
    if (validationMessage) {
      setValidationMessage(validationMessage);
      return;
    }

    props.handleSaveChanges(description || "", status as PossibleStatusCodes);
    setExpanded(!expanded);
  };
  return (
    <div className={styles["cardRoot"]}>
      <div
        className={styles["cardDetails"]}
        onClick={() => setExpanded(!expanded)}
      >
        <div className={styles["leftContainer"]}>
          <img alt={name} src={imageSource} className={styles["image"]} />
          <span className={styles["planetName"]}>{name}</span>
        </div>
        <div
          className={`${styles["middleContainer"]} ${
            !description && styles["noDescription"]
          } `}
        >
          <span>{description || "No description yet :/"}</span>
          <div className={styles["captainAndRobots"]}>
            {captain && (
              <span className={styles["captainText"]}>
                <b>by captain</b>: {captain}
              </span>
            )}
            {robots && (
              <span>
                <b>Robots</b>:{" "}
                {robots.reduce((acc: string, robot: string) => {
                  acc += `${robot}, `;
                  return acc;
                }, "")}
              </span>
            )}
          </div>
        </div>
        <span
          style={{ color: statusNumberToMeta[status].color }}
          className={styles["status"]}
        >
          {statusNumberToMeta[status].text}
        </span>
      </div>
      {expanded && (
        <div className={`${styles["editAddon"]}`}>
          <hr />
          <textarea
            placeholder="Edit description here"
            style={{ width: undefined }}
            className={`${styles["editTextarea"]}`}
            ref={descriptionRef}
          />
          <select ref={statusRef} className={`${styles["editStatus"]}`}>
            {Object.keys(statusNumberToMeta).map((key) => (
              <option value={key} key={key} defaultValue={props.status}>
                {statusNumberToMeta[parseInt(key)].text}
              </option>
            ))}
          </select>
          <button className={styles["saveChangesBtn"]} onClick={handleSave}>
            Save
          </button>
          <span className={styles["validationMessage"]}>
            {validationMessage}
          </span>
        </div>
      )}
    </div>
  );
};

PlanetCard.defaultProps = {
  imageSource:
    "https://i.natgeofe.com/n/b4a4f4c3-269e-4f37-a94d-45d86cf0cb52/ceres_occatorcrater.jpg",
  status: 0,
};

export default PlanetCard;
