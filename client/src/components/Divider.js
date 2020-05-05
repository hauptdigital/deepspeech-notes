import styled from '@emotion/styled';

const Divider = styled.div`
  display: block;
  width: 90px;
  height: 2px;
  background: ${(props) => props.theme.colors.altOne};
  margin: 5px 10px;
`;

export default Divider;
