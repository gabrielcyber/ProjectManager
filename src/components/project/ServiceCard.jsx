import React from 'react';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import styles from './ProjectCard.module.css';

function ServiceCard({id, name, cost, description, handleRemove}) {
    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Custo Total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.projectCard_actions}>
                <button onClick={() => handleRemove(id, cost)}>
                    <BsTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;