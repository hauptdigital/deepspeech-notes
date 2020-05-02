import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const MenuBar = styled.div`
  width: 40px;
  height: 3px;
  background-color: ${(props) => props.theme.colors.altTwo};
  transition: 0.5s;
`;

const MenuBarOne = styled(MenuBar)`
  ${(props) =>
    props.menuIsOpen
      ? 'transform: rotate(45deg) translate(7px, 19px);width: 56.6px;'
      : ''}
`;

const MenuBarTwo = styled(MenuBar)`
  ${(props) =>
    props.menuIsOpen ? 'transform: translate(-19px, 0px);opacity: 0;' : ''}
`;

const MenuBarThree = styled(MenuBar)`
  ${(props) =>
    props.menuIsOpen
      ? 'transform: rotate(-45deg) translate(7px, -19px);width: 56.6px;'
      : ''}
`;

const MenuIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 2000;
`;

function MenuIcon(props) {
  return (
    <MenuIconWrapper
      onClick={props.onMenuIconClick}
      menuIsOpen={props.menuIsOpen}
    >
      <MenuBarOne menuIsOpen={props.menuIsOpen} />
      <MenuBarTwo menuIsOpen={props.menuIsOpen} />
      <MenuBarThree menuIsOpen={props.menuIsOpen} />
    </MenuIconWrapper>
  );
}

MenuIcon.propTypes = {
  menuIsOpen: PropTypes.bool,
  onMenuIconClick: PropTypes.func,
};

export default MenuIcon;
