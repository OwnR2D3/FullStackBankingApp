import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged, } from './fireabase-config';
import { signOut } from 'firebase/auth';
import { useBankContext } from "./UserContext";




// navbar.js - navbar component, used in the main page
export default function NavBar(){
  const { bank, setLoggedInUser, setAccountOpened } = useBankContext();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [url, setUrl] = useState("");
  const [userLogged, setUserLogged] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);


  

// useEffect to get the user logged in
  useEffect(() => {
    const refreshUser = bank.loggedInUser;
    if(refreshUser){
      setUserLogged(true);
      console.log(bank.loggedInUser);
    } else setUserLogged(false);
    return console.log("updated user")

  });
// navigate to the main page once the user is logged out, and set the user logged in to false
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }


//log out the user, and set the user logged in to false

  const logout = async () => {
    console.log(bank.loggedInUser);
    const user = await signOut(auth);
    setLoggedInUser("")
    console.log(bank.loggedInUser);
  };
// if the user is logged in, show the logout button, otherwise show the login button
  function update(user) {
    console.log(bank.loggedInUser);
  }
  console.log('current URL 👉️', window.location.href);




    return(<>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand titleLazer84" to="/"> Sunset BadBank</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div><h5></h5></div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          {/* <li className="nav-item">
              <Link className="nav-link" to="/LogOrSignIn/" onClick={update} hidden={userLogged ? true : false}>Log or Sign In</Link>
            </li>  */}
            <li className="nav-item">
              <Link className="nav-link" to="/CreateAccount/" >Create Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login/">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/openCloseAccount/" hidden={userLogged ? false : true}>Open or Close Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Deposit/" hidden={userLogged ? false : true}>Deposit</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Withdraw/" hidden={userLogged ? false : true}>Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Balance/" hidden={userLogged ? false : true}>Balance</Link>
            </li>   
            <li className="nav-item">
              <h6 className="nav-link">{bank.loggedInUser}</h6>
              </li>   
              <li className="nav-item">
              <button className="nav-link" to="/" onClick={() => {
                logout();
                routeChange()
                }} hidden={userLogged ? false : true}>Logout</button>
            </li>       
          </ul>
        </div>
      </nav>

      
      </>
    );
  }
