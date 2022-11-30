import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; 
import { auth } from "./fireabase-config";
import Card from "./Context";
import React, { createContext, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useBankContext } from "./UserContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBBtn } from "mdbreact";


// open close account function
export default function OpenCloseAccount(){
    const { bank, setLoggedInUser, } = useBankContext();
    const [accountOpen, setAccountOpen] = useState(false);
    const [gottenAccount, setGottenAccount] = useState({});
    const [accountClosed, setAccountClosed] = useState(true);
    const [timedOut, setTimedOut] = useState("");
    const [timedOut2, setTimedOut2] = useState("");


//useEffect to get account data
  useEffect(() => {

    async function getRecords() {
      if(bank.setLoggedInUser === ""){
        return;
      } else {
      const email = bank.loggedInUser;
      const response = await fetch(`ROUTE TO GET ACCOUNT DATA`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  //setGottenAccount inputs the account data into the state
      const records = await response.json();
      if(records !== null){
      console.log((records.email));
      setGottenAccount({
        email: records.email, 
        accountNumber: records.accountNumber, 
        routingNumber: records.routingNumber, 
        balance: records.balance
      });
      setAccountOpen(true);
    }
  }
}

//prevents infinite loop in useEffect
  if(accountOpen === false){
    getRecords();
    console.log(gottenAccount);
  }
  }, [timedOut]);


//open account function, sends account data to server, and sets accountOpen to true, and sets accountClosed to false, and sets timedOut to a message
async function openAccount(e) {
    // When a post request is sent to the create url, we'll add a new record to the database.
    const email = bank.loggedInUser;
    const newAccountNumber = Math.floor(Math.random()*1000000);
    const newRoutingNumber = Math.floor(Math.random()*1000000);
    const newBalance = 0;
    const newPerson = {email: email, accountNumber: newAccountNumber, routingNumber: newRoutingNumber, balance: newBalance};
    //update balance in bankContext
    bank.balance = newBalance;


    // Send the post request.
    await fetch("ROUTE TO", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    // status managment, sets accountOpen to true, and sets accountClosed to false, and sets timedOut to a message
    console.log(newPerson);
    setAccountOpen(true);
    setAccountClosed(true);
    setTimedOut("Account opened!");
  }
//not used in this function
async function updateAccount (e) {
        e.preventDefault();
        const editedPerson = {email: "Email@EMAIL.com", accountNumber: 0, routingNumber: 1, balance: 2}
        var id = "62de0f9a003cacc8e8aa3f0e";
      
        // This will send a post request to update the data in the database.
        await fetch(`ROUTE`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedPerson),
        });
        console.log(editedPerson);
        console.log(id);
      }

      //close account function, sends account data to server, deleting the account, and sets accountOpen to false, and sets accountClosed to true, and sets timedOut to a message
async function closeAccount (e) {
    e.preventDefault();
    var email = bank.loggedInUser;
    
    // This will send a post request to update the data in the database.
    await fetch(`ROUTE`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json'
        },
    });
    console.log(email);
    setAccountClosed(true);
    setAccountOpen(false);
    setTimedOut2("Account closed!");

    }
//useeffect to set timedOut to ""
    useEffect(() => {
      const timer = setTimeout(() => setTimedOut(""), 3000);
      return () => clearTimeout(timer);
    }, [timedOut]);
//useeffect to set timedOut2 to ""
    useEffect(() => {
      const timer = setTimeout(() => setTimedOut2(""), 3000);
      return () => clearTimeout(timer);
    }, [timedOut2]);
    

  //renders the open account button, and the close account button, and the message that is displayed after an account is opened or closed
    return (<>
<Card
    bgcolor="warning"
    header="Account Management"
    body={<>
     <Container>
      <Row>
        <Col >   
            <div> 
                <button type="submit" 
                className="btn btn-primary" 
                disabled={accountOpen}  
                onClick={openAccount}>Open Checking Account</button>
                </div>       
        </Col>
        <Col xs={6}></Col>
        <Col> 
            <div>
                <button type="submit" 
                className="btn btn-danger"
                disabled={!accountOpen} 
                onClick={closeAccount}>Close Checking Account</button>
            </div>
            <div>
                <h5>{timedOut}</h5>
                <h5>{timedOut2}</h5>
                <h5 hidden={!accountOpen}>Account Number: {gottenAccount.accountNumber}</h5>
                <h5 hidden={!accountOpen}>Account Routing: {gottenAccount.routingNumber}</h5>
                <h5 hidden={!accountOpen}>Balance: $ {gottenAccount.balance}</h5>
                <h5 className= "text-color-primary" hidden={accountClosed}>Account Closed Successfuly</h5>
            </div>
        </Col>
      </Row>
    </Container>
   
  
     
      </>}
     />
  </>
    );
    }



