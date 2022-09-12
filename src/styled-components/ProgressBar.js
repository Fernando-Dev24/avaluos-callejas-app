import styled from "styled-components";
import { theme } from '../theme';

const ProgressBar = styled.div`
   width: 50%;
   height: 4vh;
   border-radius: 0.625rem; /* 10px */
   background: #CECECE;
`;

const Progress = styled.div`
   width: ${(props) => props.fileProgress ? `${props.fileProgress}%` : "0%"};
   display: flex;
   justify-content: center;
   align-items: center;
   height: 4vh;
   text-align: center;
   border-radius: 10px;
   color: #FFF;
   background: ${theme.success};
   p {
      font-size: 16px; /* 10px */
   }
`;

export { ProgressBar, Progress };