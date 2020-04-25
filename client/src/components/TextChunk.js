import styled from '@emotion/styled';

const TextChunk = styled.span`
  ${(props) => (props.isNew ? '' : 'opacity: 0.5;')}
  /* fadeIn animation */

  &.fadeIn-enter,
  &.fadeIn-appear {
    opacity: 0.01;
    position: relative;
    bottom: 20px;
  }

  &.fadeIn-enter-active,
  &.fadeIn-appear-active {
    opacity: 1;
    transition: all 300ms ease-in;
    position: relative;
    bottom: 0px;
  }
`;

export default TextChunk;
