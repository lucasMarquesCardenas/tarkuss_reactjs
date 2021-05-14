import React, { FormEvent, useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import ListSteps from './ListSteps';
import ListMembers from './ListMembers';

export default function ModalSteps(props : any){
    const [showModal, setShow] = useState(false);
    const [nameStep, setNameStep] = useState('');
    const [timesStep, setTimesStep] = useState('');
    const [nameMembers, setNameMembers] = useState('');

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    async function handleSubmitFormStep(e : FormEvent){
        e.preventDefault();
    
      const response = await fetch('http://localhost:5000/projects/insert_step', {
        body: JSON.stringify({
            "nome_etapa_" : nameStep,
            "horas_contratadas_" : timesStep,
        }),                  
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'POST'
        }).then((response)=>{
            if(response == null){
            //   handlerToast(500);
            }else{
              const result = response;
            }
        })
    }

    async function handleSubmitFormMembers(e : FormEvent){
        e.preventDefault();
    
      const response = await fetch('http://localhost:5000/projects/insert_members', {
        body: JSON.stringify({
            "nome_integrante_" : nameMembers,
        }),                  
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'POST'
        }).then((response)=>{
            if(response == null){
            //   handlerToast(500);
            }else{
              const result = response;
              console.log(result);
            }
        })
    }

    useEffect(()=>{
        setShow(props.showModal);
    }, [])

    return(
        <>
            <Button variant="success" onClick={handleShow}>
                Adicionar nova etapa/integrante
            </Button>
            <Row>
            <Modal show={showModal} onHide={handleClose} animation={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar nova etapa/integrante</Modal.Title>
                </Modal.Header>
               
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Row>
                                    <Col md={12}>
                                        <Form  method="" onSubmit={handleSubmitFormStep}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Label>Nome da etapa:</Form.Label>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Control type="text" placeholder="Digite o nome da etapa" onChange={(e) => {setNameStep(e.target.value)}}/>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label>Quantidade de horas:</Form.Label>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Control type="text" placeholder="Digite a quantidade de horas contratadas" onChange={(e) => {setTimesStep(e.target.value)}}/>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Button variant="success" type="submit">
                                                        <FontAwesomeIcon icon={faPlusCircle} size="1x" style={{color: 'white'}}/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col md={12}>
                                        <Form  method="" onSubmit={handleSubmitFormMembers}>
                                            <Form.Label>Nome responsável:</Form.Label>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Control type="text" placeholder="Digite o nome do responsável" onChange={(e) => {setNameMembers(e.target.value)}}/>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Button variant="success" type="submit">
                                                        <FontAwesomeIcon icon={faPlusCircle} size="1x" style={{color: 'white'}}/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>   
                                    </Col>
                                    <Row>
                                        <ListMembers></ListMembers>
                                    </Row>   
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                
            </Modal>
            </Row>
        </>
    )

}