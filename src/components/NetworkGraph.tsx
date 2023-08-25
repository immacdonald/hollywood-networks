import React from "react";

import Graph from "graphology";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl } from "@react-sigma/core";
import jsonGraph from "../static/network_revised.json";
import style from './NetworkGraph.module.scss';
import AbstractGraph from "graphology";

type NodeAttributes = {
    [index: number]: number;
    size: number;
    label: string;
}

type EdgeAttributes = {
    [index: number]: number;
    size: number;
    weight: number;
    color: string;
}

type GraphAttributes = {
    name?: string;
}

interface Node {
    id: string;
    attributes: NodeAttributes;
}

interface Edge {
    source: string;
    target: string;
    attributes: EdgeAttributes
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

const NetworkGraph: React.FC<unknown> = () => {
    const graphData : GraphData = jsonGraph as GraphData;
    
    // Scale each node to have the size of cust_size attribute within a normalized range
    graphData.nodes.forEach((node, index) => {
        graphData.nodes[index].attributes.size = Math.max(node.attributes[2] / 100, 1);
    });

    // Size each edge based on the weight and update the edge color to be translucent
    graphData.edges.forEach((edge, index) => {
        graphData.edges[index].attributes.size = edge.attributes.weight;
        graphData.edges[index].attributes.color = "rgba(10, 10, 10, 0.05)"
    });

    const graph = Graph.from(graphData as unknown as AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>);

    return (
        <div className={style.graph}>
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

export default NetworkGraph;