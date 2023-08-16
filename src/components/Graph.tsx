import { FC } from "react";

import {Sigma, LoadJSON} from 'react-sigma'

const NetworkGraph: FC = () => {
    // Create the graph

    let baseURL = import.meta.env.BASE_URL;
    if(!baseURL.endsWith("/")) {
        baseURL = baseURL + "/";
    }
    console.log(baseURL)

    return (
        <Sigma style={{width:"100%", height:"600px", backgroundColor: "transparent", border: "1px solid black"}}>
            <LoadJSON path={baseURL + "dataset.json"} />
        </Sigma>
    );
};

export default NetworkGraph;