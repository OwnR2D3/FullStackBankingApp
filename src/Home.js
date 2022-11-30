import Card from "./Context";
import React from "react";
import BankImage from "./Images/Sunset1.jpg";



// home card component.
function Home(){
    return (<>
      <Card 
        txtcolor="black"
        header="Andres Jose Sunset BadBank Home Page"
        title="Welcome to the bank"
        text={<><p>You can move around using the navigation bar.</p>
          <p>You can also create a new account, or login to an existing one.</p>
          <p>Open a checking account, Deposit and Withdraw!</p>
          </>}
        body={<img src={BankImage} className="img-fluid" alt="Responsive image"></img>}
        />
    </>
    );  
  }
  
  export default Home;