import React, { useEffect, useState } from 'react';

import Graph from 'graphology';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl, SearchControl, useRegisterEvents, useSetSettings } from '@react-sigma/core';
import jsonGraph from '../static/network_revised.json';
import style from './NetworkGraph.module.scss';
import AbstractGraph from 'graphology';
import { GraphDefault } from './DefaultGraph';

type NodeAttributes = {
    [index: number]: number;
    size: number;
    label: string;
    color: string;
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

    const graphLegend: Map<string, { color: string, count : number }> = new Map<string, { color: string, count : number }>;

    // Scale each node to have the size of cust_size attribute within a normalized range
    graphData.nodes.forEach((node, index) => {
        graphData.nodes[index].attributes.size = Math.max(node.attributes[2] / 50, 1);
        graphData.nodes[index].attributes.label = node.attributes[1] + " (" + node.attributes[0] + ")";
        
        const identity : string = String(node.attributes[0]);

        if(!(graphLegend.get(identity))) {
            graphLegend.set(identity, { color: node.attributes.color, count: 1});
        } else {
            const existing : { color : string, count : number } | undefined = graphLegend.get(identity);
            if(existing) {
                existing.count++;
                graphLegend.set(identity, existing);
            }
        }
    });

    const legendList : Array<{ key : string, color : string, count : number }> = [];

    graphLegend.forEach((value : { color : string, count : number}, key : string)=>{
        legendList.push({key, ...value});
      })

    legendList.sort((a, b) => b.count-a.count);
    console.log(legendList);

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
            doubleClickNode: (event) => nodeClicked(event.node)
          });
        }, [registerEvents]);
    
        return null;
    };

    return (
        <div className={style.fullGraph}>        
            <div className={style.graph}>
                <SigmaContainer
                    className={style.sigmaGraph}
                    settings={{
                        nodeProgramClasses: { image: getNodeProgramImage() },
                        labelDensity: 0.07,
                        labelGridCellSize: 60,
                        labelRenderedSizeThreshold: 15,
                        labelFont: 'Lato, sans-serif',
                        zIndex: true
                    }}
                >
                    <GraphDefault order={100} probability={0.1} graph={graph}/>
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
            <div className={style.legend}>
                <p><strong>Legend</strong></p>
                {legendList.map((legend) => {
                    return <div className={style.legendKey}>
                        {legend.key.toUpperCase()}
                        <span style={{ backgroundColor : legend.color}}></span>
                    </div>;
                })}
            </div>
        </div>

    );
};

export default NetworkGraph;
