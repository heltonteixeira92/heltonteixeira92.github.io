import React from 'react'
import styles from "./Contact.module.css";
import { getImageUrl } from '../../utils'

export const Contact = () => {
  return (
    <footer id="contacts" className={styles.container}>
        <div className={styles.text}>
            <h2>
                Contact
            </h2>
            <p>
                Feel free to reach out!
            </p>
        </div>
        <ul className={styles.links}>
            <li className={styles.link}>
                <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon"/>
                <a href="mailto:heltonteixeiradesouza@hotmail.com">heltonteixeiradesouza@hotmail.com</a>
            </li>
            <li className={styles.link}>
                <img src={getImageUrl("contact/linkedinIcon.png")} alt="Linkedin icon"/>
                <a href="https://www.linkedin.com/in/heltonteixeira92/">in/heltonteixeira92</a>
            </li>
            <li className={styles.link}>
                <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon"/>
                <a href="https://github.com/heltonteixeira92">@heltonteixeira92</a>
            </li>
        </ul>
        
        
    </footer>
  )
}
