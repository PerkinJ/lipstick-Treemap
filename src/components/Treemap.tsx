import * as React from "react";
import * as ReactDOM from "react-dom";
import * as d3 from 'd3';

export interface TreemapProps {
    width?: number;
    height?: number;
    paddingInner?: number;
    value?: string;
    data: any;
}

class Treemap extends React.Component<TreemapProps, {}>{
    constructor(props: any) {
        super(props)
    }
    public static defaultProps: TreemapProps = {
        width: 960,
        height: 600,
        paddingInner: 1,
        value: 'value',
        data:{}
    }
    // 手动加value
    handleData = (data:any) => {
        if(data.hasOwnProperty('children')){
            let data1 = data.children;
            for(let i = 0;i < data1.length;i++){
               if(data1[i].hasOwnProperty('children')){
                   let data2= data1[i].children
                   for(let i = 0;i < data2.length;i++){
                       if(data2[i].hasOwnProperty('children')){
                        let data3 = data2[i].children
                        for(let i =0;i<data3.length;i++){
                            data3[i].value = 300
                        }
                       }
                   }
               }
           }
        }
        return data
    }
    sumBySize = (d: any) => d[this.props.value]
    render() {
        const { data, width, height, paddingInner } = this.props
        let treeData = this.handleData(data)
       
        let fader = function (color: any) { return d3.interpolateRgb(color, "#fff")(0.2) },
            color = d3.scaleOrdinal(d3.schemeCategory10.map(fader)),
            format = d3.format(",d")

        let treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(paddingInner)

        let treemapData: any[]

        if (JSON.stringify(data) !== '{}') {
            let root = d3.hierarchy(treeData)
                .eachBefore(d => d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
                .sum(this.sumBySize)
                .sort((a, b) => b.height - a.height || b.value - a.value)

            treemap(root)

            treemapData = root.leaves()
        }

        return (
            <svg width={width} height={height} style={{ fontSize: 10 }}>
                {treemapData.length > 0 && treemapData.map((d, index) => {
                    return (
                    <g key={index} transform={`translate(${d.x0},${d.y0})`}>
                        <rect
                            id={d.data.id}
                            width={d.x1 - d.x0}
                            height={d.y1 - d.y0}
                            fill={d.data.color} />
                        {/* <clipPath id={`clip-${d.data.id}`}>
                            <use href={`#${d.data.id}`} />
                        </clipPath> */}
                        <text clipPath={`url(#clip-${d.data.id})`}>
                            <tspan x={4} y={12}>{d.data.name.split(/(?=[A-Z][^A-Z])/g)}</tspan>
                        </text>
                        <title>{d.data.id}</title>
                    </g>
                )
                })}
            </svg>
        )
    }

}

export default Treemap