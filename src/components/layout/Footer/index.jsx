import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <ul className={styles.social_list}>
                    <li><FaFacebook /></li>
                    <li><FaInstagram /></li>
                    <li><FaLinkedin /></li>
                </ul>
            </div>
            <p className={styles.copy_right}>
                <span>Costs</span> &copy; 2024
            </p>
        </footer>
    )
}