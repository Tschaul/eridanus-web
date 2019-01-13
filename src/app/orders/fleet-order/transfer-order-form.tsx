import React, { ChangeEvent } from "react";
import { ITransferShipsOrder } from "../../../lib/model/orders/order";
import { IUniverse } from "../../../lib/model/universe";
import autobind from "autobind-decorator";
import { IWorld } from "../../../lib/model/world";

export class FleetTransferOrderForm extends React.Component<{
    universe: IUniverse,
    order: ITransferShipsOrder,
    onChange: (o: ITransferShipsOrder) => void
}> {

    render() {

        const world = this.getWorld();
        const seletableFleetKeys = this.getSelectableTargetFleetKeys();
        return (
            <div>
                Target<br/>
                <select value={this.props.order.targetType} onChange={this.handleTargetTypeChange}>
                    <option value="I_SHIPS">I-Ships</option>
                    <option value="P_SHIPS">P-Ships</option>
                    {seletableFleetKeys.length && <option value="FLEET">Fleet</option>}
                </select><br/>
                {this.props.order.targetType === 'FLEET' &&
                    <select value={this.props.order.targetKey} onChange={this.handleTargetKeyChange}>
                        {world.fleets
                            .filter(f => f.key !== this.props.order.sourceKey)
                            .map(fleet => {
                                return (
                                    <option key={fleet.key} value={fleet.key}>F{fleet.key}</option>
                                )
                            })}
                    </select>
                }
                <br/>
                Amount<br/>
                <input type="number" onChange={this.handleAmountChange}></input>
            </div>
        )
    }

    private getWorld() {
        return this.props.universe.worlds.find(w => {
            return w.fleets.some(f => {
                return f.key === this.props.order.sourceKey;
            });
        }) as IWorld;
    }

    private getSelectableTargetFleetKeys() {
        return this.getWorld().fleets
            .filter(f => f.key !== this.props.order.sourceKey)
            .map(fleet => {
                return fleet.key
            })
    }

    @autobind
    handleTargetTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        const seletableFleetKeys = this.getSelectableTargetFleetKeys();
        this.props.onChange({
            ...this.props.order,
            targetType: event.target.value as any,
            targetKey: seletableFleetKeys[0]
        })
    }

    @autobind
    handleTargetKeyChange(event: ChangeEvent<HTMLSelectElement>) {
        this.props.onChange({
            ...this.props.order,
            targetKey: parseInt(event.target.value)
        })
    }

    @autobind
    handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange({
            ...this.props.order,
            amount: parseInt(event.target.value)
        })
    }

}