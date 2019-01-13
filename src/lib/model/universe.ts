import { IWorld } from "./world";
import { IFleet } from "./fleet";

export interface IUniverse {
  worlds: IWorld[];
}

export function findWorldOfFleet(universe: IUniverse, fleetKey: number): IWorld {
  return universe.worlds.find(w => {
    return w.fleets.some(f => {
      return f.key === fleetKey;
    });
  }) as IWorld;
}

export function findFleetForArtifact(universe: IUniverse, artifactKey: number) {
  const allFleets = universe.worlds.map(w => w.fleets).reduce((a, b) => a.concat(b), [])
  return allFleets.find( f => f.artifacts.some(a => a.key === artifactKey)) as IFleet;
}

export function findFleet(universe: IUniverse, fleetKey: number) {
  const allFleets = universe.worlds.map(w => w.fleets).reduce((a, b) => a.concat(b), [])
  return allFleets.find( f => f.key == fleetKey) as IFleet;
}