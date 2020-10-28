import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
  // dynamically set the 'active' link by looking at the current URL
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === 'home'} onClick={handleItemClick} as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="login" active={activeItem === 'login'} onClick={handleItemClick} as={Link} to="/login" />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
