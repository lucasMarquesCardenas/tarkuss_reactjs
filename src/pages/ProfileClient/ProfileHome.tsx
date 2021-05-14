import React, { useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import NavbarHeader from '../../components/Navbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardCustom, Progress } from '../../css/ProfileHome';

export default function ProfileHome(){
    const percentage = 66;

    return(
        <Container fluid>
           <NavbarHeader />
           <Row className="mt-4">
               <Col md={3}>
                    <CardCustom>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Title>Treinamentos</Card.Title>
                                    <Card.Text>
                                        22/10/2021
                                    </Card.Text>
                                </Col>
                            </Row>    
                        </Card.Body>
                    </CardCustom>
                </Col>

                <Col md={3}>
                    <CardCustom>
                        <Card.Body>
                            <Row>
                                <Col md={12}>
                                    <Card.Title>Progresso do projeto</Card.Title>
                                    <Progress>
                                        <CircularProgressbar value={percentage} text={`${percentage}%`} />;
                                    </Progress>
                                </Col>
                            </Row>    
                        </Card.Body>
                    </CardCustom>
                </Col>
           </Row>

           
        </Container>
    )
}