import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);

  return (
    <UserContext.Provider value={{ utilisateur, setUtilisateur }}>
      {children}
    </UserContext.Provider>
  );
};
