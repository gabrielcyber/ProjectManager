import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src="/assets/img/loading.svg" />
        </div>
    )
}

export default Loading;