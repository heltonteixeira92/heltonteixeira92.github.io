import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

const Hero = () => {
    return(
        <section className={styles.container}>
            <div className={styles.content} >
                <h1 className={styles.title} >Hi, I'm Helton</h1>
                <p className={styles.description} >I'm a back-end developer, I help companies create scalable and efficient web applications.</p>
                <a href="mailto:heltonteixeiradesouza@hotmail.com" className={styles.contactBtn} >Contact Me</a>
            </div>
            <img src={getImageUrl("hero/Profile.jpeg")} alt="Hero image of me" className={styles.heroImg}/>
            <div className={styles.topBlur}/>
            <div className={styles.bottomBlur}/>
            
        </section>
    )
}

export default Hero;