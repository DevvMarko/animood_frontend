import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header({ref}) {
    return (
        <header className={styles.header} ref={ref}>
            <section className={styles.mainContent}>
                <Link to="/" className={styles.logo}>
                    <h1>ANIMOOD</h1>
                </Link>
                <Link to="/add" className={styles.addButton}>
                    Dodaj anime
                </Link>
            </section>
            
            <div className={styles.headerLine}></div>
        </header>

    );
}
export default Header;