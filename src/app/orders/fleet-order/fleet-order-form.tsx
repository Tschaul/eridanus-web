import React, { ChangeEvent } from "react";
import { IOrder, ITransferShipsOrder, IDropMetalOrder, ILoadMetalOrder, IMoveFleetOrder, IHookArtifactOrder, IUnhookArtifactOrder } from "../../../lib/model/orders/order";
import { FleetTransferOrderForm } from "./transfer-order-form";
import { IUniverse, findWorldOfFleet, findFleetForArtifact, findFleet } from "../../../lib/model/universe";
import autobind from "autobind-decorator";
import { DropMetalOrderForm } from "./drop-metal-order-form";
import { LoadMetalOrderForm } from "./load-metal-order-form";
import { MoveFleetOrderForm } from "./move-fleet-order-form";
import { IWorld } from "../../../lib/model/world";
import { HookArtifactOrderForm } from "./hook-artifact-order-form";
import { IFleet } from "../../../lib/model/fleet";
import { UnhookArtifactOrderForm } from "./unhook-artifact-order-form";

export class FleetOrderForm extends React.Component<{
  order: IOrder,
  onChange: (order: IOrder) => void,
  universe: IUniverse
}> {
  render() {

    const fleetKey = this.getSourceKey();
    const fleet = findFleet(this.props.universe, fleetKey);
    const hasNoArtifacts = !fleet.artifacts.length;
    const world = findWorldOfFleet(this.props.universe, fleetKey);
    const worldHasNoArtifacts = !world.artifacts.length;

    return (
      <div>
        Order for F{fleetKey}:<br />
        <select value={this.props.order.type} onChange={this.handleOrderTypeChange}>
          <option value="TRANSFER_SHIPS">Transfer ships</option>
          <option value="LOAD_METAL">Load metal</option>
          <option value="DROP_METAL">Drop metal</option>
          <option value="MOVE_FLEET">Move</option>
          <option value="HOOK_ARTIFACT" disabled={worldHasNoArtifacts}>Hook artifact</option>
          <option value="UNHOOK_ARTIFACT" disabled={hasNoArtifacts}>Unhooh artifact</option>
        </select><br />
        {this.renderOrderForm(fleet, world)}
      </div>
    )
  }

  renderOrderForm(fleet: IFleet, world: IWorld): React.ReactNode {
    const order = this.props.order;
    switch (order.type) {
      case 'TRANSFER_SHIPS':
        return (
          <FleetTransferOrderForm
            order={this.props.order as ITransferShipsOrder}
            onChange={this.props.onChange}
            universe={this.props.universe}
          />
        )
      case 'DROP_METAL':
        return (
          <DropMetalOrderForm
            order={this.props.order as IDropMetalOrder}
            onChange={this.props.onChange}
          />
        )
      case 'LOAD_METAL':
        return (
          <LoadMetalOrderForm
            order={this.props.order as ILoadMetalOrder}
            onChange={this.props.onChange}
          />
        )
      case 'MOVE_FLEET':
        return (
          <MoveFleetOrderForm
            order={this.props.order as IMoveFleetOrder}
            onChange={this.props.onChange}
            universe={this.props.universe}
          />
        )
      case 'HOOK_ARTIFACT':
        return (
          <HookArtifactOrderForm
            world={world}
            order={this.props.order as IHookArtifactOrder}
            onChange={this.props.onChange}
          />
        )
      case 'UNHOOK_ARTIFACT':
        return (
          <UnhookArtifactOrderForm
            fleet={fleet}
            order={this.props.order as IUnhookArtifactOrder}
            onChange={this.props.onChange}
          />
        )
    }
  }

  @autobind
  public handleOrderTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value as IOrder['type']
    switch (type) {
      case 'TRANSFER_SHIPS':
        this.props.onChange({
          type: 'TRANSFER_SHIPS',
          sourceType: 'FLEET',
          amount: 0,
          targetType: 'I_SHIPS',
          sourceKey: this.getSourceKey()
        })
        break;
      case 'DROP_METAL':
        this.props.onChange({
          type: 'DROP_METAL',
          amountType: 'ALL',
          sourceKey: this.getSourceKey()
        })
        break;
      case 'LOAD_METAL':
        this.props.onChange({
          type: 'LOAD_METAL',
          amountType: 'ALL',
          sourceKey: this.getSourceKey()
        })
        break;
      case 'MOVE_FLEET':
        const sourceKey = this.getSourceKey();
        const world = findWorldOfFleet(this.props.universe, sourceKey);
        this.props.onChange({
          type: 'MOVE_FLEET',
          fleetKey: sourceKey,
          waypointKeys: [],
          destinationKey: world.neighbors[0]
        })
        break;
      case 'HOOK_ARTIFACT':
        const fleetKey = this.getSourceKey();
        const world2 = findWorldOfFleet(this.props.universe, fleetKey);
        this.props.onChange({
          type: 'HOOK_ARTIFACT',
          fleetKey: fleetKey,
          artifactKey: world2.artifacts[0].key
        })
        break;
      case 'UNHOOK_ARTIFACT':
        const fleetKey2 = this.getSourceKey();
        const fleet2 = findFleet(this.props.universe, fleetKey2);
        this.props.onChange({
          type: 'UNHOOK_ARTIFACT',
          artifactKey: fleet2.artifacts[0].key
        })
        break;
    }
  }

  private getSourceKey(): number {
    const order = this.props.order;
    switch (order.type) {
      case 'TRANSFER_SHIPS':
      case 'DROP_METAL':
      case 'LOAD_METAL':
        return order.sourceKey;
      case 'MOVE_FLEET':
      case 'HOOK_ARTIFACT':
        return order.fleetKey;
      case 'UNHOOK_ARTIFACT':
        const fleet = findFleetForArtifact(this.props.universe, order.artifactKey);
        return fleet.key;
    }
  }
}