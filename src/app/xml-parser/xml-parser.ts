import { IUniverse } from "../../lib/model/universe";
import { IWorld } from "../../lib/model/world";
import { IFleet } from "../../lib/model/fleet";
import { IArtifact } from "../../lib/model/artifact";

export function parseXml(xml: string): IUniverse {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml,'text/xml');

    let worlds: IWorld[] = Array.from(xmlDoc.querySelectorAll('report > world'))
        .map(worldElement => {
            let world: IWorld = {
                owner: '',
                key: 0,
                fleets: [],
                iShips: 0,
                pShips: 0,
                industry: 0,
                mines: 0,
                metal: 0,
                neighbors: [],
                population: 0,
                artifacts: []
            }
            world.key = getNumberFromAttribute(worldElement, 'index');
            world.industry = getNumberFromAttribute(worldElement, 'industry');
            world.population = getNumberFromAttribute(worldElement, 'population');
            const [metal, mines] = getMetalAndMines(worldElement);
            world.mines = mines;
            world.metal = metal;
            world.iShips = getHomeFleet(worldElement, 'I');
            world.pShips = getHomeFleet(worldElement, 'P');
            world.neighbors = getNeihbors(worldElement);
            world.fleets = getFleets(worldElement);
            world.artifacts = getArtifacts(worldElement);
            world.owner = getStringFromAttribute(worldElement, 'owner');
            return world;
        })

        const allWorldKeys = worlds.map(w => w.key);

        const unkownWorlds =  worlds
            .map(w => w.neighbors)
            .reduce((a,b) => a.concat(b))
            .filter((key, index, self) => { 
                return self.indexOf(key) === index;
            })
            .filter(key => {
                return allWorldKeys.indexOf(key) === -1;
            })
            .map(key => {
                const neighbors = worlds
                    .filter(w => w.neighbors.indexOf(key) !== -1)
                    .map(w => w.key)
                return {
                    owner: '???',
                    key,
                    fleets: [],
                    iShips: 0,
                    pShips: 0,
                    industry: 0,
                    mines: 0,
                    metal: 0,
                    neighbors,
                    population: 0,
                    artifacts: []
                } as IWorld
            })


    return {
        worlds: worlds.concat(unkownWorlds)
    };
}

function getHomeFleet(worldElement: Element, key: 'I'|'P'): number {
    const iShipsElement = worldElement.querySelector(`homeFleet[key=${key}]`);
    if (iShipsElement) {
        return getNumberFromAttribute(iShipsElement,'ships')
    }
    return 0;
}

function getNumberFromAttribute(element: Element, name: string): number {
    const iShipsString = element.attributes.getNamedItem(name);
    if (iShipsString) {
        return parseInt(iShipsString.value) || 0
    }
    return 0;
}

function getStringFromAttribute(element: Element, name: string): string {
    const iShipsString = element.attributes.getNamedItem(name);
    if (iShipsString) {
        return iShipsString.value
    }
    return '';
}

function getMetalAndMines(worldElement: Element): [number, number] {
    const resourceElement = worldElement.querySelector(`resource[key=metal]`);
    if (resourceElement) {
        return [
            getNumberFromAttribute(resourceElement,'metal'),
            getNumberFromAttribute(resourceElement,'mines')
        ]
    }
    return [0,0]
}

function getNeihbors(worldElement: Element): number[] {
    return Array.from(worldElement.querySelectorAll('connect'))
        .map(elem => getNumberFromAttribute(elem, 'index'));
}

function getFleets(worldElement: Element): IFleet[] {
    return Array.from(worldElement.querySelectorAll('fleet'))
        .map(elem => {

            const [metal, mines] = getMetalAndMines(elem);

            const fleet: IFleet = {
                key: getNumberFromAttribute(elem, 'index'),
                owner: getStringFromAttribute(elem, 'owner'),
                ships: getNumberFromAttribute(elem, 'ships'),
                metal: metal,
                artifacts: getArtifacts(elem)
            }

            return fleet;

        });
}

function getArtifacts(element: Element): IArtifact[] {
    return Array.from(element.querySelectorAll('artifact'))
        .map(elem => {

            const fleet: IArtifact = {
                key: getNumberFromAttribute(elem, 'index'),
                name: getStringFromAttribute(elem, 'name'),
            }

            return fleet;

        });
}