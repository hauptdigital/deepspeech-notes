import React from 'react';
import { ReactComponent as BackIcon } from '../assets/back.svg';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const BackArrow = styled(BackIcon)`
  margin: 6px;
  cursor: pointer;
`;

function BackLink() {
  return (
    <Link to="/">
      <BackArrow />
    </Link>
  );
}

export default BackLink;
