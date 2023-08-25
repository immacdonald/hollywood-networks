import NetworkGraph from '../components/NetworkGraph';

function Home() {
    return (
        <div>
            <h1>Hollywood Director & Crew Networks</h1>
            <p>
                This is an exploration of how directors in Hollywood use similar crew members throughout multiple
                productions.
            </p>
            <br />
            <NetworkGraph />
        </div>
    );
}

export default Home;
