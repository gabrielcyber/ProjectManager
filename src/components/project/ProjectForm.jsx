import React, { useState, useEffect } from 'react';
import Input from '../layout/template/form/Input';
import Select from '../layout/template/form/Select';
import SubmitButton from '../layout/template/form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({handleSubmit, btnText, projectData}) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)})
        .catch((err) => console.log(err))}, [])
    
    const submit = (e) => {
        e.preventDefault();
        //active or disable sending
        handleSubmit(project);
    }

    const handleChange = (e) => setProject({...project, [e.target.name]: e.target.value});

    const handleCategory = (e) => {
        setProject({...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto:"
                name="name"
                placeholder="Insira o nome do projeto"
                value={project.name}
                handleOnChange={handleChange} />
            <Input
                type="number"
                text="Orçamento do projeto:"
                name="budget"
                placeholder="Insira o orçamento total"
                value={project.budget}
                handleOnChange={handleChange} />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                value={project.category ? project.category.id : ''}
                handleOnChange={handleCategory} />
            <SubmitButton value={btnText} />
        </form>
    )
}

export default ProjectForm;