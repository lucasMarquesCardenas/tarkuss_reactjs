import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';

export default function ModalSubItens(props : any){
    const [showModal, setShow] = useState(false);    

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    useEffect(()=>{
        setShow(props.showModal);
    }, [])

    return(
        <Row>
            <Row>
                <Col md={12}>
                    <Button variant="success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faChartBar} size="1x" style={{color: 'white'}}/>
                    </Button>
                </Col>
            </Row>
           
            <Modal show={showModal} onHide={handleClose} animation={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Sub item</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit" >
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