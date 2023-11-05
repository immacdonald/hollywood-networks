import React, { useEffect } from 'react';

import Graph from 'graphology';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import {
    SigmaContainer,
    ControlsContainer,
    ZoomControl,
    FullScreenControl,
    SearchControl,
    useRegisterEvents
} from '@react-sigma/core';
import jsonGraph from '../static/director_crew_network.json';
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

interface LegendKey<T> {
    [Key: string]: T;
}

interface LegendData {
    color: string;
    count: number;
    label: string;
    key?: string;
}

const legendKey: LegendKey<string> = {
    M: 'Male',
    F: 'Female',
    A: 'Asian',
    B: 'Black',
    I: 'Indigenous',
    L: 'Latin American',
    W: 'White',
    H: 'Highest Grossing',
    Q: 'LGBTQ+'
};

const NetworkGraph: React.FC<unknown> = () => {
    const graphData: GraphData = jsonGraph as unknown as GraphData;

    const graphLegend: Map<string, LegendData> = new Map<string, LegendData>();

    // Scale each node to have the size of cust_size attribute within a normalized range
    graphData.nodes.forEach((node, index) => {
        graphData.nodes[index].attributes.size = Math.max(node.attributes[2] / 100, 1);
        graphData.nodes[index].attributes.label = node.attributes[1] + ' (' + node.attributes[0] + ')';

        const identity: string = String(node.attributes[0]);

        if (!graphLegend.get(identity)) {
            let result = 'Film Crew';
            if (identity != 'Crew') {
                result = '';
                identity.split('').forEach((letter) => {
                    result += legendKey[letter] + ' ';
                });
            }
            graphLegend.set(identity, { color: node.attributes.color, count: 1, label: result.trim() });
        } else {
            const existing: LegendData | undefined = graphLegend.get(identity);
            if (existing) {
                existing.count++;
                graphLegend.set(identity, existing);
            }
        }
    });

    // Convert the dictionary of LegendData to an array to be mapped
    const legendList: LegendData[] = [];

    graphLegend.forEach((value: LegendData, key: string) => {
        legendList.push({ key, ...value });
    });

    // Sort by count
    legendList.sort((a, b) => b.count - a.count);

    // For colored edges
    /*const opacityHex = "02";
    graphData.edges.forEach((edge, index) => {
        graphData.edges[index].attributes.size = edge.attributes.weight * 10;
        graphData.edges[index].attributes.color = `${graphData.edges[index].attributes.color.substring(0, 7)}80`;
        if (index == 0) {
            console.log(graphData.edges[index].attributes.color);
        }
    });*/

    // Size each edge based on the weight and update the edge color to be translucent
    graphData.edges.forEach((edge, index) => {
        graphData.edges[index].attributes.size = edge.attributes.weight * 25;
        graphData.edges[index].attributes.color = 'rgba(0, 0, 0, 0.008)';
    });

    const graph = Graph.from(graphData as unknown as AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes>);

    const nodeClicked: React.FC = (graphNode: any) => {
        const imdbURL: string = `https://www.imdb.com/name/${graphNode}/`;
        window.open(imdbURL, '_blank');
        return null;
    };

    const GraphEvents: React.FC = () => {
        const registerEvents = useRegisterEvents();

        useEffect(() => {
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
                    <GraphDefault graph={graph} />
                    <ControlsContainer
                        position={'bottom-right'}
                        style={{ position: 'absolute', bottom: '32px', left: '16px' }}
                    >
                        <ZoomControl />
                        <FullScreenControl />
                    </ControlsContainer>
                    <ControlsContainer
                        position={'top-left'}
                        style={{ position: 'absolute', bottom: '8px', left: '16px' }}
                    >
                        <SearchControl style={{ width: '200px' }} />
                    </ControlsContainer>

                    <GraphEvents />
                </SigmaContainer>
            </div>
            <div className={style.legend}>
                <div>
                    <strong>Director Legend</strong>
                </div>
                <div className={style.legendList}>
                    {legendList.map((legend) => {
                        return legend.key == 'Crew' ? (
                            false
                        ) : (
                            <div className={style.legendKey} key={legend.key}>
                                <span style={{ backgroundColor: legend.color }}></span>
                                {legend.label} (<strong>{legend.key}</strong>){' '}
                                <span className={style.legendSmall}>{legend.count}</span>
                            </div>
                        );
                    })}
                    <div>
                        <strong>Crew Legend</strong>
                    </div>
                    <div className={style.legendList}>
                        {legendList.length > 0 && (
                            <div className={style.legendKey} key={legendList[0].key}>
                                <span style={{ backgroundColor: legendList[0].color }}></span>
                                {legendList[0].label} (<strong>{legendList[0].key}</strong>){' '}
                                <span className={style.legendSmall}>{legendList[0].count}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkGraph;
