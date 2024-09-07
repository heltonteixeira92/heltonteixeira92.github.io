import { getImageUrl } from "../../utils";
import styles from "./About.module.css"

const About = () => {
    return(
        <section className={styles.container} id="about">
            <h2 className={styles.title}>About</h2>
            <div className={styles.content}>
                <img 
                src={getImageUrl("about/image.png")} 
                alt="A guy working" 
                className={styles.aboutImage}
                />
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
                        <div className={styles.AboutItemText}>
                            <h3>Backend Developer</h3>
                            <p>I'm a backend developer with experience building scalable and optimized backend systems and APIs.</p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img 
                        src={getImageUrl("about/cursorIcon.png")} 
                        alt="Cursor icon" 
                        />
                        <div className={styles.AboutItemText}>
                            <h3>Frontend Developer</h3>
                            <p>Creating repertoire of ReactJS applications, aiming to provide more comprehensive and innovative solutions.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}


export default About;