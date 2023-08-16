import { FC } from "react";

import {Sigma, LoadJSON} from 'react-sigma'

const SigmaGraph: FC = () => {
    // Create the graph
    return (
        <Sigma style={{width:"100%", height:"600px", backgroundColor: "transparent", border: "1px solid black"}}>
            <LoadJSON path="../data_fixed.json" />
        </Sigma>
    );
};

export default SigmaGraph;