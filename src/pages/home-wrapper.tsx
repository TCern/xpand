import React from "react";
import { GetPlanetsParams, PlanetRepository } from "../repositories/planet";

import Home, { PlanetMetadata } from "./home";

interface HomeWrapperState {
  planets: PlanetMetadata[];
}

export class HomeWrapper extends React.PureComponent<{}, HomeWrapperState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      planets: [],
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async loadPlanets(params: GetPlanetsParams) {
    // some spinner could also go here, and use a loading boolean on state
    return await PlanetRepository.getPlanets(params);
  }

  async handleScroll() {
    // far from ideal, but works as a POC
    if (window.scrollY + window.innerHeight >= document.body.clientHeight - 2) {
      const newPlanets =
        (await this.loadPlanets({
          number: 10,
          startingIndex: this.state.planets.length,
        })) || [];

      this.setState({
        planets: [...this.state.planets, ...newPlanets],
      });
    }
  }

  async componentDidMount() {
    const firstPlanets =
      (await this.loadPlanets({ number: 15, startingIndex: 0 })) || [];
    this.setState({ planets: firstPlanets });
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return <Home planets={this.state.planets} />;
  }
}
