import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Accordion, Card, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';

export default function ModalStatus(props : any){
    const [showModal, setShow] = useState(false); 
    const [idStatus, setIdStatus] = useState('');
    const [idProject, setIdProject] = useState(null);
    const [status, setStatus] = useState<any[]>([]);   

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    async function handleUpdateStatus(){
        const response = await fetch('http://localhost:5000/projects/update_status_step', {
            body: JSON.stringify({
                "id_project_" : idProject,
                "id_status": idStatus,
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

    async function handleLoadStatus(){
        const response = await fetch('http://localhost:5000/projects/list_status', {                   
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then(async (response)=>{
            if(response == null){
                console.log("vazio");    
            }else{
                const result = await response.json();
                setStatus(result);
            }
        })
    }

    useEffect(()=>{
        setShow(props.showModal);
    }, [])

    useEffect(()=>{
        console.log(props.id);
        setShow(props.showModal);
        setIdProject(props.id);
        handleLoadStatus();  
    }, [idProject])

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
                    <Modal.Title>Definir Status</Modal.Title>
                </Modal.Header>
                <Form method="" onSubmit={handleUpdateStatus}>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Definir status</Form.Label>
                            <Form.Control as="select" onChange={(e) => setIdStatus(e.target.value)}>
                            <option value="0">Selecione</option>
                            {status.map((statu, index) => {
                                if(statu.length == 0){
                                    return <h1>nenhum projeto cadastrado!</h1>
                                }else{
                                    return (
                                        <>   
                                            <option value={statu.id_}>{statu.nome_status}</option>
                                        </>
                                    );
                                }
                            })}
                            </Form.Control> 
                        </Form.Group>         
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