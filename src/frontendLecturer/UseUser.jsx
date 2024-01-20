import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
 
function getCurrentUser(accessToken) {
    const tok = jwtDecode(accessToken);
    const userID = tok.id;
    const name = tok.username;
    let admin = false;
    if(name === 'alex') {
        admin = true;
    }
    return {
        name: name,
        id: userID,
        admin: admin
    };
}
 
const initialState = {
  user: {},
  accessToken: undefined,
};
 
const UserContext = createContext(initialState);
 
export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
 
  function handleAccessTokenChange() {
    if (!user.name && accessToken) {
      localStorage.setItem('token', accessToken);
      const user = getCurrentUser(accessToken);
      setUser(user);
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('token');
      setUser({});
    }
  }
 
  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);
 
  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);