/* ⚛ REACT */
import React, { createContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState({
    isOpen: true,
  });

  const switchMenu = () => {
    setMenu({ isOpen: !menu.isOpen});
  };

  return (
    <MenuContext.Provider value={{ menu, switchMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };