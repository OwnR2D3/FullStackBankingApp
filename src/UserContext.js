import {
    createContext,
    useContext,
    useState,
  } from "react";
  // createContext is a function that creates a context object.
  const BankContext = createContext();

  // useContext is a function that returns the current context value.
  export const useBankContext = () => useContext(BankContext);

  // bankProvider is a function that returns a component that provides the context value.
  export const BankProvider = ({ children }) => {
    const [bank, setBank] = useState({
      loggedInUser: null,
      balance: null,
      accountOpened: false,

    });
  
  // setLoggedInUser is a function that sets the loggedInUser property of the bank object.
    const setLoggedInUser = (username) => {
      setBank({
        ...bank,
        loggedInUser: username,
      });
    }
  //setBalance is a function that sets the balance property of the bank object.
    const setBalance = (balance) => {
      setBank({
        ...bank,
        balance: balance,
      });
    }
// not used yet, but will be used to set the accountOpened property of the bank object.
    const setAccountOpened = (accountOpened) => {
      setBank({
        ...bank,
        accountOpened: false,
      });
    }

  // BankContext is a function that returns the context object.
    return (
      <BankContext.Provider value={{
        bank,
        setLoggedInUser,
        setBalance,
        setAccountOpened,
      }}>
        {children}
      </BankContext.Provider>
    );
  }
  