import React from 'react';
import {  Route,  Routes } from 'react-router'
import {  Outlet, BrowserRouter } from 'react-router-dom'
import { BankProvider, } from './UserContext';
import './App.css';
import NavBar from './navbar';
import Home from './Home'
import CreateAccount from './CreateAccount';
import Login from "./Login"
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Balance from './Balance';
import AllData from './AllData';
import LogOrSingIn from './LogOrSignIn';
import OpenCloseAccount from './OpenCloseAccount';




//app.js - the main component, used in the main page and all the components
function App() {



      document.body.className= "background-sunset";


  return (
    <BankProvider>
    <BrowserRouter>
      <div>
        <NavBar/>      
        <Outlet/>
          <div className="container" style={{padding: "20px"}}>
            <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/LogOrSignIn/" element={<LogOrSingIn/>} />
            <Route path="/openCloseAccount/" element={<OpenCloseAccount/>} />
            <Route path="/CreateAccount/" element={<CreateAccount/>} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/deposit/" element={<Deposit/>} />
            <Route path="/withdraw/" element={<Withdraw/>} />
            <Route path="/balance/" element={<Balance/>} />
            <Route path="/alldata/" element={<AllData/>} />
            </Routes>
          </div>

      </div>
    </BrowserRouter>
    </BankProvider>
  );
}

export default App;
