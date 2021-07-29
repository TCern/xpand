import { PlanetMetadata, PossibleStatusCodes } from "../pages/home";

// can be extracted to a config or in env
const baseUrl = "http://localhost:8080";

export type GetPlanetsParams = {
  number: number;
  startingIndex: number;
};

export type UpdatePlanetParams = {
  name: string;
  description: string;
  status: PossibleStatusCodes;
  captain: string;
  robots?: string[];
};

export class PlanetRepository {
  static async getPlanets(
    params: GetPlanetsParams
  ): Promise<PlanetMetadata[] | undefined> {
    const { number, startingIndex } = params;
    try {
      const res = await fetch(
        `${baseUrl}/planet?number=${number}&startingIndex=${startingIndex}`,
        {
          method: "get",
        }
      ).then((res) => res.json());

      return res.planets;
    } catch (err) {
      // can use some logging service
      console.log(err);
    }
  }

  static async updatePlanet(params: UpdatePlanetParams) {
    console.log(JSON.parse(JSON.stringify(params)));
    try {
      fetch(`${baseUrl}/planet`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    } catch (err) {
      // can use some logging service
      console.log(err);
    }
  }
}
