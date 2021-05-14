import React from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NavbarHeader(){
    return(
        <Row>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home" className="text-light">Tarkuss</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="text-light">Home</Nav.Link>            
                    </Nav>
                </Navbar.Collapse>
                <FontAwesomeIcon icon={faUser} size="1x" style={{color: 'white'}}/>
                <NavDropdown title="Lucas Marques" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Sair</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        </Row>
    )
}