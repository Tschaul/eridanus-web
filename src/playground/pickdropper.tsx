import React from "react";
import { Amount } from "./amount";

export enum PickDropperState {
    Picking,
    Dropping,
    ReadOnly
}

export class PickDropper extends React.Component<{
    state: PickDropperState,
    amount: number,
    onPick?: (amount: number) => void,
    onDrop?: () => void,
}> {
    elem: HTMLDivElement | null = null;
    render() {
        const { amount, onPick, onDrop } = this.props;
        return (
            <div
                ref={elem => this.elem = elem}
                onClick={e => this.handeClick(e)}
                style={{
                    width: "100px",
                    border: "1px solid coral"
                }}
            ><Amount value={amount} /></div>
        )
    }

    handeClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {

        if (!this.elem) return;

        const {state, onPick, amount, onDrop} = this.props;

        if(state === PickDropperState.Picking && onPick) {
            const elemRect = this.elem.getBoundingClientRect();
            // console.log(e.clientX-elemRect.left, e.clientY-elemRect.top);
            const ratio = (e.clientX - elemRect.left) / elemRect.width;
            const pickedAmount = Math.round(ratio * amount);
            onPick(pickedAmount);
        } else if(state === PickDropperState.Dropping && onDrop) {
            onDrop();
        }

    }
}