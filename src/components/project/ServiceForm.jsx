import React, {useState} from 'react';
import Input from '../layout/template/form/Input';
import SubmitButton from '../layout/template/form/SubmitButton';
import styles from './ProjectForm.module.css';

function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({});

    const submit = (e) => {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    const handleChange = (e) => setService({...service, [e.target.name]: e.target.value})

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço:"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange} />
            <Input
                type="number"
                text="Custo do Serviço:"
                name="cost"
                placeholder="Insira o custo do serviço"
                handleOnChange={handleChange} />
            <Input
                type="text"
                text="Descrição do Serviço:"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange} />
            <SubmitButton value={btnText} />
        </form>
    )
}

export default ServiceForm;