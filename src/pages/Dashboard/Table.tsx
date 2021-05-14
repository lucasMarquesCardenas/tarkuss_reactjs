import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Accordion, Card } from 'react-bootstrap';
import TableContent from './TableContent';

export default function TableCustom(){
    const [projects, setProjects] = useState<any[]>([]);

    async function handleLoadProjects(){
        const response = await fetch('http://localhost:5000/projects/list_projects', {                
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then(async (response)=>{
            if(response == null){
                console.log("vazio");    
            }else{
                const result = await response.json();
                setProjects(result);
            }
        })
    }

    useEffect(() =>{
        handleLoadProjects();
    }, [])

    // useEffect(() =>{
    //     handleLoadProjects();
    // }, [projects])

    return(
        <Row className="mt-4">
            {projects.map((projetos, index) => {
                if(projetos.length == 0){
                    return <h1>nenhum projeto cadastrado!</h1>
                }else{
                    return (
                        <Accordion>
                            <Card>   
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    {projetos.nome_projeto_}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <TableContent etapa={projetos.id_}></TableContent>    
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )     
                }
            })}
           
            
        </Row>
    )
}