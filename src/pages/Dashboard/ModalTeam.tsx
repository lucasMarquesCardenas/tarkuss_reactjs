import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faList } from '@fortawesome/free-solid-svg-icons';

export default function ModalTeam(props : any){
    const [showModal, setShow] = useState(false);
    const [team, setTeam] = useState<any[]>([]);
    const [teamSelect, setTeamSelect] = useState<any[]>([]);
    const [idProject, setIdProject] = useState();
    const [idMember, setIdMember] = useState('');        

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };

    async function handleUpdateTeam(){
        const response = await fetch('http://localhost:5000/projects/list_team_project', {
            body: JSON.stringify({
                "id_project_" : idProject,
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

    async function handleInsertTeam(){
        const response = await fetch('http://localhost:5000/projects/insert_team_step', {
            body: JSON.stringify({
                "id_project_" : idProject,
                "id_member_": idMember
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

    async function handleLoadTeam(){
        const response = await fetch('http://localhost:5000/projects/list_team_project', {
            body: JSON.stringify({
                "id_project_" : idProject,
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
                setTeam(result);
            }
        })
    }

    async function handleLoadTeamSelect(){
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
                setTeamSelect(result);
            }
        })
    }

    useEffect(()=>{
        handleLoadTeamSelect();
    }, [])

    useEffect(()=>{
        setShow(props.showModal);
        setIdProject(props.idProject);
        handleLoadTeam();
    }, [idProject])

    useEffect(()=>{
        handleLoadTeam();
    }, [team])

    return(
        <Row>
            <Row>
                <Col md={12}>
                    <Button variant="success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faList} size="1x" style={{color: 'white'}}/>
                    </Button>
                </Col>
            </Row>
           
            <Modal show={showModal} onHide={handleClose} animation={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Membros</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h4>Integrantes nessa etapa:</h4>
                            {team.map((teams, index) => {
                                if(team.length == 0){
                                    return <h1>nenhum projeto cadastrado!</h1>
                                }else{
                                    return (
                                        <Col>
                                            {teams.nome_integrante_}
                                        </Col>   
                                    );
                                }
                            })}
                        </Col>
                        <Col md={12}>
                            <h4>Adicionar integrantes:</h4>
                            <Form  method="" onSubmit={handleInsertTeam}>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control as="select" onChange={(e) => setIdMember(e.target.value)}>
                                    {teamSelect.map((teamSelect, index) => {
                                        if(teamSelect.length == 0){
                                            return <h1>nenhum projeto cadastrado!</h1>
                                        }else{
                                            return (
                                                <>
                                                    <option value={teamSelect.id_}>{teamSelect.nome_integrante_}</option>
                                                </>
                                            );
                                        }
                                    })}
                                    </Form.Control> 
                                </Form.Group>
                                <Col md={12}>
                                    <Button variant="success" type="submit">
                                        <FontAwesomeIcon icon={faPlusCircle} size="1x" style={{color: 'white'}}/>
                                    </Button>
                                </Col>
                            </Form>   
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
    )
}