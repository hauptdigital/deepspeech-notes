import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const menuData = {
  notes: { title: 'Your notes', link: '/', color: '#123123' },
  statistics: { title: 'Statistics', link: '/statistics', color: '#123123' },
  about: { title: 'About', link: '/about', color: '#123123' },
};

const menuItems = Object.values(menuData).map((item) => {
  return (
    <Link key={item.title} to={item.link}>
      {item.title}
    </Link>
  );
});

function Menu() {
  return <MenuWrapper>{menuItems}</MenuWrapper>;
}

export default Menu;
