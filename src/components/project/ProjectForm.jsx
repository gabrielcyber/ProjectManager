import { useState, useEffect } from 'react';
import Input from '../include/template/form/Input';
import Select from '../include/template/form/Select';
import SubmitButton from '../include/template/form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({btnText}) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Category-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((data) => {
            setCategories(data)})
        .catch((err) => console.log(err))}, []);

    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto:"
                name="name"
                placeholder="Insira o nome do projeto" />
            <Input
                type="number"
                text="Orçamento do projeto:"
                name="budget"
                placeholder="Insira o orçamento total" />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories} />
            <SubmitButton value={btnText}/>
        </form>
    )
}

export default ProjectForm;