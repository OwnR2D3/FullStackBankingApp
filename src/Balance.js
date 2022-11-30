import { React, useState, useEffect } from "react";
import Card from "./Context";
import { useBankContext } from "./UserContext";

//baanceForm.js, display the balance of the account

function Balance(){
    const { bank, setLoggedInUser } = useBankContext();
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');
  //return the balance form
    return (
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={
          <BalanceForm/>
        }
      />
    );
  }
  

  //balanceForm.js, display the balance of the account
  function BalanceForm(props){
 
    const { bank, setLoggedInUser, setBalance } = useBankContext();
    const [accountOpen, setAccountOpen] = useState(false);
    const [gottenAccount, setGottenAccount] = useState({});
    const [accountClosed, setAccountClosed] = useState(true);


//useEffect will run when the accountOpen state changes and update balance to make transactions and display.

  useEffect(() => {
//getRecords from database, if the account is open, display the balance.
    async function getRecords() {
      if(bank.setLoggedInUser === ""){
        return;
      } else {
      const email = bank.loggedInUser;
      const response = await fetch(`http://localhost:5000/accounts/${email}`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
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
      setBalance(records.balance);
    }
  }
}
//this will prevent the useEffect from running indefinitely if the account is not open.
  if(accountOpen === false){
    getRecords();
    console.log(gottenAccount);
  }
  }, [bank.loggedInUser, bank.balance]);
  
  //this will display the balance of the account if the account is open.
    return (<>
      <h4>Account Information</h4>
      <h4 hidden={accountOpen}>No account open</h4>
      <h4 hidden={!accountOpen}>Balance: ${gottenAccount.balance}</h4>
  
    </>);
  }






  export default Balance;

