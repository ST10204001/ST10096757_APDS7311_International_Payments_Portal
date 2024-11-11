import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, balance, setBalance, transactions, setTransactions }}>
      {children}
    </UserContext.Provider>
  );
};
