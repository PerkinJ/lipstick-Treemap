import * as React from "react";
import Treemap from './Treemap';
const lipstick = require('../mock/lipstick.json')
export interface LipstickProps { title?: string;}

export class Lipstick extends React.Component<LipstickProps, {}> {
    render() {
        return <div style={{margin:'30px auto',width:'980px'}}>
            <h1 style={{textAlign:'center',color:'#fff'}}>{this.props.title}</h1>
            <div style={{height:'600px',boxShadow:' 0px 0px 25px 10px #EF94AD'}}>
                <Treemap
                    width={980}
                    height={600}
                    value="value"
                    data={lipstick}
                />
            </div>
        </div>;
    }
}