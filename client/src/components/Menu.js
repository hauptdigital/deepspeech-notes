import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 0;
  right: 0;
  transition: transform 0.3s;
  z-index: 1;

  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(100%)'};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MenuLinkCard = styled.div`
  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform ${(props) => props.slideInDelay}s;
  border-radius: 25px 0 0 25px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: ${(props) => props.backgroundColor};
  z-index: ${(props) => props.stackOrder};
  margin-top: -35px;
`;

const MenuLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  padding-top: 25px;
  text-decoration: none;
  align-self: center;
`;

const menuData = {
  notes: { title: 'Your notes', link: '/', color: '#78C1D4' },
  statistics: { title: 'Statistics', link: '/statistics', color: '#029ECE' },
  about: { title: 'About', link: '/about', color: '#160F43' },
};

function Menu(props) {
  const menuItems = Object.values(menuData).map((item, index) => {
    return (
      <MenuLinkCard
        key={item.title}
        isOpen={props.menuIsOpen}
        backgroundColor={item.color}
        slideInDelay={(index + 1) * 0.3}
        stackOrder={100 - index}
      >
        <MenuLink to={item.link}>{item.title}</MenuLink>
      </MenuLinkCard>
    );
  });

  return <MenuWrapper isOpen={props.menuIsOpen}>{menuItems}</MenuWrapper>;
}

Menu.propTypes = {
  menuIsOpen: PropTypes.bool,
};

export default Menu;
