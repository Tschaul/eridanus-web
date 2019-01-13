import React from "react";

import {Network, DataSet, Options} from 'vis';
import { IUniverse } from "../../lib/model/universe";

export class NetworkView extends React.Component<{
    universe: IUniverse,
    onSelectWorld: (k: number) => void,
    onDeselectWorld: () => void
}> {
    div: HTMLDivElement | null = null;
    network: Network | null = null;

    render() {
        return (
            <div style={{width: "700px", height: "700px"}} ref={element => this.div = element}></div>
        )
    }

    componentDidMount() {
        const {universe} = this.props;
        if(this.div) {
            const nodes = new DataSet(universe.worlds.map(world => {
                const totalShips = world.iShips + world.pShips + world.fleets.map(f => f.ships).reduce((a,b) => a+b, 0);
                const metalInShips = world.fleets.map(f => f.metal).reduce((a,b) => a+b, 0);
                const label = 
                    `*W${world.key}*\n`+
                    `${world.owner}\n`+
                    `🏭${world.industry} 🏠${world.population} 🔩${world.metal} ⛏️${world.mines}\n`+
                    `🚀${totalShips} #️⃣${world.fleets.length} 🔩${metalInShips}\n`
                return {
                    id: world.key,
                    label,
                    shape: 'circle',
                    group: world.owner,
                    font: { multi: 'md' }
                }
            }))
            
            const edges = new DataSet(universe.worlds.map(world => {
                return world.neighbors.map(neighbor => {
                    return {
                        from: world.key,
                        to: neighbor
                    }
                })
            }).reduce((a,b)=>a.concat(b)).filter(g => g.from < g.to));

            const data = {
                nodes: nodes,
                edges: edges
            };

            const options: Options = {
                
            };

            this.network = new Network(this.div, data, options);
            
            this.network.on("selectNode", (params) => {
                this.props.onSelectWorld(params.nodes[0])
            });

            this.network.on("deselectNode", () => {
                this.props.onDeselectWorld()
            });
        }
    }
}