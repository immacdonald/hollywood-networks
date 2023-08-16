import { FC } from "react";

import {Sigma, LoadJSON} from 'react-sigma'

const NetworkGraph: FC = () => {
    // Create the graph

    return (
        <Sigma style={{width:"100%", height:"600px", backgroundColor: "transparent", border: "1px solid black"}}>
            <LoadJSON path={String(import.meta.env.BASE_URL) + "dataset.json"} />
        </Sigma>
    );
};

export default NetworkGraph;