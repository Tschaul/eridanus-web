import { IUniverse, findFleetForArtifact } from "../../lib/model/universe";
import { observable, ObservableMap, computed } from 'mobx';
import { IOrder, ITransferShipsOrder } from "../../lib/model/orders/order";
import { IWorld } from "../../lib/model/world";

let uniqueIndex = 1;

export class AppViewModel {

  @observable
  public universe: IUniverse | null = null;

  @observable
  public selectedWorldKey: number | null = null;

  @observable
  public selectedOrderKey: number | null = null;

  @observable
  private orders: ObservableMap<number, IOrder> = new ObservableMap();

  @computed
  public get selectedWorld() {
    if (this.universe) {
      const world = this.universe.worlds
        .find(w => w.key === this.selectedWorldKey);
      if (world) {
        return world;
      }
    }
    return null;
  }

  @computed
  public get selectedOrder(): IOrder | null {
    if (this.selectedOrderKey) {
      return this.orders.get(this.selectedOrderKey) as IOrder;
    }
    return null;
  }

  @computed
  public get allOrders(): IOrder[] {
    return Array.from(this.orders.values());
  }

  @computed
  public get ordersByFleet() {
    let map = new Map<number, Array<IOrder & { orderKey: number }>>();
    this.orders.forEach((order, orderKey) => {
      switch (order.type) {
        case 'DROP_METAL':
        case 'LOAD_METAL':
          const loadKey = order.sourceKey;
          const loadEntry = {
            ...order,
            orderKey
          }
          map.set(loadKey, [loadEntry, ...map.get(loadKey) || []]);
          break;
        case 'TRANSFER_SHIPS':
          if (order.sourceType === 'FLEET') {
            const transferKey = order.sourceKey;
            const transferEntry = {
              ...order,
              orderKey
            }
            map.set(transferKey, [transferEntry, ...map.get(transferKey) || []]);
          }
          break;
        case 'MOVE_FLEET':
          const moveKey = order.fleetKey;
          const moveEntry = {
            ...order,
            orderKey
          }
          map.set(moveKey, [moveEntry, ...map.get(moveKey) || []]);
          break;
        case 'HOOK_ARTIFACT':
          const hookKey = order.fleetKey;
          const hookEntry = {
            ...order,
            orderKey
          }
          map.set(hookKey, [hookEntry, ...map.get(hookKey) || []]);
          break;
        case 'UNHOOK_ARTIFACT':
          if(this.universe) {
            const unhookKey = findFleetForArtifact(this.universe, order.artifactKey).key;
            const unhookEntry = {
              ...order,
              orderKey
            }
            map.set(unhookKey, [unhookEntry, ...map.get(unhookKey) || []]);
          }
          break;
      }
    })
    return map;
  }

  public newFleetOrder(fleetKey: number) {
    const key = uniqueIndex++;
    const newOrder: ITransferShipsOrder = {
      type: 'TRANSFER_SHIPS',
      sourceType: 'FLEET',
      sourceKey: fleetKey,
      targetType: 'I_SHIPS',
      amount: 0
    }
    this.orders.set(key, newOrder);
    this.selectedOrderKey = key;
  }

  public updateOrder(orderKey: number, order: IOrder) {
    this.orders.set(orderKey, order);
  }

  public removeOrder(orderKey: number) {
    this.orders.delete(orderKey);
  }

}