import React from 'react';
import LinkButton from '../../layout/template/utils/LinkButton';
import './HomePage.css';

export default function Home() {
    return (
        <section className="home_container">
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" value="Criar Projeto" />
            <img src="./img/savings.svg" alt="Piggy bank" />
        </section>
    )
}