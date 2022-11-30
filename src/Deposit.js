import { React, useEffect, useState } from "react";
import Card from "./Context";
import { useBankContext } from "./UserContext";


// deposit function, takes in the amount and updates the balance
function Deposit(){
    const [show, setShow]     = useState(false);
    const [status, setStatus] = useState('');  
    const { bank, setLoggedInUser, setBalance } = useBankContext();
    const [accountOpen, setAccountOpen] = useState(false);

    // useEffect will run when the accountOpen state changes and update balance to make transactions.
    useEffect(() => {
      console.log("useEffect");
      async function getRecords() {
        if(bank.setLoggedInUser === ""){
          return;
        } else {
        const email = bank.loggedInUser;
        const response = await fetch(`ROUTE TO GET ACCOUNT`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        if(records !== null){
        console.log((records));
        
        setAccountOpen(true);
        setShow(true);
        setBalance(records.balance);
      }
    }
  }
  //this will prevent the useEffect from running indefinitely if the account is not open.
    if(accountOpen === false){
      getRecords();
    }
    },);
  // This will display the deposit form if the account is open.
    return (
      <Card
        bgcolor="warning"
        header="Deposit"
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus}/> :
          <DepositMsg setShow={setShow} setStatus={setStatus}/>}
      />
    )
  }
  // This will display a message if the account is closed.
  function DepositMsg(props){
    return (<>
      <div>No account open</div>
    </>);
  } 
  // This will display the deposit form.
  function DepositForm(props){
    const [show, setShow]     = useState(true);
    const { bank, setLoggedInUser, setBalance } = useBankContext();
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState('');
    console.log(bank);
// This will update the balance and status message when the user submits the form.
    useEffect(() => {
      const timer = setTimeout(() => setStatus(""), 3000);
      return () => clearTimeout(timer);
    }, [status]);

//  This will update the balance in the database and status message when the user submits the form.    
    async function updateAccount (e) {
      let newBalance = bank.balance + parseInt(amount);
      const editedPerson = {balance: newBalance};
      var email = bank.loggedInUser;
      console.log(email);
    
      // This will send a post request to update the data in the database.
      await fetch(`ROUTE`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedPerson),
      });
      // This will update the balance and status message.
      console.log(editedPerson);
      setBalance(newBalance);
      setShow(false);
      setStatus('Success');
      setAmount(0)
    }
  
   // This will display the deposit form.
  
    return(<>
    
      <div>Amount</div><br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
        <h4>{status}</h4>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={(e) => updateAccount(e)}>Deposit</button>
  
    </>);
  }

  export default Deposit;