import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as SearchIcon } from '../assets/lens.svg';
import { throttle } from 'throttle-debounce';
import noteBaseStyles from '../components/noteBaseStyles.js';

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  padding: 1rem;
`;

const SearchField = styled.input`
  ${noteBaseStyles}
  width: 100%;
  font-size: 20px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 2px solid ${(props) => props.theme.colors.light};
  border-radius: 0px;
  transition: 0.3s;

  &:hover,
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.altTwo};
    opacity: 0.4;
  }
`;

const sendSearchQuery = (searchQuery) => {
  console.log(searchQuery);
};

function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const throttledSearchQuery = useCallback(
    throttle(500, (searchQuery) => sendSearchQuery(searchQuery)),
    []
  );

  function handleSearchFieldChange(event) {
    setSearchQuery(event.target.value);
    throttledSearchQuery(event.target.value);
  }

  return (
    <SearchBarWrapper>
      <SearchIcon />
      <SearchField
        placeholder="Search..."
        onChange={handleSearchFieldChange}
        value={searchQuery}
      />
    </SearchBarWrapper>
  );
}

export default SearchBar;
