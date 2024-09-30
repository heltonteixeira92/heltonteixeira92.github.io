import React, { useState } from 'react'

import styles from "./Sidebar.module.css"

const Sidebar = (props) => {

    const fa2x = `${styles.fa2x}`;
    const faUser = 'fa fa-user';
    const faEnvelope = 'fa fa-envelope';
    const faBriefcase = 'fa fa-briefcase';
    const faHome = 'fa fa-home';

    return (
        <nav className={`${styles.navbar} ${props.menuOpen && styles.openSidebar}`}>
            <ul>
                <li>
                    <a href="#home">
                        <span className={styles.iconSpan}>
                            <i className={`${faHome} ${fa2x}`}></i>
                        </span>
                        <span className={styles.title}>
                            Home
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#about">
                        <span className={styles.iconSpan}>
                            <i className={`${faUser} ${fa2x}`}></i>
                        </span>
                        <span className={styles.title}>
                            About
                        </span>
                    </a>
                </li>

                <li>
                    <a href="#experience">
                        <span className={styles.iconSpan}>
                            <i className={`${faBriefcase} ${fa2x}`}></i>
                        </span>
                        <span className={styles.title}>
                            Experiences
                        </span>
                    </a>
                </li>

                <li>
                    <a href="#contacts">
                        <span className={styles.iconSpan}>
                            <i className={`${faEnvelope} ${fa2x}`}></i>
                        </span>
                        <span className={styles.title}>
                            Contact
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )

}

export default Sidebar