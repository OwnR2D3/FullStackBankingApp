import { React, useState, useEffect } from "react";
import Card from "./Context";
import { useBankContext } from "./UserContext";


// Withdraw.js function with the logic to withdraw money from the account. Card part is from the Context.js file.
function Withdraw(){
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
        const response = await fetch(`ROUTE`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        if(records !== null){
        console.log((records));
        // Hoooks will update the balance of the account and status message among others
        setAccountOpen(true);
        setShow(true);
        setBalance(records.balance);
      }
    }
  }
// prevent the useEffect from running indefinitely if the account is not open.

    if(accountOpen === false){
      getRecords();
    }
    },);

// This will display the withdraw form if the account is open.
  
    return (
      <Card
        bgcolor="success"
        header="Withdraw"
        status={status}
        body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
          <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
      />
    )
  }
  
// This will display the message if the account is not open. (prevented already with route to hml page on logout)

  function WithdrawMsg(props){
    return (<>
      <div>No account open</div>
    </>);
  } 
  
// WithdrawForm will display the form to withdraw money.
// WithdrawMsg will display the message if the account is not open.

  function WithdrawForm(props){
    const [show, setShow]     = useState(true);
    const { bank, setLoggedInUser, setBalance } = useBankContext();
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState('');
    console.log(bank);

        // Status message timer
        useEffect(() => {
          const timer = setTimeout(() => setStatus(""), 3000);
          return () => clearTimeout(timer);
        }, [status]);

// This will send a post request to update the data in the database.    
    async function updateAccount (e) {
      if(bank.balance < amount){
        setStatus("Insufficient funds");
        return console.log('Insufficient funds');
      }
      let newBalance = bank.balance - parseInt(amount);
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
      // This will update the balance of the account.
      console.log(editedPerson);
      setBalance(newBalance);
      setShow(false);
      setStatus('Success');
      setAmount(0)
    }
  
   
  // This will display the form to withdraw money.
    return(<>
  
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
        <h4>{status}</h4>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={(e) => updateAccount(e)}>Withdraw</button>
  
    </>);
  }
//
  export default Withdraw;
