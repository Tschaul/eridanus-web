import React, { Component } from 'react';
import { XmlInput } from './xml-parser/xml-input';
import { IUniverse } from '../lib/model/universe';
import autobind from 'autobind-decorator';
import { NetworkView } from './network/network-view';
import { IWorld } from '../lib/model/world';
import { WorldView } from './world/world';
import { AppViewModel } from './viewmodel/app-viewmodel';

import { observer } from 'mobx-react'
import { FleetOrderForm } from './orders/fleet-order/fleet-order-form';
import { IOrder } from '../lib/model/orders/order';
import { makeOrderString } from '../lib/model/orders/make-order-string';

@observer
class App extends Component<{
  vm: AppViewModel
}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const { universe, selectedWorld, selectedOrder } = this.props.vm;
    return (
      <div>
        <XmlInput onLoad={this.handleLoadUniverse}></XmlInput>
        {universe &&
          <NetworkView
            universe={universe}
            onSelectWorld={this.handleSelectWorld}
            onDeselectWorld={this.handleDeselectWorld}
          ></NetworkView>
        }
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {selectedWorld ?
            <WorldView
              world={selectedWorld}
              ordersByFleet={this.props.vm.ordersByFleet}
              newOrder={this.handleNewOrder}
              selectOrder={this.handleSelectOrder}
            ></WorldView>
          : <div/>}
          {(selectedOrder && universe) ?
            <FleetOrderForm
              onChange={this.handleOrderChange}
              universe={universe}
              order={selectedOrder}
            />
            : <div/>}
            <div>
              <textarea 
                readOnly 
                value={this.props.vm.allOrders.map(makeOrderString).join('\n')}
                cols={20}
                rows={10}
              ></textarea>
            </div>
        </div>
      </div>
    );
  }

  @autobind
  handleLoadUniverse(universe: IUniverse) {
    this.props.vm.universe = universe;
  }

  @autobind
  handleSelectWorld(k: number) {
    this.props.vm.selectedWorldKey = k;
  }

  @autobind
  handleNewOrder(k: number) {
    this.props.vm.newFleetOrder(k)
  }

  @autobind
  handleSelectOrder(k: number) {
    this.props.vm.selectedOrderKey = k;
  }

  @autobind
  handleDeselectWorld() {
    this.setState({
      selectedWorld: null
    })
  }

  @autobind
  handleOrderChange(order: IOrder) {
    if (this.props.vm.selectedOrderKey) {
      this.props.vm.updateOrder(this.props.vm.selectedOrderKey, order);
    }
  }
}

export default App;
