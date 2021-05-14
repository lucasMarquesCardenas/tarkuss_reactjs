import React, { FormEvent, useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import ModalSteps from './ModalSteps';

export default function ModalCustom(props : any){
    const [showModal, setShow] = useState(false);
    const [nameProject, setNameProject] = useState('');
    const [steps, setSteps] = useState<any[]>([]);
    const [team, setTeam] = useState<any[]>([]);
    const [checkBoxSteps, setCheckBoxSteps] = useState<any[]>([]);
    const [checkBoxMembers, setCheckBoxMembers] = useState<any[]>([]);
    const showModalSteps = false;

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    const handleCheckedSteps = ( id: number ) => { 
        if(checkBoxSteps.length == 0){
            checkBoxSteps.push(id);
        }else{
            let found = checkBoxSteps.find(element => element == id);
            if(found == null){
                checkBoxSteps.push(id);    
            }
        }
    };

    const handleCheckedMembers = ( id: number ) => { 
        if(checkBoxMembers.length == 0){
            checkBoxMembers.push(id);
        }else{
            let found = checkBoxMembers.find(element => element == id);
            if(found == null){
                checkBoxMembers.push(id);    
            }
        }
    };

    async function handleLoadSteps(){
        const response = await fetch('http://localhost:5000/projects/list_steps', {                
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then(async (response)=>{
            if(response == null){
                console.log("vazio");    
            }else{
                const result = await response.json();
                setSteps(result);
            }
        })
    }

    async function handleListTeam(){
        const response = await fetch('http://localhost:5000/projects/list_members', {                
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then(async (response)=>{
            if(response == null){
                console.log("vazio");    
            }else{
                const result = await response.json();
                setTeam(result);
            }
        })
    }

    useEffect(()=>{
        setShow(props.showModal);
        handleLoadSteps();
        handleListTeam();
    }, [])
    
    async function handleSubmitForm(e : FormEvent){
        e.preventDefault();
    
      const response = await fetch('http://localhost:5000/projects/insert_project', {
        body: JSON.stringify({
            "nome_projeto_" : nameProject,
            "id_checked_steps": checkBoxSteps,
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
     
    return(
        <Row className={"mt-4"}>
            {/* <Col md={12}> */}
                <Row>
                    <Col>
                    <Button variant="success" onClick={handleShow}>
                        Adicionar novo projeto
                    </Button>
                    <ModalSteps showModal={showModalSteps}></ModalSteps>
                    </Col>
                    
                </Row>
            {/* </Col> */}
           
            <Modal show={showModal} onHide={handleClose} animation={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar novo projeto</Modal.Title>
                </Modal.Header>
                <Form  method="" onSubmit={handleSubmitForm}>
                    <Modal.Body>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nome do projeto:</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o nome do projeto" onChange={(e) => {setNameProject(e.target.value)}}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Etapas:</Form.Label>
                                    {steps.map((step, index) => {
                                        if(step.length == 0){
                                            return <h1>nenhum projeto cadastrado!</h1>
                                        }else{
                                            return (
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`default-${step.id_}`}
                                                    label={step.nome_etapa_} 
                                                    onChange={(e) => {
                                                        if(e.target.checked == true){
                                                            handleCheckedSteps(step.id_);
                                                        }
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <Form.Label>Responsáveis:</Form.Label>
                                    {team.map((teams, index) => {
                                        if(team.length == 0){
                                            return <h1>nenhum projeto cadastrado!</h1>
                                        }else{
                                            return (
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`default-${teams.id_}`}
                                                    label={teams.nome_integrante_}
                                                    onChange={(e) => {
                                                        if(e.target.checked == true){
                                                            handleCheckedMembers(teams.id_);
                                                        }
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                            </Col>
                        </Row> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit" onClick={handleClose}>
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

