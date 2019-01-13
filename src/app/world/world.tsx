import { IWorld } from "../../lib/model/world";
import React from "react";
import { IOrder } from "../../lib/model/orders/order";
import { makeOrderString } from "../../lib/model/orders/make-order-string";

export class WorldView extends React.Component<{
    world: IWorld,
    ordersByFleet: Map<number, Array<IOrder & { orderKey: number }>>,
    newOrder: (k: number) => void,
    selectOrder: (k: number) => void
}> {
    render() {
        const {
            owner,
            industry,
            fleets,
            iShips,
            key,
            metal,
            mines,
            pShips,
            population,
            artifacts
        } = this.props.world;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Key</th>
                            <th>Owner</th>
                            <th>Industry</th>
                            <th>Population</th>
                            <th>Metal</th>
                            <th>Mines</th>
                            <th>I-Ships</th>
                            <th>P-Ships</th>
                            <th>Artifacts</th>
                        </tr>
                        <tr>
                            <td>{key}</td>
                            <td>{owner}</td>
                            <td>{industry}</td>
                            <td>{population}</td>
                            <td>{metal}</td>
                            <td>{mines}</td>
                            <td>{iShips}</td>
                            <td>{pShips}</td>
                            <td>{artifacts.map(a => a.name).join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>Key</th>
                            <th>Owner</th>
                            <th>Ships</th>
                            <th>Metal</th>
                            <th>Order</th>
                            <th>Artifacts</th>
                        </tr>
                        {fleets.map(fleet => {
                            const orders = this.props.ordersByFleet.get(fleet.key)||[];
                            return (
                                <tr key={fleet.key}>
                                    <td>{fleet.key}</td>
                                    <td>{fleet.owner}</td>
                                    <td>{fleet.ships}</td>
                                    <td>{fleet.metal}</td>
                                    <td>{fleet.artifacts.map(a => a.name).join(', ')}</td>
                                    <td>
                                        {orders.map(order => {
                                            return (
                                                <span 
                                                    key={order.orderKey}
                                                    onClick={()=>this.props.selectOrder(order.orderKey)}
                                                >
                                                    {makeOrderString(order)}&nbsp;
                                                </span>
                                            )
                                        })}
                                        <span onClick={()=>this.props.newOrder(fleet.key)}>(+)</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

// key,
// fleets: [],
// iShips: 0,
// pShips: 0,
// industry: 0,
// mines: 0,
// metal: 0,
// neighbors: [],
// population: 0,