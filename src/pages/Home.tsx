import NetworkGraph from '../components/NetworkGraph';
import Latex from 'react-latex-next';

function Home() {
    return (
        <div>
            <h1>Hollywood Director-Crew Networks</h1>
            <h3 style={{marginTop: "0px", fontWeight: 500}}>An exploration of the collaboration network of Hollywood directors.</h3>
            <p>
                The orange nodes represent crew members and rest represent Hollywood directors. Edges connect individuals who have worked on at least a single movie. The network consists of <em>25,023</em> nodes and <em>55,910</em> edges. The sizes of the director nodes correspond to their respective <strong>Average Role Homogeneity</strong> (<Latex>$ARH$</Latex>) values (see below).
            </p>
            <NetworkGraph />
            <p>
                Some renowned film directors are known to work persistently with the same key collaborators. For example, <a href="https://en.wikipedia.org/wiki/Wes_Anderson">Wes Anderson</a> employed the same movie score composer, <a href="https://en.wikipedia.org/wiki/Alexandre_Desplat">Alexandre Desplat</a> for multiple movies, including <a href="https://www.imdb.com/title/tt8847712/?ref_=nm_flmg_c_10_com">The French Dispatch</a>, <a href="https://www.imdb.com/title/tt5104604/?ref_=ttfc_fc_tt">Isle of Dogs</a>, and <a href="https://www.imdb.com/title/tt2278388/?ref_=ttfc_fc_tt">The Grand Budapest Hotel</a>.
            </p>
            <p>
                Shifting ground to questions of access and representation: Some directors hire collaborators from groups that were historically prevented from working in the mainstream U.S. film industry, such as African Americans and women. Among the reasons given by such directors is that this opens opportunities and diversifies the U.S. film industry creative labor pool, and thus expands the perspectives represented in and benefiting from U.S. movies and TV.
            </p>
            <p>
                The network above explores these phenomena for 101 <a href="https://github.com/anwala/teaching-network-science/blob/main/spring-2023/homework/hw5-group/group-project-topic-01/100_film_directors.csv">Hollywood directors</a>.
            </p>
            <h3>Director Average Role Homogeneity (ARH)</h3>
            <p>
                A director's <strong>Role Homogeneity</strong> (<Latex>$RH$</Latex>) value quantifies the variety of individuals they employed for a specific role.
            </p>
            <p>
                <Latex>{"$$RH = 1 - \\begingroup \\text{Total unique individuals employed} \\over {\\text{Total number of role opportunities.}} \\endgroup$$"}</Latex>
            </p>
            <p>
                <Latex>{"$RH$ is defined as $1$ if the numerator, $\\text{Total unique individuals employed} = 1$. "}</Latex>
                <Latex>{"It is undefined if the denominator, $\\text{Total number of role opportunities} = 0$. "}</Latex>
                <Latex>$RH$ ranges between $0$ and $1$, where $0$ means the director employed different people for all slots of the role opportunities. </Latex>
                <Latex>An $RH$ value of $1$ means that the director employed the same person exclusively for all slots of the role opportunity.</Latex>
            </p>
            <p>
                Let us consider some simple examples:
                <ol style={{marginLeft: "24px"}}>
                    <li><Latex>If out of $10$ Film Editor role opportunities, Director Jane employed $10$ unique Film Editors, Director Jane's Film Editor role homogeneity $RH = 1 - (10/10) = 0$</Latex></li>
                    <li><Latex>If out of $10$ Film Editor role opportunities, Director Obi employed $8$ unique Film Editors, Director Obi's Film Editor role homogeneity $RH = 1 - (8/10) = 0.2$</Latex></li>
                    <li><Latex>If out of $10$ Film Editor role opportunities, Director Kim employed $5$ unique Film Editors, Director Kim's Film Editor role homogeneity $RH = 1 - (5/10) = 0.5$</Latex></li>
                    <li><Latex>If out of $10$ Film Editor role opportunities, Director John employed $1$ unique Film Editors, Director John's Film Editor role homogeneity $RH = 1$</Latex></li>
                </ol>
            </p>
            <p>
                <Latex>As the example illustrates, the fewer the number of unique individuals a director employs for a given role, the larger the director's $RH$ value. In other words, directors that repeatedly employ the same individuals for a given role, will have larger RH values for that role.</Latex>
            </p>
            <p>
                A director's <strong>Average Role Homogeneity</strong> <Latex>($ARH$) summarizes the director's $RH$ value across (or irrespective) all roles.</Latex>
            </p>
            <p><Latex>Here is a ranked list of the Directors sorted by their respective $ARH$ values.</Latex></p>
        </div>
    );
}

export default Home;
