import styles from "./App.module.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Sidebar from "./components/Sidebar/Sidebar";
import { Projects } from "./components/Projects/Projects";
import { Experience } from "./components/Experience/Experience";
import { Contact } from "./components/Contact/Contact";

function App() {


  return (
    <>
      <div className={styles.App} >
       <Navbar/>
       <Sidebar/>
        <Hero />
        <About />
        <Experience/>
        {/*<Projects/> */}
        <Contact/>
        
    
      </div>
    </>
  )
}

export default App
