import React, { createContext, useContext, ReactNode, useState } from 'react';


interface UserContextProps {
  user: string | null;
  isAdmin: boolean | null
  setUser: (username: string | null) => void;
  setIsAdmin: (isAdmin: boolean | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false)
  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
