import React from "react";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useBankContext } from "./UserContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// not used anymore
export default function LogOrSignIn () {


    return (<>
     <Container>
      <Row>
        <Col><CreateAccount/></Col>
        <Col><Login/></Col>
      </Row>
    </Container>

        
    </>);
}