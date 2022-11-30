import React from "react";
import Balance from "./Balance";
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Login from "./Login";
import { useBankContext } from "./UserContext";
import Withdraw from "./Withdraw";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// not used anymore
export default function Operations () {


    return (<>
      <Container>
      <Row md={4}>
        <Col><Balance/></Col>
        <Col xs={6}><Deposit/></Col>
        <Col><Withdraw/></Col>
      </Row>
    </Container>
        
        
        
    </>);
}