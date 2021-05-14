import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Accordion, Card } from 'react-bootstrap';
import ModalSubItens from './ModalSubItens';
import DateRange from './DateRange';
import DateNormal from './DateNormal';
import ModalTeam from './ModalTeam';
import DateStep from './DateStep';
import ModalStatus from './ModalStatus';
import ModalHour from './ModalHour';

export default function TableContent(props: any){
    const showModal = false;
    const [projectsRows, setProjectRows] = useState<any[]>([]);  

    async function handleLoadRowsProjects(id: any){
        const response = await fetch('http://localhost:5000/projects/list_projects_rows', {                
            body: JSON.stringify({
                "id_project_" : id,
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
                setProjectRows(result);     
            }
        })
    }

    useEffect(() =>{
        handleLoadRowsProjects(props.etapa);
    }, [])

    return(
        <Row>
            {projectsRows.map((projetos, index) => {
                    if(projetos.length == 0){
                        return <h1>nenhum projeto cadastrado!</h1>
                    }else{
                        return (
                            <Row>
                                <Col md={12}>
                                    <Table responsive="sm">
                                            <thead>
                                                <tr>
                                                    <th>Fases</th>
                                                    {/* <th>Sub item</th> */}
                                                    <th>Status</th>
                                                    <th>Previsão de entrega</th>
                                                    <th>Timeline</th>
                                                    <th>Horas contratadas</th>
                                                    <th>Horas Utilizadas</th>
                                                    <th>Saldo</th>
                                                    <th>Reponsáveis</th>
                                                    {/* <th>
                                                        <Row>
                                                            <Col md={12}>
                                                                <Button variant="success" onClick={handleShow}>
                                                                    <FontAwesomeIcon icon={faPlusCircle} size="1x" style={{color: 'white'}}/>
                                                                </Button>
                                                                <Button variant="danger" onClick={handleShow}>
                                                                    <FontAwesomeIcon icon={faMinusCircle} size="1x" style={{color: 'white'}}/>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{projetos.nome_etapa_}</td>
                                                    {/* <td>
                                                        <ModalSubItens showModal={showModal}></ModalSubItens>
                                                    </td> */}
                                                    <td>
                                                        <ModalStatus showModal={showModal} id={projetos.id_step} nomeStatus={projetos}></ModalStatus>
                                                    </td>
                                                    <td><DateStep showModal={showModal} dateStart={	projetos.previsao_entrega_ } idStep={ projetos.id_step }></DateStep></td>
                                                    <td><DateRange showModal={showModal} idProject={projetos.id_step}/></td>
                                                    <td>{projetos.horas_contratadas_}</td>
                                                    <td><ModalHour showModal={showModal} idProject={projetos.id_step} hora={projetos.horas_utilizadas_}/></td>
                                                    <td>{projetos.horas_contratadas_ - projetos.horas_utilizadas_}</td>
                                                    <td>
                                                        <ModalTeam showModal={showModal} idProject={projetos.id_step}></ModalTeam>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                </Col>
                            </Row>
                        )
                    }
                }
            )}
        </Row>
    )
}