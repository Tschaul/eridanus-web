import React from "react";

export class Amount extends React.Component<{
    value: number;
}> {
    render() {
        const { value } = this.props;

        const hundreds = Math.floor((value % 1000) / 100);
        const tens = Math.floor((value % 100) / 10);
        const ones = Math.floor((value % 10));

        // const displayString = "C".repeat(hundreds) + "X".repeat(tens) + "I".repeat(ones);
        const displayString = "◁".repeat(value);

        const width = Math.round(200/value)+"px"

        const displaySpans = displayString.split("").map((c,i) => {
            return (
                <div key={i} style={{width}}>{c}</div>
            )
        })

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    cursor: "pointer"
                }}
            ><span>◁</span><span>{value}</span></div>
        );
    }
}