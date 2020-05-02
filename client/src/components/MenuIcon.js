import React from 'react';
import styled from '@emotion/styled';

const MenuBar = styled.div`
  width: 40px;
  height: 3px;
  background-color: ${(props) => props.theme.colors.altTwo};
  transition: 0.5s;
`;

const MenuBarOne = styled(MenuBar)`
  ${(props) =>
    props.menuIsActive
      ? 'transform: rotate(-45deg) translate(-19px, 7px);width: 56.6px;'
      : ''}
`;

const MenuBarTwo = styled(MenuBar)`
  ${(props) => (props.menuIsActive ? 'opacity: 0;' : '')}
`;

const MenuBarThree = styled(MenuBar)`
  ${(props) =>
    props.menuIsActive
      ? 'transform: rotate(45deg) translate(-19px, -7px);width: 56.6px;'
      : ''}
`;

const MenuIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

function MenuIcon() {
  const [menuIsActive, setMenuIsActive] = React.useState(false);

  function handleMenuIconWrapperClick() {
    setMenuIsActive(!menuIsActive);
  }

  return (
    <MenuIconWrapper
      onClick={handleMenuIconWrapperClick}
      menuIsActive={menuIsActive}
    >
      <MenuBarOne menuIsActive={menuIsActive} />
      <MenuBarTwo menuIsActive={menuIsActive} />
      <MenuBarThree menuIsActive={menuIsActive} />
    </MenuIconWrapper>
  );
}

export default MenuIcon;
