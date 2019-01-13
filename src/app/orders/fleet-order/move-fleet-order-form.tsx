import React, { ChangeEvent } from "react";
import { IUniverse } from "../../../lib/model/universe";
import { IMoveFleetOrder } from "../../../lib/model/orders/order";
import { IWorld } from "../../../lib/model/world";
import autobind from "autobind-decorator";

export class MoveFleetOrderForm extends React.Component<{
    universe: IUniverse,
    order: IMoveFleetOrder,
    onChange: (o: IMoveFleetOrder) => void
}> {
    render() {

        const world = this.getWorld();

        return (
            <div>
                <select value={this.props.order.destinationKey} onChange={this.handleDestinationKeyChange}>
                    {world.neighbors
                        .map(neighborKey => {
                            return (
                                <option key={neighborKey} value={neighborKey}>W{neighborKey}</option>
                            )
                        })}
                </select>
            </div>
        )
    }

    private getWorld() {
        return this.props.universe.worlds.find(w => {
            return w.fleets.some(f => {
                return f.key === this.props.order.fleetKey;
            });
        }) as IWorld;
    }

    @autobind
    handleDestinationKeyChange(event: ChangeEvent<HTMLSelectElement>) {
        this.props.onChange({
            ...this.props.order,
            destinationKey: parseInt(event.target.value)
        })
    }
}