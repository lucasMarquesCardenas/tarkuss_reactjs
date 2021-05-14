import React, { FormEvent, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { ContainerRegister } from '../css/Register';
import DatePicker from "react-datepicker";

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    async function handleSubmitForm(e : FormEvent){
        e.preventDefault();
    
      const response = await fetch('http://localhost:5000/users/register', {
    
        body: JSON.stringify({
            nome: name,
            email: email,
            senha: password,
            telefone: phoneNumber,
            data_nascimento: startDate
        }),                     
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'POST'
        }).then((response)=>{
           setRedirect(true);
        })
    }
    
    if (redirect) 
        return <Redirect to='/'/>;
    else return(
        <ContainerRegister>
            <Row>
                <Col md={4}>
                    <Form  method="POST" onSubmit={handleSubmitForm}>
                        <Form.Group controlId="name" className="text-light">
                            <Form.Label>Nome completo:</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu nome completo" onChange={(e) => {setName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="text-light mt-4">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="Digite seu e-mail" onChange={(e) => {setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="text-light mt-4">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control type="password" placeholder="Digite sua senha" onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="phone" className="text-light mt-4">
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu telefone" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="nascimento" className="text-light mt-4">
                            <Form.Label>Data nascimento:</Form.Label>
                            <DatePicker 
                                dateFormat="dd/MM/yyyy" 
                                selected={startDate} 
                                onChange={(date: any) => setStartDate(date)} 
                            />
                        </Form.Group>
                        <Row className="mt-4">
                            <Button variant="success" type="submit">
                                Registrar
                            </Button>
                        </Row>
                        <Link to="/">
                            <Row className="mt-4">
                                <Button variant="success" type="submit">
                                   Cancelar
                                </Button>
                            </Row>
                        </Link> 
                        
                    </Form>
                </Col>
            </Row>
           
        </ContainerRegister>
    )
}