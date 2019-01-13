import React, { ChangeEvent } from "react";
import { IHookArtifactOrder } from "../../../lib/model/orders/order";
import autobind from "autobind-decorator";
import { IWorld } from "../../../lib/model/world";

export class HookArtifactOrderForm extends React.Component<{
    world: IWorld,
    order: IHookArtifactOrder,
    onChange: (o: IHookArtifactOrder) => void
}> {
    render() {
        return (
            <div>
                Artifact<br />
                <select value={this.props.order.artifactKey} onChange={this.handleArtifactChange}>
                    {this.props.world.artifacts.map( a => {
                        return( 
                            <option value={a.key}>{a.name}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    @autobind
    handleArtifactChange(event: ChangeEvent<HTMLSelectElement>) {
        this.props.onChange({
            ...this.props.order,
            artifactKey: event.target.value as any,
        })
    }
}