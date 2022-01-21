import styles from './SubmitButton.module.css';

function SubmitButton({value}) {
    return (
        <div className={styles.btn_container}>
            <button className={styles.btn}>{value}</button>
        </div>
    )
}

export default SubmitButton;