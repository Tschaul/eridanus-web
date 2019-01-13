import React, { ChangeEvent } from "react";
import { IUnhookArtifactOrder } from "../../../lib/model/orders/order";
import autobind from "autobind-decorator";
import { IFleet } from "../../../lib/model/fleet";

export class UnhookArtifactOrderForm extends React.Component<{
    fleet: IFleet,
    order: IUnhookArtifactOrder,
    onChange: (o: IUnhookArtifactOrder) => void
}> {
    render() {
        return (
            <div>
                Artifact<br />
                <select value={this.props.order.artifactKey} onChange={this.handleArtifactChange}>
                    {this.props.fleet.artifacts.map( a => {
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