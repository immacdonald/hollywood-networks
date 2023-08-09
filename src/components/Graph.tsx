import React, { FC } from "react";

import {Sigma, LoadJSON} from 'react-sigma'

const SigmaGraph: FC = () => {
    // Create the graph
    return (
        <Sigma style={{width:"100%", height:"600px", backgroundColor: "grey"}}>
            <LoadJSON path="../public/data.json" />
        </Sigma>
    );
};

export default SigmaGraph;