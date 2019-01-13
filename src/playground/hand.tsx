import React from "react";
import { Amount } from "./amount";

export class Hand extends React.Component<{
    amount: number
},{
    visible: boolean
}> {

    constructor(props: { amount: number }) {
        super(props);
        this.state = {
            visible: false
        };
        this.updatePosition = this.updatePosition.bind(this);
    }

    div: HTMLDivElement | null = null;
    render() {
        return (
            <div
                ref={e => this.div = e}
                style={{
                    width: "50px",
                    position: "fixed",
                }}
            >
                {this.props.amount > 0 && this.state.visible && <Amount value={this.props.amount} />}
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.updatePosition)
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.updatePosition)
    }

    updatePosition(ev: MouseEvent) {
        if (!this.div) return;
        this.div.style.left = ev.pageX + 5 + 'px';
        this.div.style.top = ev.pageY + 5 + 'px';
        this.setState({
            visible: true
        })
    }
}