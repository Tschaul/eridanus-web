import { IArtifact } from "./artifact";

export interface IFleet {
    key: number;
    ships: number;
    metal: number;
    owner: string;
    artifacts: IArtifact[];
}