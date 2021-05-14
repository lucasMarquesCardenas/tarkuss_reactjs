import React, { FormEvent, useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Table } from 'react-bootstrap';

export default function ListMembers(){
    const [members, setMembers] = useState<any[]>([]);

    async function handleLoadMembers(){
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
                setMembers(result);
            }
        })
    }

    useEffect(() =>{
        handleLoadMembers();
    }, [])

    return(
        <Table responsive="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Integrante</th>
                </tr>
            </thead>
           
            
                {   
                    members.map((member, index) => {
                        if(member.length == 0){
                            return <h1>nenhum projeto cadastrado!</h1>
                        }
                        return (
                            <tbody>
                                <tr>
                                    <td>{member.id_}</td>
                                    <td>{member.nome_integrante_}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }  
            
        </Table>
    )
}