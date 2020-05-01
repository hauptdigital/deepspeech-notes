import styled from '@emotion/styled';

const Divider = styled.div`
  display: block;
  width: 90px;
  height: 2px;
  background: ${(props) => props.theme.colors.altOne};
  margin: 1rem;
`;

export default Divider;
