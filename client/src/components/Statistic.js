import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SubTitle from './SubTitle';
import Title from './Title';

const StatisticWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #b9cdcc;
`;

const StatisticTitle = styled(SubTitle)`
  margin: 1rem 0 0 0;
`;

const Counter = styled(Title)`
  margin: 1rem 0;
`;

function Statistic(props) {
  return (
    <StatisticWrapper>
      <StatisticTitle>{props.title}</StatisticTitle>
      <Counter>13</Counter>
    </StatisticWrapper>
  );
}

Statistic.propTypes = {
  title: PropTypes.string,
};

export default Statistic;
