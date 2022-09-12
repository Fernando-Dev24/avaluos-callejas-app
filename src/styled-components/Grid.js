import styled from "styled-components";

const Grid = styled.section`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(${ (props) => props.columns > 6 ? 4 : 3 }, 1fr);
   margin: 10px 0; /* 20px */
`;

const Image = styled.img`
   width: 100%;
   height: ${( props ) => props.isResponsive ? '200px' : 'auto'};
`;

export { Grid, Image };