import React from "react";
import { PlanetMetadata, PossibleStatusCodes } from "../pages/home";
import { PlanetRepository } from "../repositories/planet";
import PlanetCard from "./planet-card";

const ERROR_MESSAGES = {
  DESC: "Description can be between 25 and 255 characters!",
  STATUS: "Please provide a valid status.",
};

export class PlanetCardWrapper extends React.Component<
  PlanetMetadata,
  PlanetMetadata
> {
  constructor(props: PlanetMetadata) {
    super(props);
    // This is a big no-no, a state which saves planets would be much better, this card only receiving the name
    this.state = this.props;

    this.savePlanetChanges = this.savePlanetChanges.bind(this);
    this.validatePlanetChanges = this.validatePlanetChanges.bind(this);
  }

  savePlanetChanges(description: string, status: PossibleStatusCodes) {
    PlanetRepository.updatePlanet({
      name: this.state.name,
      description,
      status,
      captain: this.state.captain || "",
      robots: this.state.robots,
    });

    this.setState({
      description,
      status,
      captain: "self",
    });
    return;
  }

  validatePlanetChanges(description?: string, status?: number) {
    if (!description || description.length < 25 || description.length > 255) {
      return ERROR_MESSAGES.DESC;
    }

    if (!status || [0, 1, 2, 3].indexOf(status) === -1) {
      return ERROR_MESSAGES.STATUS;
    }

    return "";
  }

  render() {
    return (
      <PlanetCard
        {...this.state}
        handleSaveChanges={this.savePlanetChanges}
        validateChanges={this.validatePlanetChanges}
      />
    );
  }
}
