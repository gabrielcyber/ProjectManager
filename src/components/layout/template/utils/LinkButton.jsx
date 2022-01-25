import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css'

function LinkButton({to, value, customClass}) {
    return (
        <Link to={to} className={styles.btn}>
            {value}
        </Link>
    )
}

export default LinkButton;