import styled from '@emotion/styled';

const TextChunk = styled.span`
  ${(props) => (props.isNew ? '' : 'opacity: 0.5;')}
`;

export default TextChunk;
