import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ModalCustom from './Modal';
import NavbarHeader from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import TableCustom from './Table';
import Projects from '../Projects';
import ModalSubItens from './ModalSubItens';

export default function App() {

  const showModal = false;

  return (
    <Container fluid>
      <NavbarHeader></NavbarHeader>
      <Projects></Projects>
      <Row>
        <ModalCustom showModal={showModal}></ModalCustom>
        <TableCustom></TableCustom>
      </Row>
    </Container>
  );
}

