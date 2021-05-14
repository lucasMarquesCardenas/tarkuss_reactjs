import React, { FormEvent, useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Table } from 'react-bootstrap';

export default function ListSteps(){
    const [steps, setSteps] = useState<any[]>([]);

    async function handleLoadSteps(){
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
                setSteps(result);
            }
        })
    }

    useEffect(() =>{
        handleLoadSteps();
    }, [])

    return(
        <Table responsive="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Etapa</th>
                    <th>Horas contratadas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                {   
                    steps.map((step) => {
                        if(step.length == 0){
                            return <h1>nenhum projeto cadastrado!</h1>
                        }else{
                            return 
                            (
                                <>
                                    <td>{step.id_}</td>
                                    <td></td>
                                </>
                            )
                        }
                    })
                }
                </tr>
            </tbody>
        </Table>
    )
}