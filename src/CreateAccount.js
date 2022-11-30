import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from "./fireabase-config";
import Card from "./Context";
import { React, useEffect, useState } from "react";
import { useBankContext } from "./UserContext";

//renders the login page, and the login button

function Accounts () {

  const { bank, setLoggedInUser } = useBankContext();
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [LoginPassword, setLoginPassword] = useState('')
  const [user, setUser] = useState({});
  const [userLogged, setUserLogged] = useState('')
  const [status, setStatus] = useState('')
  const [status2, setStatus2] = useState('')
//useEffect to check if user is logged in
  useEffect(() => {
    console.log(userLogged);
    setUserLogged(auth.currentUser?.email)
  });

//useEffect to time out the message
  useEffect(() => {
    const timer = setTimeout(() => setStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  //useEffect to time out the message2
  useEffect(() => {
    const timer = setTimeout(() => setStatus2(""), 5000);
    return () => clearTimeout(timer);
  }, [status2]);



//register function, takes in email and password, and register a new user on Google Firebase
  const register = async () => {
//create new user with email and password
      try {
     const userR = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
       ); 
     console.log(userR)
     setUserLogged(auth.currentUser?.email);
     setStatus("User created successfully");

     //log user in after creating account
     const userI = await signInWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword,
    );
    console.log(userI);
    console.log(userI.user.email);
    setLoggedInUser(userI.user.email);
    console.log(bank);
    setStatus2("Logged in successfully");
  } catch (error) {
      console.log(error.message);
  

  
};
  };

  
  //returns the login page, and the login button

  return (<>
  <Card
    bgcolor="primary"
    header="Create Account"
    body= {<>
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        onChange={e => setRegisterEmail(e.target.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        onChange={e => setRegisterPassword(e.target.value)}/><br/>
        <h4>{status}</h4>
        <h4>{status2}</h4>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={register}>Create Account</button>
        </>
    }
    
  />
  </>
)


  
}


  export default Accounts;