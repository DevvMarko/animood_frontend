import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <section className={styles.mainContent}>
                <Link to="/" className={styles.logo}>
                        <h1>ANIMOOD</h1>
                    </Link>
                    <div className={styles.actionsContainer}>
                        <Link to="/add" className={styles.addButton}>
                            Dodaj anime
                        </Link>
                    </div>
            </section>
            
            <div className={styles.headerLine}></div>
        </header>

    );
}
export default Header;