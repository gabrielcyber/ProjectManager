import { useState, useEffect } from 'react';
import Input from '../include/template/form/Input';
import Select from '../include/template/form/Select';
import SubmitButton from '../include/template/form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({handleSubmit, projectData, btnText}) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((data) => {
            setCategories(data)})
        .catch((err) => console.log(err))}, [])
    
    function submit(e) {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleCategory(e) {
        setProject({...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto:"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange} />
            <Input
                type="number"
                text="Orçamento do projeto:"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange} />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''} />
            <SubmitButton value={btnText}/>
        </form>
    )
}

export default ProjectForm;