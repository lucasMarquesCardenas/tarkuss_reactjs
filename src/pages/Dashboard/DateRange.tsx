import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DateRange(props: any){
    const [showModal, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [idStep, setIdStep] = useState(null);
    const [timeline, setTimeline] = useState<any[]>([]);

    const handleClose = () => { setShow(false) };
    
    const handleShow = () => { setShow(true) };
    
    const onChange = (dates:any) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      handleInsertTimeline();
    };

    async function handleInsertTimeline(){
      const response = await fetch('http://localhost:5000/projects/insertTimeline', {                
          body: JSON.stringify({
              "id_project_" : idStep,
              "data_inicial": startDate,
              "data_final": endDate
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

  async function handleListTimeline(){
    const response = await fetch('http://localhost:5000/projects/list_timeline', {                
        body: JSON.stringify({
            "id_project_" : idStep,
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
          setTimeline(result);
          timeline.forEach(item => {
            setStartDate(item.data_inicial_);
            setEndDate(item.data_final);
          });     
        }
    })
}

useEffect(()=>{
  handleListTimeline();
  setIdStep(props.idProject);
}, []);

  useEffect(()=>{
    setShow(props.showModal);
    setIdStep(props.idProject);

  }, [idStep]);

  return (
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
              <Modal.Title>Definir previsão de entrega</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DatePicker dateFormat="dd/MM/yyyy" selected={startDate}  startDate={startDate} endDate={endDate} onChange={(date: any) => onChange(date) } selectsRange/>
          </Modal.Body>
          <Modal.Footer>
              {/* <Button variant="success" onClick={handleClose}>
                  Adicionar
              </Button> */}
              <Button variant="danger" onClick={handleClose}>
                  Fechar
              </Button>
          </Modal.Footer>
      </Modal>
    </Row>
  );
}