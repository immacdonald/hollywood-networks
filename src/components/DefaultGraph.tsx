import React, { useEffect, useState } from 'react';

import { Attributes } from 'graphology-types';

import { useSigma, useRegisterEvents, useLoadGraph, useSetSettings } from '@react-sigma/core';

export interface GraphDefaultProps {
    /**
     * Number of node to generates
     */
    order: number;
    /**
     * Probability that two nodes are linked
     */
    probability: number;

    graph: any;
}
export const GraphDefault: React.FC<GraphDefaultProps> = ({ order, probability, graph }) => {
    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadGraph = useLoadGraph();
    const setSettings = useSetSettings();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    useEffect(() => {
        loadGraph(graph);

        // Register the events
        registerEvents({
            clickNode: (event) => setHoveredNode(event.node),
            clickStage: () => setHoveredNode(null)
        });
    }, [loadGraph, registerEvents, order, probability]);

    useEffect(() => {
        setSettings({
            nodeReducer: (node, data) => {
                const graph = sigma.getGraph();
                const newData: Attributes = { ...data, highlighted: data.highlighted || false };

                if (hoveredNode) {
                    if (node === hoveredNode || graph.neighbors(hoveredNode).includes(node)) {
                        newData.highlighted = false;
                    } else {
                        newData.color = '#E2E2E2';
                        newData.highlighted = false;
                    }
                }
                return newData;
            },
            edgeReducer: (edge, data) => {
                const graph = sigma.getGraph();
                const newData = { ...data, hidden: false };

                if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
                    newData.hidden = true;
                }
                return newData;
            }
        });
    }, [hoveredNode, setSettings, sigma, graph]);

    return null;
};
