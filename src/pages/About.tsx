import style from './Pages.module.scss';

function About() {
    return (
        <div>
            <div className={style.section}>
                <h1>About</h1>
                <p>
                    The Hollywood Director-Crew Networks website was built by <a href="https://www.ianmacdonald.me/">Ian MacDonald</a>, a junior studying Computer Science and Film & Media Studies at <a href="https://www.wm.edu/">William & Mary</a>. The network model was created by <a href="https://alexandernwala.com/">Dr. Alexander C. Nwala</a>, assistant professor of Data Science at William & Mary, based on a research interest and idea of <a href="https://www.wm.edu/as/english/facultystaff/knight_a.php">Dr. Arthur Knight</a>, Associate Professor, American Studies and English at William & Mary.
                </p>
                <p>
                    This project was initially developed as a <a href="https://github.com/anwala/teaching-network-science/tree/main/spring-2023/homework/hw5-group">group project</a> in an <a href="https://github.com/anwala/teaching-network-science/blob/main/spring-2023/README.md">undergraduate Network Science course</a> taught by Dr. Alexander Nwala.
                </p>
                <p>
                    We thank the William & Mary Office of the Provost for funding this project through the 2023 Faculty Summer Research Grant Award.
                </p>
            </div>
        </div>
    );
}

export default About;
