import React from 'react';
import Title from '../components/Title';
import Statistic from '../components/Statistic';

function Statistics() {
  return (
    <>
      <Title>statistics</Title>
      <Statistic title="Created notes" />
      <Statistic title="Recorded minutes" />
      <Statistic title="Number of words" />
    </>
  );
}

export default Statistics;
