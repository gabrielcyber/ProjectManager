import styles from './Select.module.css';

function Select({name, text, options}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
                <option disabled>Selecione uma opção</option>
            </select>
        </div>
    )
}

export default Select;