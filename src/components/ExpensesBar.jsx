import React from 'react';
import styled from 'styled-components';

export const ExpensesBar = ({ percentage = 0 }) => {
   return (
      <article className='bar-container'>
         <BarContainer progress={ percentage } />
         <BarLabel>
            <p
               className='classified'>
               Valúo:
               <Classified
                  isMax={ percentage >= 55 ? true : false }>
                  { percentage >= 55 ? 'Máximo' : 'Normal' }
               </Classified>
            </p>
            <Percentage>{ percentage === Infinity ? 0 : percentage }%</Percentage>
         </BarLabel>
      </article>
   );
};

const BarContainer = styled.div`
   position: relative;
   width: 100%;
   height: 1.25rem; /* 20px */
   text-align: center;
   border-radius: 40px;
   background: #D1D1D1;
   &::before {
      content: '';
      position: absolute;
      left: 0;
      width: ${({ progress = 0 }) => progress ? `${ progress > 100 ? '100%' : `${ progress }%`}` : '0%'};
      height: 20px; /* 20px */
      border-radius: 40px;
      background: ${({ progress = 0 }) => progress ? `${ progress >= 55 ? '#BA0B27' : '#019267' }` : '#000' };
   }
`;

const BarLabel = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 0.625rem; /* 10px */
   p.classified {
      display: flex;
      align-items: center;
      font-size: 1.25rem; /* 20px */
      font-weight: 600;
   }
`;

const Classified = styled.div`
   margin-left: 0.3125rem; /* 5px */
   color: ${( props ) => props.isMax === true ? '#BA0B27' : '#019267'};
`;

const Percentage = styled.div`
   font-size: 1.25rem; /* 20px */
   font-weight: 600;
`;