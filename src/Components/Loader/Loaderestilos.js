import styled, { keyframes } from 'styled-components';

const animacion = keyframes`
0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`;

export const LoaderC = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  &:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #283049;
    border-color: #283049 transparent #283049 transparent;
    animation-name: ${animacion};
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
`;
