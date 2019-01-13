import { IFleet } from "./fleet";
import { IArtifact } from "./artifact";

export interface IWorld {
    key: number;
    owner: string;
    metal: number;
    neighbors: number[];
    fleets: IFleet[];
    iShips: number;
    pShips: number;
    industry: number;
    population: number;
    mines: number;
    artifacts: IArtifact[];
}