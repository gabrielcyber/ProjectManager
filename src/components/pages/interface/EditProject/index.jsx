import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import Container from '../../../layout/Content/Container';
import Message from '../../../include/messages/Message';
import Loading from '../../../include/dispatch/Loading';
import ProjectForm from '../../../project/ProjectForm';
import ServiceForm from '../../../project/ServiceForm';
import ServiceCard from '../../../project/ServiceCard';
import styles from './EditProject.module.css';

export default function EditProject() {

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState({value: null, type: null});

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setServices(data.services);
            })
            .catch((err) => console.log(err))
        }, 500)
    }, [id])

    const toggleProjectForm = () => setShowProjectForm(!showProjectForm)
    const toggleServiceForm = () => setShowServiceForm(!showServiceForm)

    const editProject = (project) => {
        setMessage({value: null, type: null});

        if (project.budget < project.cost) {
            setMessage({
                value: 'O orçamento não pode ser menor que o custo do projeto!',
                type: 'error'
            })
            return false
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage({
                value: 'Projeto alterado com sucesso!',
                type: 'success'
            })
        })
        .catch((err) => console.log(err))
    }

    const createService = (project) => {
        setMessage({value: null, type: null});
        
        const lastService = project.services[project.services.length - 1];

        if (lastService.cost > parseFloat(project.budget)) {
            setMessage({
                value: 'Orçamento ultrapassado, verifique o valor do serviço',
                type: 'error'
            })
            project.services.pop()
            return false
        }
        else {
            lastService.id = v4();
            project.cost += parseFloat(lastService.cost);
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers :{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then(() => {
            setShowServiceForm(false);
            setMessage({
                value: 'Serviço cadastrado com sucesso',
                type: 'success'
            })
        })
        .catch((err) => console.log(err))
    }

    const removeService = (id, cost) => {
        setMessage({value: null, type: null});
        
        const servicesUpdate = services.filter((service) => service.id !== id);
        project.services = servicesUpdate;
        project.cost -= parseFloat(cost);
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then(() => {
            setProject(project);
            setServices(servicesUpdate);

            setMessage({
                value: 'Serviço removido com sucesso!',
                type: 'success'
            });
        })
        .catch((err) => console.log(err))
    }

    return (
        <>
            {project.id ?
            <div className={styles.project_details}>
                {message.value && <Message type={message.type} msg={message.value} />}
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Projetos: {project.name}</h1>
                        {!showProjectForm ?
                        <>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                Editar Formulário
                            </button>
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span> R${project.cost}
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                Fechar
                            </button>
                            <div className={styles.project_info}>
                                <ProjectForm
                                    handleSubmit={editProject}
                                    btnText="Concluir a ação"
                                    projectData={project} />
                            </div>
                        </>}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ?
                            'Adicionar serviço'
                            : 'Fechar'}
                        </button>
                        {showServiceForm &&
                        <div className={styles.project_info}>
                            <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project} />
                        </div>
                        }
                    </div>
                    <Container customClass="start">
                        {services.length > 0 ?
                            services.map((service) => (
                                <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    handleRemove={removeService}
                                    key={service.id} />
                            ))
                        : <p>Não há serviços cadastrados</p>}
                    </Container>
                </Container>
            </div>
            : <Loading />}
        </>
    )
}