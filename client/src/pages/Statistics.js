import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Loading } from '../assets/loading.svg';
import Container from '../components/Container';
import Title from '../components/Title';
import Statistic from '../components/Statistic';
import { getStatistics } from '../api/notes';

const PageTitle = styled(Title)`
  max-width: 600px;
`;

function Statistics() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [statistics, setStatistics] = React.useState({
    noteCount: 0,
    numberOfWords: 0,
    audioLength: 0,
  });

  React.useEffect(() => {
    getStatistics().then((result) => {
      setStatistics(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <PageTitle>statistics</PageTitle>
      {isLoading ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        <>
          <Statistic title="Created notes" value={statistics.noteCount} />
          <Statistic
            title="Recorded minutes"
            value={statistics.audioLength}
            unit="minutes"
          />
          <Statistic title="Number of words" value={statistics.numberOfWords} />
        </>
      )}
    </>
  );
}

export default Statistics;
