import React from 'react';
import styles from './Container.module.css';

export default function Container({container, children, customClass}) {
    return (
        <div className={`${styles.container} ${styles[customClass]}`}>{children}</div>
    )
}