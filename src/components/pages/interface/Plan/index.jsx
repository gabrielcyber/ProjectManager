import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../../../layout/Content/Container';
import LinkButton from '../../../layout/template/utils/LinkButton';
import Message from '../../../include/messages/Message';
import Loading from '../../../include/dispatch/Loading';
import ProjectCard from '../../../project/ProjectCard';
import styles from './Plan.module.css';

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    
    const locationState = useLocation().state;
    let msg = '';
    locationState && (msg=locationState.message);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err)) 
        }, 500)
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" value="Criar Projeto" />
            </div>
            {msg && <Message type="success" msg={msg} />}
            <Container customClass="start">
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados!</p>}
                {projects.length > 0 &&
                    projects.map((project) => <ProjectCard
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id} />)}
            </Container>
        </div>
    )
}