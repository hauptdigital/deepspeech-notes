import React from 'react';
import styled from '@emotion/styled';
import Menu from './Menu';
import { ReactComponent as Logo } from '../assets/logo.svg';
import MenuIcon from './MenuIcon';

const Navigation = styled.header`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  function handleMenuIconClick() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <Navigation>
      <Logo />
      <MenuIcon onMenuIconClick={handleMenuIconClick} menuIsOpen={menuIsOpen} />
      <Menu menuIsOpen={menuIsOpen} />
    </Navigation>
  );
}

export default Header;
