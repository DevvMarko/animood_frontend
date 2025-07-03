import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
    return (
        <>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <h1>ANIMOOD</h1>
                </Link>
                <div className={styles.actionsContainer}>
                    <Link to="/add" className={styles.addButton}>
                        Dodaj anime
                    </Link>
                </div>
                
            </header>
            <div className={styles.headerLine}></div>
        </>
    );
    }
export default Header;