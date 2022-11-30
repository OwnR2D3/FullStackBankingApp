import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; 
import { auth } from "./fireabase-config";
import Card from "./Context";
import React, { createContext, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useBankContext } from "./UserContext";



//login function, takes in email and password
export default function Login(){

    const { bank, setLoggedInUser } = useBankContext();

    const [show, setShow]     = useState(true); 
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('')
    const [userLogged, setUserLogged] = useState('')

    useEffect(() => {
      console.log(userLogged);
      setUserLogged(auth.currentUser?.email)


    });


//logging, manages the login and server requests to Google Firebase, and sets the logged in user  
  const logging = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      console.log(user.user.email);
      setLoggedInUser(user.user.email);
      console.log(bank);
    }catch (error) {
      console.error(error.message);
    }
  };
//logout function, logs out the user, from Google Firebase
  const logout = async () => {
    const user = await signOut(auth);
    setLoggedInUser("")
    console.log(auth.currentUser?.email);
  };

//renders the login page, and the login button
    return (<>
<Card
    bgcolor="warning"
    header="Login"
    body={<>
    <div hidden={userLogged}>Email address</div>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        hidden={userLogged}
        onChange={e => setLoginEmail(e.target.value)}/><br hidden={userLogged}/>
  
  <div hidden={userLogged}>Password</div>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password"
        hidden={userLogged} 
        onChange={e => setLoginPassword(e.target.value)}/><br hidden={userLogged}/>
        <div hidden={!userLogged} className="text-primary">
          Welcome To Sunset Bad Bank
        </div>
  
      <button type="submit" 
        className="btn btn-light" 
        hidden={userLogged}
        onClick={logging}>Login</button><br/>
        <button type="submit" 
        className="btn bg-danger" 
        hidden={!userLogged}
        onClick={logout}>Logout</button>         
      </>}
     />
  </>
    );
    }



