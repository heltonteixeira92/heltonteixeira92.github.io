import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);


  return (
    <nav className={styles.navbar} id="home">
        <a className={styles.title}>
            Portfolio
        </a>
        <div className={styles.menu}>
            <img className={styles.menuBtn} 
            src={menuOpen 
                ? getImageUrl("nav/closeIcon.png")
                : getImageUrl("nav/menuIcon.png")} 
            alt="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            />
            <Sidebar menuOpen={menuOpen}/>
        </div>
    </nav>
  )
}

export default Navbar