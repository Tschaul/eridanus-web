import React from "react";
import { PickDropper, PickDropperState } from "./pickdropper";
import { Amount } from "./amount";
import { Hand } from "./hand";

export class PickDropperDemo extends React.Component<{},{
    amountInHand: number,
    amountInOne: number,
    amountInTwo: number,
    isPicking: boolean
}> {

    constructor(props: {}) {
        super(props)
        this.state = {
            amountInHand: 0,
            amountInOne: 24,
            amountInTwo: 123,
            isPicking: true,
        }
    }

    render() {

        const {isPicking, amountInTwo, amountInOne, amountInHand} = this.state;

        const pickingState =  isPicking ? PickDropperState.Picking: PickDropperState.Dropping
        return(
            <div>
                <PickDropper 
                    amount={amountInOne} 
                    state={pickingState} 
                    onPick={x => this.handlePickOne(x)}
                    onDrop={() => this.handleDropOne()}
                />
                <PickDropper 
                    amount={amountInTwo} 
                    state={pickingState} 
                    onPick={x => this.handlePickTwo(x)}
                    onDrop={() => this.handleDropTwo()}
                />
                <Hand amount={amountInHand}/>
            </div>
        )
    }

    handlePickOne(amount: number) {
        const { amountInOne, amountInHand} = this.state;
        this.setState({
            amountInHand: amountInHand + amount,
            amountInOne: amountInOne - amount,
            isPicking: false,
        })
    }

    handlePickTwo(amount: number) {
        const {amountInTwo, amountInHand} = this.state;

        this.setState({
            amountInHand: amountInHand + amount,
            amountInTwo: amountInTwo - amount,
            isPicking: false,
        })
    }

    handleDropOne() {
        const { amountInOne, amountInHand} = this.state;
        this.setState({
            amountInHand: 0,
            amountInOne: amountInOne + amountInHand,
            isPicking: true,
        })
    }

    handleDropTwo() {
        const {amountInTwo, amountInHand} = this.state;
        this.setState({
            amountInHand: 0,
            amountInTwo: amountInTwo + amountInHand,
            isPicking: true,
        })
    }
}