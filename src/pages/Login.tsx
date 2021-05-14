import React, { FormEvent, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import NavbarHeader from '../components/Navbar';
import { ContainerLogin } from '../css/Login';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmitForm(e : FormEvent){
        e.preventDefault();
    
      const response = await fetch('http://localhost:5000/users/login_user', {
        body: JSON.stringify({
            email: email,
            senha: password
        }),                     
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'POST'
        }).then((response)=>{
            let data = response.json();
            data.then((item)=>{
                console.log(item.length);
                if(item.lentgh == 0){
                    setRedirect(false);
                }else{
                    setRedirect(true);
                }
            })
        })
    } 
    
    if (redirect == true) 
        return <Redirect to='/index'/>;
    else return(
        <ContainerLogin>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form  method="POST" onSubmit={handleSubmitForm}>
                        <Form.Group controlId="formBasicEmail" className="text-light">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="Digite seu e-mail" onChange={(e) => {setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="text-light mt-4">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control type="password" placeholder="Digite sua senha" onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Row className="mt-4">
                            <Button variant="success" type="submit">
                                Entrar
                            </Button>
                        </Row>
                        <Row className="justify-content-center mt-4 text-light">
                            ou
                        </Row>
                        <Link to="/register">
                            <Row className="mt-4">
                                <Button variant="success" type="submit">
                                    Registrar
                                </Button>
                            </Row>
                        </Link> 
                        
                    </Form>
                </Col>
            </Row>
        </ContainerLogin>
    )
}