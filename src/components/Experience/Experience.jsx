import styles from "./Experience.module.css";
import skills from "../../data/skills.json"
import histories from "../../data/history.json"

import { getImageUrl } from "../../utils"

export const Experience = () => {
    return (
        <section className={styles.container}  id="experience">
            <h2 className={styles.title}>Experience</h2>
            <div className={styles.content}>
                <div className={styles.skills}>
                    {
                        skills.map((skill, id) => {
                        return (
                        <div key={id} className={styles.skill}>
                            <div className={styles.skillImageContainer}>
                                <img src={getImageUrl(skill.imageSrc)} alt={skill.title}/>
                            </div>
                            <p>{skill.title}</p>
                        </div>)})
                    }
                </div>
                <ul className={styles.history}>
                    {
                        histories.map((history, id) => {
                            return (
                            <li key={id} className={styles.historyItem}> 
                            <img 
                            src={getImageUrl(history.imageSrc)} alt={history.company}/>
                                <div className={styles.historyItemDetails}>
                                    <h3> {`${history.role}, ${history.company}`} </h3>
                                    <p>{`${history.startDate}, ${history.endDate}`}</p>
                                    <ul> {history.experiences.map((exp, id) => <li key={id}> {exp} </li>) } </ul>
                                </div>
                            </li>
                            )}
                        )
                    }
                </ul>
            </div>
        </section>
    )
}