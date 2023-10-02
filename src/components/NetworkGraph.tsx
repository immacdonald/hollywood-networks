import React, { useEffect } from 'react';

import Graph from 'graphology';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl, SearchControl, useRegisterEvents } from '@react-sigma/core';
import jsonGraph from '../static/network_revised.json';
import style from './NetworkGraph.module.scss';
import AbstractGraph from 'graphology';

type NodeAttributes = {
    [index: number]: number;
    size: number;
    label: string;
};

type EdgeAttributes = {
    [index: number]: number;
    size: number;
    weight: number;
    color: string;
};

type GraphAttributes = {
    name?: string;
};

interface Node {
    id: string;
    attributes: NodeAttributes;
}

interface Edge {
    source: string;
    target: string;
    attributes: EdgeAttributes;
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

const NetworkGraph: React.FC<unknown> = () => {
    const graphData: GraphData = jsonGraph as unknown as GraphData;

    // Scale each node to have the size of cust_size attribute within a normalized range
    graphData.nodes.forEach((node, index) => {
        graphData.nodes[index].attributes.size = Math.max(node.attributes[2] / 50, 1);
    });

    // Size each edge based on the weight and update the edge color to be translucent
    graphData.edges.forEach((edge, index) => {
        graphData.edges[index].attributes.size = edge.attributes.weight * 25;
        graphData.edges[index].attributes.color = 'rgba(0, 0, 0, 0.008)';
    });

    const graph = Graph.from(graphData as unknown as AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>);

    const nodeClicked: React.FC = (graphNode : unknown) => {
        const imdbURL : string = `https://www.imdb.com/name/${graphNode}/`
        window.open(imdbURL, '_blank');
        return null;
    }

    const GraphEvents: React.FC = () => {
        const registerEvents = useRegisterEvents();
    
        useEffect(() => {
          // Register the events
          registerEvents({
            // node events
            clickNode: (event) => nodeClicked(event.node),
            /*doubleClickNode: (event) => console.log("doubleClickNode", event.event, event.node, event.preventSigmaDefault),
            rightClickNode: (event) => console.log("rightClickNode", event.event, event.node, event.preventSigmaDefault),
            wheelNode: (event) => console.log("wheelNode", event.event, event.node, event.preventSigmaDefault),
            downNode: (event) => console.log("downNode", event.event, event.node, event.preventSigmaDefault),
            enterNode: (event) => console.log("enterNode", event.node),
            leaveNode: (event) => console.log("leaveNode", event.node),
            // edge events
            clickEdge: (event) => console.log("clickEdge", event.event, event.edge, event.preventSigmaDefault),
            doubleClickEdge: (event) => console.log("doubleClickEdge", event.event, event.edge, event.preventSigmaDefault),
            rightClickEdge: (event) => console.log("rightClickEdge", event.event, event.edge, event.preventSigmaDefault),
            wheelEdge: (event) => console.log("wheelEdge", event.event, event.edge, event.preventSigmaDefault),
            downEdge: (event) => console.log("downEdge", event.event, event.edge, event.preventSigmaDefault),
            enterEdge: (event) => console.log("enterEdge", event.edge),
            leaveEdge: (event) => console.log("leaveEdge", event.edge),
            // stage events
            clickStage: (event) => console.log("clickStage", event.event, event.preventSigmaDefault),
            doubleClickStage: (event) => console.log("doubleClickStage", event.event, event.preventSigmaDefault),
            rightClickStage: (event) => console.log("rightClickStage", event.event, event.preventSigmaDefault),
            wheelStage: (event) => console.log("wheelStage", event.event, event.preventSigmaDefault),
            downStage: (event) => console.log("downStage", event.event, event.preventSigmaDefault),
            // default mouse events
            click: (event) => console.log("click", event.x, event.y),
            doubleClick: (event) => console.log("doubleClick", event.x, event.y),
            wheel: (event) => console.log("wheel", event.x, event.y, event.delta),
            rightClick: (event) => console.log("rightClick", event.x, event.y),
            mouseup: (event) => console.log("mouseup", event.x, event.y),
            mousedown: (event) => console.log("mousedown", event.x, event.y),
            mousemove: (event) => console.log("mousemove", event.x, event.y),
            // default touch events
            touchup: (event) => console.log("touchup", event.touches),
            touchdown: (event) => console.log("touchdown", event.touches),
            touchmove: (event) => console.log("touchmove", event.touches),
            // sigma kill
            kill: () => console.log("kill"),
            resize: () => console.log("resize"),
            beforeRender: () => console.log("beforeRender"),
            afterRender: () => console.log("afterRender"),
            // sigma camera update
            updated: (event) => console.log("updated", event.x, event.y, event.angle, event.ratio),*/
          });
        }, [registerEvents]);
    
        return null;
    };

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
                    labelFont: 'Lato, sans-serif',
                    zIndex: true
                }}
            >
                <ControlsContainer
                    position={'bottom-right'}
                    style={{ position: 'absolute', bottom: '32px', left: '16px' }}
                >
                    <ZoomControl />
                    <FullScreenControl />
                </ControlsContainer>
                <ControlsContainer
                    position={"top-left"}
                    style={{ position: 'absolute', bottom: '8px', left: '16px' }}
                >
                    <SearchControl style={{ width: "200px" }} />
                </ControlsContainer>

                <GraphEvents />
            </SigmaContainer>
        </div>
    );
};

export default NetworkGraph;
