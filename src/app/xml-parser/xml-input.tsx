import React from "react";
import { IUniverse } from "../../lib/model/universe";

import autobind from 'autobind-decorator'
import { parseXml } from "./xml-parser";

export class XmlInput extends React.Component<{
    onLoad: (u: IUniverse) => void
}> {
    input: HTMLInputElement | null = null;
    render() {
        return (
            <input 
                type="file" 
                ref={i => this.input = i as HTMLInputElement} 
                onChange={this.handleFileSelect}
            ></input>
        )
    }

    @autobind
    handleFileSelect() {
        if (this.input && this.input.files) {

            var file = this.input.files[0];
            var reader = new FileReader();
            reader.onload = (e) => { 
                if(e.target) {
                    const xml = (e.target as any)['result'];
                    const universe = parseXml(xml);
                    this.props.onLoad(universe);
                }
            }
            reader.readAsText(file);

            
        }
    }

}