import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faSpinner, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import CardCustom from '../components/Card';

export default function Projects(){

    const [inProgress, setInProgress] = useState(0);
    const [finalizados, setFinalizados] = useState(0);
    const [projects, setProjects] = useState(0);       
    const [members, setMembers] = useState(0);  

    async function handleLoadInProgress(){
        const response = await fetch('http://localhost:5000/projects/list_in_progress', {                   
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then(async (response)=>{
            if(response == null){
                console.log("vazio");    
            }else{
                let count = 0;
                const result = await response.json();
                result.forEach((element: any) => {
                    count++;
                });
                setInProgress(count);       
            }
        })
    }

    async function handleLoadFinalizados(){
        const response = await fetch('http://localhost:5000/projects/list_finalizados', {                   
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then(async (response)=>{
            if(response == null){
                console.log("vazio");    
            }else{
                let count = 0;
                const result = await response.json();
                result.forEach((element: any) => {
                    count++;
                });
                setFinalizados(count);       
            }
        })
    }

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
                let count = 0;
                const result = await response.json();
                result.forEach((element: any) => {
                    count++;
                });
                setProjects(count);       
            }
        })
    }

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
                let count = 0;
                const result = await response.json();
                result.forEach((element: any) => {
                    count++;
                });
                setMembers(count);       
            }
        })
    }

    useEffect(()=>{
       handleLoadInProgress();
       handleLoadFinalizados();
       handleLoadProjects();
       handleLoadMembers();
    }, [])

    const cardContent = {
        projetsInProgress: {title: 'Em andamento', body: inProgress, icon: faSpinner},
        projetsFinalized: {title: 'Finalizados', body: finalizados, icon: faCalendarCheck},
        projetsTotal: {title: 'Total de projetos', body: projects, icon: faCalendarCheck},
        involved: {title: 'Totais envolvidos', body: members, icon: faCalendarCheck},
    }

    return(
        <Row>
            <Col md={12}>
                <Row>
                    <CardCustom content={cardContent.projetsInProgress}></CardCustom>
                    <CardCustom content={cardContent.projetsFinalized}></CardCustom>
                    <CardCustom content={cardContent.projetsTotal}></CardCustom>
                    <CardCustom content={cardContent.involved}></CardCustom>
                </Row>         
            </Col>
        </Row>
    )
}



