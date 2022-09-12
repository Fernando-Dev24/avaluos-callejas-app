import React, { useState, useEffect } from 'react';
/* hooks */
import { useAuth } from '../contexts/AuthContext';
/* helpers */
import { formatDateId, formatWithoutTime } from '../helpers/formatDate';
import { v4 as uuidv4 } from 'uuid';
/* styled components */
import { Grid, Image } from '../styled-components/Grid';
/* assets */
import logoLowOpacity from '../assets/logo-low-opacity.png';
import logo from '../assets/logo-original.svg';

export const GenerateCompressionsReport = ({ targetAvaluo, images, isResponsive }) => {
   /* hooks */
   const { user: { uid } } = useAuth();
   const userId = uid.slice(0, 3);

   /* props */
   const { plate, modified, fuel, cylindersCondition } = targetAvaluo;
   const { cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6, cylinder7, cylinder8 } = cylindersCondition;
   const { engineTarget, engineCar, chasisTarget, chasisCar, vinTarget, vinCar, numbersReason } = targetAvaluo


   /* states */
   const [alertDetails, setAlertDetails] = useState({
      state: false,
      content: undefined
   });

   /* functions */
   const uniqueDocId = `AC${ formatDateId(modified) }${ plate }${ userId }`;

   /* Effect to validate numbers */
   /* Vehicle numbers validations - level basic */
   useEffect(() => {
      if( numbersReason !== '' && numbersReason !== undefined ) {
         setAlertDetails({ state: true, content: `ALERTA: ${ numbersReason }` });
      } else if( engineCar !== engineTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE MOTOR NO COINCIDEN' });
      } else if ( chasisCar !== chasisTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE CHASIS NO COINCIDEN' });
      } else if ( vinCar !== vinTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE VIN NO COINCIDEN' });
      }
   }, [chasisCar, chasisTarget, engineCar, engineTarget, vinCar, vinTarget]);

   return (
      <section className='pdf-container avaluo-page'>
         <figure className="background-logo compressions-logo">
            <img src={logoLowOpacity} alt="Avaluo Logo" />
         </figure>
         <header className="page-header">
            <figure className="logo">
               <img src={ logo } alt="logo" />
            </figure>
            <section className="header__content">
               <p>CALLEJAS & ASOCIADOS; EMPRESA ACREDITADA POR SUPERINTENDENCIA DEL SISTEMA FINANCIERO EN CATEGORIA DE <u>BIENES MUEBLES EN GENERAL</u> CON NUMERO DE INSCRIPCION PV00122020 - { uniqueDocId }</p>
               <p className='important'>Exija documento original / validez 30 días / ver notas al reverso</p>
            </section>
         </header>

         <section className="vehicle-data compressions-data">
            <header className='car-header'>
               <p>DATOS GENERALES</p>
               <p>PAGINA 1-1</p>
               {/* <p className='serial'>{ uniqueDocId }</p> */}
            </header>
            <section className="car-data">
               <table className='car-info-table'>
                  <tbody>
                     <tr className='car-table-row'>
                        <td className='bigger-cell'><strong>PLACA / PÓLIZA</strong></td>
                        <td colSpan={3} className="data bigger-cell">
                           <strong>{ targetAvaluo.plate }</strong>
                        </td>
                        <td><strong>PLACA FRONTAL</strong></td>
                        <td className={ targetAvaluo.frontalSticker !== 'TIENE'
                           ? 'data warning'
                           : 'data'
                        }>{ targetAvaluo.frontalSticker }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>FECHA</strong></td>
                        <td colSpan={3} className="data">SAN SALVADOR, { formatWithoutTime(targetAvaluo.created) }</td>
                        <td><strong>PLACA TRASERA</strong></td>
                        <td className={ targetAvaluo.rearSticker !== 'TIENE'
                           ? 'data warning'
                           : 'data'
                        }>{ targetAvaluo.rearSticker }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>SOLICITANTE</strong></td>
                        <td colSpan={3} className="data">{ targetAvaluo.applicant }</td>
                        <td><strong>PLACA PARABRISAS</strong></td>
                        <td className={ targetAvaluo.thirdSticker !== 'TIENE'
                           ? 'data warning'
                           : 'data'
                        }>{ targetAvaluo.thirdSticker }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>PROPIETARIO</strong></td>
                        <td colSpan={2} className="data">{ targetAvaluo.costumer }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>MARCA</strong></td>
                        <td className='data'>{ targetAvaluo.brand }</td>
                        <td><strong>PROCEDENCIA</strong></td>
                        <td className='data'>{ targetAvaluo.from }</td>
                        <td><strong>TRANSMISIÓN</strong></td>
                        <td className='data'>{ targetAvaluo.transmission }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>MODELO</strong></td>
                        <td className='data'>{ targetAvaluo.model }</td>
                        <td><strong>ODÓMETRO</strong></td>
                        <td className='data'>{ targetAvaluo.odometer }</td>
                        <td><strong>TRACCIÓN</strong></td>
                        <td className='data'>{ targetAvaluo.traction }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>TIPO</strong></td>
                        <td className='data'>{ targetAvaluo.carType }</td>
                        <td><strong>COMBUSTIBLE</strong></td>
                        <td className='data'>{ targetAvaluo.fuel }</td>
                        <td><strong>CAPACIDAD</strong></td>
                        <td className='data'>{ targetAvaluo.capacity }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>AÑO</strong></td>
                        <td className='data'>{ targetAvaluo.year }</td>
                        <td><strong>CILINDROS</strong></td>
                        <td className='data'>{ targetAvaluo.cylinders }</td>
                        <td><strong>RODAJE</strong></td>
                        <td className='data'>{ targetAvaluo.runningIn }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>COLOR</strong></td>
                        <td className='data'>{ targetAvaluo.color }</td>
                        <td><strong>CILINDRADA</strong></td>
                        <td className='data'>{ targetAvaluo.cylindersProm }</td>
                     </tr>
                     <tr className='car-table-row'>
                        <td><strong>ORIGEN</strong></td>
                        <td className='data'>{ targetAvaluo.origin }</td>
                        <td><strong>TARJETA VENCE</strong></td>
                        <td className='data'>{ targetAvaluo.targetOutDated }</td>
                        <td><strong>EN CALIDAD DE</strong></td>
                        <td className='data'>{ targetAvaluo.targetAs }</td>
                     </tr>
                  </tbody>
               </table>
            </section>
            <section className="car-techniques-data">
               <section className='compressions'>
                  <p><strong>LECTURA DE COMPRESIÓN A MOTOR POR MEDIO DE COMPRESÍMETRO</strong></p>
                  <section className="compressions-grid">
                     <p>
                        <strong>CILINDRO 1:</strong>
                        <span className={ (cylinder1.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder1.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder1.trim() < '300' ? 'important' : undefined ) }>{ cylinder1.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 2:</strong>
                        <span className={ (cylinder2.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder2.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder2.trim() < '300' ? 'important' : undefined ) }>{ cylinder2.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 3:</strong>
                        <span className={ (cylinder3.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder3.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder3.trim() < '300' ? 'important' : undefined ) }>{ cylinder3.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 4:</strong>
                        <span className={ (cylinder4.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder4.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder4.trim() < '300' ? 'important' : undefined ) }>{ cylinder4.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 5:</strong>
                        <span className={ (cylinder5.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder5.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder5.trim() < '300' ? 'important' : undefined ) }>{ cylinder5.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 6:</strong>
                        <span className={ (cylinder6.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder6.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder6.trim() < '300' ? 'important' : undefined ) }>{ cylinder6.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 7:</strong>
                        <span className={ (cylinder7.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder7.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder7.trim() < '300' ? 'important' : undefined ) }>{ cylinder7.trim() }</span>
                     </p>
                     <p>
                        <strong>CILINDRO 8:</strong>
                        <span className={ (cylinder8.trim() === 'NO MEDIDA' ? 'important' : undefined) || ( fuel === 'GASOLINA' && cylinder8.trim() < '125' ? 'important' : undefined ) || ( fuel === 'DIESEL' && cylinder8.trim() < '300' ? 'important' : undefined ) }>{ cylinder8.trim() }</span>
                     </p>
                  </section>
                  { targetAvaluo.cylindersReason === '' ?
                     <div className='compressions-reason-empty'>
                        <p>MOTIVO POR EL QUE NO SE MIDIERON COMPRESIONES A MOTOR</p>
                        <p>
                           { targetAvaluo.cylindersReason }
                        </p>
                     </div>
                     :
                     <div className='compressions-reason'>
                        <p>
                           { targetAvaluo.cylindersReason }
                        </p>
                     </div>
                  }
               </section>
               <section className='car-numbers'>
                  <article>
                     <p><strong>NÚMERO DE MOTOR EN VEHÍCULO</strong></p>
                     <p className={
                        engineTarget !== engineCar
                        ? 'different'
                        : undefined
                     }>{ engineCar }</p>
                  </article>
                  <article>
                     <p><strong>NÚMERO DE CHASIS EN VEHÍCULO</strong></p>
                     <p className={
                        chasisCar !== chasisTarget
                        ? 'different'
                        : undefined
                     }>{ chasisCar }</p>
                  </article>
                  <article>
                     <p><strong>NÚMERO DE VIN EN VEHÍCULO</strong></p>
                     <p className={
                        vinCar !== vinTarget
                        ? 'different'
                        : undefined
                     }>{ vinCar }</p>
                  </article>
                  <article>
                     <p><strong>NÚMERO DE MOTOR EN TARJETA</strong></p>
                     <p className={
                        engineCar !== engineTarget
                        ? 'different'
                        : undefined
                     }>{ engineTarget }</p>
                  </article>
                  <article>
                     <p><strong>NÚMERO DE CHASIS EN TARJETA</strong></p>
                     <p className={
                        chasisCar !== chasisTarget
                        ? 'different'
                        : undefined
                     }>{ chasisTarget }</p>
                  </article>
                  <article>
                     <p><strong>NÚMERO DE VIN EN TARJETA</strong></p>
                     <p className={
                        vinCar !== vinTarget
                        ? 'different'
                        : undefined
                     }>{ vinTarget }</p>
                  </article>
               </section>

               { alertDetails.state === true &&
                  <section className="seals">
                     <article className="seals-grid">
                        <div className="seal">
                           { alertDetails.content }
                        </div>
                     </article>
                  </section>
               }
            </section>
            <Grid
               columns={ images.length }>
               { images.length > 0 &&
                  images.map((image) => (
                     <Image
                        key={ uuidv4() }
                        isResponsive={ isResponsive }
                        src={ image }
                        alt="Fotografía de compresiones"
                     />
                  ))
               }
            </Grid>
         </section>
      </section>
   );
};