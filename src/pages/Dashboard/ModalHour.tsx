import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ModalHour(props:any){
    const [showModal, setShow] = useState(false);
    const [idStep, setIdStep] = useState(null);
    const [hour, setHour] = useState('');

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    async function handleInsertHour(){
        const response = await fetch('http://localhost:5000/projects/insert_hour', {                
            body: JSON.stringify({
                "id_project_" : idStep,
                "hour": hour,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }).then(async (response)=>{
            if(response == null){
              console.log("vazio");    
            }else{
              const result = await response.json();     
            }
        })
    }

    useEffect(()=>{
        setShow(props.showModal);
        setIdStep(props.idProject);
    
    }, [idStep]);
    
    return(
        <Row>
            <Row>
                <Col md={4}>
                    <Button variant="success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faList} size="1x" style={{color: 'white'}}/>
                    </Button>
                </Col>
                <Col md={4}>{props.hora}</Col>
            </Row>
           
            <Modal show={showModal} onHide={handleClose} animation={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Horas utilizadas</Modal.Title>
                </Modal.Header>
                <Form  method="" onSubmit={handleInsertHour}>
                <Modal.Body>
                    <Row>
                        <Form.Label>Quantidade de horas utilizadas:</Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Digite a quantidade de horas utilizadas" onChange={(e) => {setHour(e.target.value)}}/>
                        </Form.Group> 
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        Adicionar
                    </Button>   
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </Row>
    )
}