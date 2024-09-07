import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils"

export const ProjectCard = ({ 
    project: { title, imageSrc, description, skills, demo, source },
}) => {
    return (
        <div className={styles.container}>
        <img src={getImageUrl(imageSrc)} alt={`Image of ${title}`} className={styles.image}></img>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.descriptions}>{description}</p>
        <ul className={styles.skills}>
            {skills.map((skills, id) => {
                return (
                <li key={id} className={styles.skill}>{skills}</li>
                )
            })}
        </ul>
        <div className={styles.links}>
            <a href={demo} className={styles.link}> Demo </a>
            <a href={source} className={styles.link}> Source </a>
        </div>
    </div>

    )
}