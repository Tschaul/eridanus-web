import React, { ChangeEvent } from "react";
import { IDropMetalOrder } from "../../../lib/model/orders/order";
import autobind from "autobind-decorator";

export class DropMetalOrderForm extends React.Component<{
    order: IDropMetalOrder,
    onChange: (o: IDropMetalOrder) => void
}> {
    render() {
        return (
            <div>
                Target<br />
                <select value={this.props.order.amountType} onChange={this.handleAmountTypeChange}>
                    <option value="ALL">All</option>
                    <option value="AMOUNT">Quantity</option>
                </select><br />
                {this.props.order.amountType === 'AMOUNT' &&
                    <div>
                        Amount<br />
                        <input type="number" onChange={this.handleAmountChange}></input>
                    </div>
                }
            </div>
        )
    }

    @autobind
    handleAmountTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        this.props.onChange({
            ...this.props.order,
            amountType: event.target.value as any,
            amount: 0
        })
    }

    @autobind
    handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange({
            ...this.props.order,
            amountType: 'AMOUNT',
            amount: parseInt(event.target.value)
        })
    }
}