import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Accordion, Card, Modal } from 'react-bootstrap';
import DateNormal from './DateNormal';

export default function DateStep(props: any){
    const [showModal, setShow] = useState(false);
    const [startDate, setStartDate] = useState('');    
    const [dateStep, setDateStep] = useState(Date); 

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    useEffect(()=>{
        setShow(props.showModal);
        if(props.dateStart == null){
            setStartDate('Sem data definida');
        }else{
            // let dataFormatada = (props.dateStart.getFullYear() + "-" + ((props.dateStart.dateStartgetMonth() + 1)) + "-" + (props.dateStart.getDate() )) ;
            setDateStep(props.dateStart);
        }
    }, []);

    return(
        <Row>
            <Row>
                <Col md={12}>
                    <Button variant="success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faList} size="1x" style={{color: 'white'}}/>
                    </Button>
                    <h6>{startDate}</h6>
                    <h6>{dateStep}</h6>
                </Col>
            </Row>
           
            <Modal show={showModal} onHide={handleClose} animation={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Definir previsão de entrega</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DateNormal idStepProp={props.idStep}></DateNormal>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Adicionar
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    )
}