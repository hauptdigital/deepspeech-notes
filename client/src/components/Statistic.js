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
  const [counter, setCounter] = React.useState(0);
  const endValue = 2000;
  React.useEffect(() => {
    if (counter < endValue) {
      setCounter(counter + 1);
    }
  }, [counter]);

  return (
    <StatisticWrapper>
      <StatisticTitle>{props.title}</StatisticTitle>
      <Counter>{counter.toLocaleString('en-US')}</Counter>
    </StatisticWrapper>
  );
}

Statistic.propTypes = {
  title: PropTypes.string,
};

export default Statistic;
