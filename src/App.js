import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* pages */
import Home from './components/pages/Home';
import Projects from './components/pages/interface/Plan';
import Contact from './components/pages/interface/Contact';
import Company from './components/pages/interface/Company';
import NewProject from './components/pages/interface/NewProject';
import EditProject from './components/pages/interface/EditProject';

/* layout */
import Container from './components/layout/Content/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Container customClass="min-height">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/company" element={<Company />} />
                <Route path="/newproject" element={<NewProject />} />
                <Route path="/project/:id" element={<EditProject />} />
            </Routes>
        </Container>
        <Footer />
    </BrowserRouter>
  );
}

export default App;