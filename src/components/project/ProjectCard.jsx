import { Link } from 'react-router-dom';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import styles from './ProjectCard.module.css';

function ProjectCard({id, name, budget, category, handleRemove}) {
    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={styles[category.toLowerCase()]}></span>{category}
            </p>
            <div className={styles.projectCard_actions}>
                <Link to="/">
                    <BsPencil /> Editar
                </Link>
                <button>
                    <BsTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard;