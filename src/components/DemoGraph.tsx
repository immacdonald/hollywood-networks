import React from "react";

import Graph from "graphology";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl } from "@react-sigma/core";
import jsonGraph from "../static/networktest.json";
import style from './DemoGraph.module.scss';

const DemoGraph: React.FC<{}> = () => {
    const graphData : any = jsonGraph;
    
    graphData['nodes'].forEach((node : any, index : number) => {
        graphData['nodes'][index].attributes.size = Math.max(node.attributes.size, 1) / 5;
    });

    graphData['edges'].forEach((index : number) => {
        graphData['edges'][index].attributes.size = 0.5;
        graphData['edges'][index].attributes.color = "rgba(10, 10, 10, 0.05)"
    });

    const graph = Graph.from(graphData as any);
    return (
        <div style={{backgroundColor: "white"}}>
        <SigmaContainer
            className={style.sigmaGraph}
            graph={graph}
            settings={{
                nodeProgramClasses: { image: getNodeProgramImage() },
                labelDensity: 0.07,
                labelGridCellSize: 60,
                labelRenderedSizeThreshold: 15,
                labelFont: "Lato, sans-serif",
                zIndex: true,
            }}
        >
            <ControlsContainer position={"bottom-right"} style={{position: "absolute", bottom: "16px", left: "16px"}}>
                <ZoomControl />
                <FullScreenControl />
            </ControlsContainer>
            {/*<ControlsContainer position={"top-right"}>
                <SearchControl style={{ width: "200px" }} />
            </ControlsContainer>*/}
        </SigmaContainer>
        </div>
    );
};

export default DemoGraph;