import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardTheme } from '../css/Card';

export default function CardCustom(props : any){
    return(
        <Col md={3}>
            <CardTheme>
                <Card.Body>
                    <Row>
                        <Col md={9}>
                            <Card.Title>{props.content.title}</Card.Title>
                            <Card.Text>
                                {props.content.body}
                            </Card.Text>
                        </Col>
                        <Col md={3}>
                            <FontAwesomeIcon icon={props.content.icon} size="3x"/>
                        </Col>
                    </Row>    
                </Card.Body>
            </CardTheme>
        </Col>    
    )
}
