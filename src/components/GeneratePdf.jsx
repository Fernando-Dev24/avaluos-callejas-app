import React, { useState, useEffect } from 'react';
/* hooks */
import { useAuth } from '../contexts/AuthContext';
/* helpers */
import { formatWithoutTime, formatDateId } from '../helpers/formatDate';
import numbro from 'numbro';
import { format } from 'date-fns';
import { numberToString } from '../helpers/numberToString';
/* assets */
import logoLowOpacity from '../assets/logo-low-opacity.png';
import logo from '../assets/logo-original.svg';
import facebookLogo from '../assets/facebook-logo.svg';
import instagramLogo from '../assets/instagram-logo.svg';
import internetLogo from '../assets/internet-icon.svg';

export const GeneratePdf = ({ exportValues, targetAvaluo, isResponsive }) => {
   /* props */
   const { avaluoType, cylindersCondition, expenses, pages, numbersReason, plate, modified, fuel, expensesPercentage } = targetAvaluo.content;
   const { cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6, cylinder7, cylinder8 } = cylindersCondition;
   const { engineTarget, engineCar, chasisTarget, chasisCar, vinTarget, vinCar } = targetAvaluo.content;
   const { carValue } = exportValues;

   /* hooks */
   const { user: { uid } } = useAuth();
   const userId = uid.slice(0, 3);

   const uniqueDocId = `AC${ formatDateId(modified) }${ plate }${ userId }`;

   /* states */
   const [alertDetails, setAlertDetails] = useState({
      state: false,
      content: undefined
   });

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

   /* Vehicle numbers validations - level medium */
   useEffect(() => {
      if( numbersReason !== '' && numbersReason !== undefined ) {
         setAlertDetails({ state: true, content: `ALERTA: ${ numbersReason }` });
      } else if( engineCar !== engineTarget && chasisCar !== chasisTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE MOTOR Y CHASIS NO COINCIDEN' });
      } else if( engineCar !== engineTarget && vinCar !== vinTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE MOTOR Y VIN NO COINCIDEN' });
      } else if( chasisCar !== chasisTarget && engineCar !== engineTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE CHASIS Y MOTOR NO COINCIDEN' });
      } else if ( chasisCar !== chasisTarget && vinTarget !== vinCar ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE CHASIS Y VIN NO COINCIDEN' });
      } else if( vinCar !== vinTarget && engineCar !== engineTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE VIN Y MOTOR NO COINCIDEN' });
      } else if( vinCar !== vinTarget && chasisCar !== chasisTarget ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE VIN NO COINCIDEN' });
      };
   }, [chasisCar, chasisTarget, engineCar, engineTarget, vinCar, vinTarget]);

   useEffect(() => {
      if( numbersReason !== '' && numbersReason !== undefined ) {
         setAlertDetails({ state: true, content: `ALERTA: ${ numbersReason }` });
      } else if( (engineCar !== engineTarget) && (chasisCar !== chasisTarget) && (vinCar !== vinTarget) ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE MOTOR, CHASIS, Y VIN NO COINCIDEN' });
      } else if( (chasisCar !== chasisTarget) && (engineCar !== engineTarget) && (vinCar !== vinTarget) ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE CHASIS, MOTOR, Y VIN NO COINCIDEN' });
      } else if( (vinCar !== vinTarget) && (engineCar !== engineTarget) && (chasisCar !== chasisTarget) ) {
         setAlertDetails({ state: true, content: 'ALERTA: NÚMEROS DE VIN, MOTOR, Y CHASIS NO COINCIDEN' });
      }
   }, [chasisCar, chasisTarget, engineCar, engineTarget, vinCar, vinTarget]);

   return (
      <>
         <section className="pdf-container avaluo-page">
            <figure className="background-logo">
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

            <section className="vehicle-data">
               <header className='car-header'>
                  <p>DATOS GENERALES</p>
                  <p>PAGINA 1-{ pages }</p>
                  <p className='serial'>{ uniqueDocId }</p>
               </header>
               { (avaluoType === 'CREDIQ / GRUPOQ - RECUPERADO' || avaluoType === 'AUTOFACIL')
                  &&
                  <p className='crediq-recuperado'>LA PRESENTE INFORMACIÓN ES DE USO INTERNO Y EXCLUSIVO DE { avaluoType === 'CREDIQ / GRUPOQ - RECUPERADO' ? 'GRUPO Q / CREDI Q' : 'AUTOFACIL, S.A DE C.V' } EN CASO DE SER PRESENTADA A OTRA INSTITUCIÓN, DEBERÁ PRESENTARSE EN FORMATO ORIGINAL DEBIDAMENTE FIRMADO Y SELLADO</p>
               }
               <section className='car-data'>
                  <table className="car-info-table">
                     <tbody>
                        <tr className='car-table-row'>
                           <td className='bigger-cell'><strong>PLACA / PÓLIZA</strong></td>
                           <td colSpan={3} className='data bigger-cell'><strong>{ targetAvaluo.content.plate }</strong></td>
                           <td><strong>PLACA FRONTAL</strong></td>
                           <td className={ targetAvaluo.content.frontalSticker !== 'TIENE'
                              ? 'data warning'
                              : 'data'
                           }>
                              { targetAvaluo.content.frontalSticker }
                           </td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>FECHA</strong></td>
                           <td colSpan={3} className='data'>SAN SALVADOR, { formatWithoutTime(targetAvaluo.content.created) }</td>
                           <td><strong>PLACA TRASERA</strong></td>
                           <td className={ targetAvaluo.content.rearSticker !== 'TIENE'
                              ? 'data warning'
                              : 'data'
                           }>
                              { targetAvaluo.content.rearSticker }
                           </td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>SOLICITANTE</strong></td>
                           <td colSpan={3} className='data'>{ targetAvaluo.content.applicant }</td>
                           <td><strong>PLACA PARABRISAS</strong></td>
                           <td className={ targetAvaluo.content.thirdSticker !== 'TIENE'
                              ? 'data warning'
                              : 'data'
                           }>
                              { targetAvaluo.content.thirdSticker }
                           </td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>PROPIETARIO</strong></td>
                           <td colSpan={3} className='data'>{ targetAvaluo.content.costumer }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>MARCA</strong></td>
                           <td className='data'>{ targetAvaluo.content.brand }</td>
                           <td><strong>PROCEDENCIA</strong></td>
                           <td className='data'>{ targetAvaluo.content.from }</td>
                           <td><strong>TRANSMISIÓN</strong></td>
                           <td className='data'>{ targetAvaluo.content.transmission }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>MODELO</strong></td>
                           <td className='data'>{ targetAvaluo.content.model }</td>
                           <td><strong>ODÓMETRO</strong></td>
                           <td className='data'>{ targetAvaluo.content.odometer }</td>
                           <td><strong>TRACCIÓN</strong></td>
                           <td className='data'>{ targetAvaluo.content.traction }</td>
                        </tr>
                        <tr className="car-table-row">
                           <td><strong>TIPO</strong></td>
                           <td className='data'>{ targetAvaluo.content.carType }</td>
                           <td><strong>COMBUSTIBLE</strong></td>
                           <td className='data'>{ targetAvaluo.content.fuel }</td>
                           <td><strong>CAPACIDAD</strong></td>
                           <td className='data'>{ targetAvaluo.content.capacity }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>AÑO</strong></td>
                           <td className='data'>{ targetAvaluo.content.year }</td>
                           <td><strong>CILINDROS</strong></td>
                           <td className='data'>{ targetAvaluo.content.cylinders }</td>
                           <td><strong>RODAJE</strong></td>
                           <td className='data'>{ targetAvaluo.content.runningIn }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>COLOR</strong></td>
                           <td className='data'>{ targetAvaluo.content.color }</td>
                           <td><strong>CILINDRADA</strong></td>
                           <td className='data'>{ targetAvaluo.content.cylindersProm }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>ORIGEN</strong></td>
                           <td className='data'>{ targetAvaluo.content.origin }</td>
                           <td><strong>TARJETA VENCE</strong></td>
                           <td className={
                              targetAvaluo.content.targetOutDated < format(new Date(), 'yyyy-LL')
                              ? 'data date-expired'
                              : 'data'
                           }> { targetAvaluo.content.targetAs.trim() === 'SIN TARJETA DE CIRCULACION'
                                 ? 'SIN TARJETA DE CIRCULACION'
                                 : targetAvaluo.content.targetOutDated < format(new Date(), 'yyyy-LL')
                                   ? `${ targetAvaluo.content.targetOutDated } **`
                                   : targetAvaluo.content.targetOutDated
                              }
                           </td>
                           <td><strong>EN CALIDAD DE</strong></td>
                           <td className='data'>{ targetAvaluo.content.targetAs }</td>
                        </tr>
                     </tbody>
                  </table>
                  <article className="extras">
                     <p><strong>EXTRAS</strong></p>
                     <p>{ targetAvaluo.content.extras }</p>
                  </article>
               </section>

               <section className='car-techniques-data'>
                  <p>DATOS TÉCNICOS DEL VEHÍCULO</p>
                  <table className="techniques-table">
                     <tbody>
                        <tr className="car-table-row">
                           <td><strong>POTENCIA</strong></td>
                           <td>{ targetAvaluo.content.power }</td>
                           <td><strong>PILOTO CHECK ENGINE</strong></td>
                           <td>{ targetAvaluo.content.checkEnginePilot }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>COLOR DE HUMO</strong></td>
                           <td>{ targetAvaluo.content.smoke }</td>
                           <td><strong>PILOTO ABS</strong></td>
                           <td>{ targetAvaluo.content.absPilot }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>COMBUSTIÓN</strong></td>
                           <td>{ targetAvaluo.content.combustion }</td>
                           <td><strong>PILOTO AIRBAG</strong></td>
                           <td>{ targetAvaluo.content.airbagPilot }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>TEMPERATURA</strong></td>
                           <td>{ targetAvaluo.content.temperature }</td>
                           <td><strong>PILOTO TPMS</strong></td>
                           <td>{ targetAvaluo.content.tpmsPilot }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>MARCHA DE MOTOR</strong></td>
                           <td>{ targetAvaluo.content.engineRunning }</td>
                           <td><strong>PILOTO DE ACEITE</strong></td>
                           <td>{ targetAvaluo.content.oilPilot }</td>
                        </tr>
                        <tr className='car-table-row'>
                           <td><strong>SOPLO EN MOTOR</strong></td>
                           <td>{ targetAvaluo.content.engineBlowing }</td>
                           <td><strong>PILOTO BATERÍA</strong></td>
                           <td>{ targetAvaluo.content.batteryPilot }</td>
                        </tr>
                     </tbody>
                  </table>

                  <section className="tires-tools-grid">
                     <article>
                        <p><strong>LLANTAS DELANTERAS</strong></p>
                        <p>{ targetAvaluo.content.frontTires }</p>
                     </article>
                     <article>
                        <p><strong>LLANTAS TRASERAS</strong></p>
                        <p>{ targetAvaluo.content.rearTires }</p>
                     </article>
                     <article>
                        <p><strong>LLANTA DE REPUESTO</strong></p>
                        <p>{ targetAvaluo.content.replacementTire }</p>
                     </article>
                     <article>
                        <p><strong>PORTA LLANTA</strong></p>
                        <p>{ targetAvaluo.content.tireCarrier }</p>
                     </article>
                     <article>
                        <p><strong>HERRAMIENTAS</strong></p>
                        <p>{ targetAvaluo.content.tools }</p>
                     </article>
                     <article>
                        <p><strong>TABLERO</strong></p>
                        <p>{ targetAvaluo.content.board }</p>
                     </article>
                  </section>

                  <section className="two-columns-modified">
                     <article className='first-column'>
                        <article>
                           <p><strong>CONDICIÓN DE CHASIS Y PUENTE DE SUSPENSIÓN</strong></p>
                           <p>{ targetAvaluo.content.chasisCondition }</p>
                        </article>
                        <article>
                           <p><strong>FUNCIONAMIENTO DEL SISTEMA DE AIRE ACONDICIONADO</strong></p>
                           <p>{ targetAvaluo.content.acCondition }</p>
                        </article>
                     </article>
                     <article className="second-column">
                        <article>
                           <p><strong>TEST DE MEDICIÓN DE BATERÍA</strong></p>
                           <p>{ targetAvaluo.content.batteryTest }</p>
                        </article>
                        <article>
                           <p><strong>VACUÓMETRO</strong></p>
                           <p>{ targetAvaluo.content.vacuumGauge }</p>
                        </article>
                     </article>
                  </section>

                  <section className="compressions">
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
                     { targetAvaluo.content.cylindersReason === '' ?
                        <div className='compressions-reason-empty'>
                           <p>MOTIVO POR EL QUE NO SE MIDIERON COMPRESIONES A MOTOR</p>
                           <p>
                              { targetAvaluo.content.cylindersReason }
                           </p>
                        </div>
                        :
                        <div className='compressions-reason'>
                           <p>
                              { targetAvaluo.content.cylindersReason }
                           </p>
                        </div>
                     }
                  </section>

                  <section className='car-numbers'>
                     <article>
                        <p><strong>NÚMERO DE MOTOR EN VEHÍCULO</strong></p>
                        <p className={
                           (engineCar !== engineTarget) || (engineCar.includes('NO VISTO')) || (engineTarget.includes('NO VISTO'))
                           ? 'different'
                           : undefined
                        }>{ engineCar }</p>
                     </article>
                     <article>
                        <p><strong>NÚMERO DE CHASIS EN VEHÍCULO</strong></p>
                        <p className={
                           (chasisCar !== chasisTarget) || (chasisCar.includes('NO VISTO')) || (chasisTarget.includes('NO VISTO'))
                           ? 'different'
                           : undefined
                        }>{ chasisCar }</p>
                     </article>
                     <article>
                        <p><strong>NÚMERO DE VIN EN VEHÍCULO</strong></p>
                        <p className={
                           (vinCar !== vinTarget) || (vinCar.includes('NO VISTO')) || (vinTarget.includes('NO VISTO'))
                           ? 'different'
                           : undefined
                        }>{ vinCar }</p>
                     </article>
                     <article>
                        <p><strong>NÚMERO DE MOTOR EN TARJETA</strong></p>
                        <p className={
                           (engineCar !== engineTarget) || (engineCar.includes('NO VISTO')) || (engineTarget.includes('NO VISTO'))
                           ? 'different'
                           : undefined
                        }>{ engineTarget }</p>
                     </article>
                     <article>
                        <p><strong>NÚMERO DE CHASIS EN TARJETA</strong></p>
                        <p className={
                           (chasisCar !== chasisTarget) || (chasisCar.includes('NO VISTO')) || (chasisTarget.includes('NO VISTO'))
                           ? 'different'
                           : undefined
                        }>{ chasisTarget }</p>
                     </article>
                     <article>
                        <p><strong>NÚMERO DE VIN EN TARJETA</strong></p>
                        <p className={
                           (vinCar !== vinTarget) || (vinCar.includes('NO VISTO')) || (vinTarget.includes('NO VISTO'))
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

               <footer className="page-footer">
                  <hr />
                  <section className="social__media-grid">
                     <figure className='social-media'>
                        <img src={ facebookLogo } alt="facebook logo" />
                        <figcaption>Avalúos Calleja's El Salvador</figcaption>
                     </figure>
                     <figure className='social-media'>
                        <img src={ instagramLogo } alt="instagram logo" />
                        <figcaption>@avaluos_callejas</figcaption>
                     </figure>
                     <figure className='social-media'>
                        <img src={ internetLogo } alt="internet logo" />
                        <figcaption>www.avaluoscallejas.com</figcaption>
                     </figure>
                  </section>
                  <section className="contact">
                     <article className="contact-article">
                        <p>San Salvador 2520-5942</p>
                     </article>
                     <article className="contact-article">
                        <p>San Miguel 2684 9177</p>
                     </article>
                  </section>
               </footer>
            </section>
         </section>

         { pages > '1' && pages >= '2' &&
            <>
               { pages > '1' && pages > '2' && pages === "3" ?
                  <section className="pdf-container avaluo-page">
                     <figure className='background-logo'>
                        <img src={ logoLowOpacity } alt="logo with low opacity" />
                     </figure>
                     <header className="page-header">
                        <figure className="logo">
                           <img src={ logo } alt="logo" />
                        </figure>
                        <section className="header__content">
                           <p>Callejas & Asociados; Empresa acreditada por superintendencia del sistema financiero en categoria de <u>bienes muebles en general</u> con numero de inscripcion PV00122020 - { uniqueDocId }</p>
                           <p className='important'>Exija documento original / validez 30 días / ver notas al reverso</p>
                        </section>
                     </header>
      
                     <section className="car-expenses">
                        <header className='car-header'>
                           <p>INFORME DE DIAGNÓSTICO MECÁNICO - AVALÚO COMERCIAL</p>
                           <p>PAGINA 2-{ pages }</p>
                           <p className='serial'>{ targetAvaluo.content.commercialPrice === undefined ? '$0.00' : numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true }) }/{ uniqueDocId }</p>
                        </header>
                        <table className="car-data-table">
                           <tbody>
                              <tr className="table-row-body">
                                 <td><strong>FECHA:</strong></td>
                                 <td>{ formatWithoutTime(targetAvaluo.content.created) }</td>
                                 <td><strong>MARCA:</strong></td>
                                 <td>{ targetAvaluo.content.brand }</td>
                                 <td><strong>ORIGEN:</strong></td>
                                 <td>{ targetAvaluo.content.origin }</td>
                              </tr>
                              <tr className='table-row-body'>
                                 <td><strong>PLACA:</strong></td>
                                 <td>{ targetAvaluo.content.plate }</td>
                                 <td><strong>MODELO:</strong></td>
                                 <td>{ targetAvaluo.content.model }</td>
                                 <td><strong>PROCEDENCIA:</strong></td>
                                 <td>{ targetAvaluo.content.from }</td>
                              </tr>
                              <tr className='table-row-body'>
                                 <td><strong>AÑO:</strong></td>
                                 <td>{ targetAvaluo.content.year }</td>
                                 <td><strong>ODÓMETRO:</strong></td>
                                 <td>{ targetAvaluo.content.odometer }</td>
                                 <td><strong>CILINDRADA:</strong></td>
                                 <td>{ targetAvaluo.content.cylindersProm }</td>
                              </tr>
                           </tbody>
                        </table>
                        <section className="re-inspeccion">
                           <p>RE INSPECCION GRATUITA APLICA ÚNICAMENTE DURANTE LOS PRIMEROS 15 DÍAS POSTERIORES AL AVALÚO DE LOS PUNTOS OBSERVADOS EN SU FECHA; DEBERÁ ENTREGAR DOCUMENTOS ORIGINALES - MÁXIMOS VALORES DE COMPRA O VENTA NO APLICAN</p>
                        </section>

                        <section className={ isResponsive
                              ? 'expenses-square responsive'
                              : 'expenses-square'
                           }>
                           <section className="expenses-content">
                              <table className="expenses-table">
                                 <tbody>
                                    <tr className="expenses-header">
                                       <td className={ expenses.length === 0
                                          ? 'border-bottom'
                                          : undefined
                                       }>CONDICIONES FÍSICAS ACTUALES DEL AUTOMOTOR QUE DEBEN SUBSANARSE O REPARARSE, REPORTADO DURANTE EL PROCESO DE INSPECCIÓN</td>
                                       <td className={ expenses.length === 0
                                          ? 'border-bottom'
                                          : undefined
                                       }>PRESUPUESTO DE REPARACIÓN</td>
                                    </tr>
                                    { expenses.map((expense) => (
                                       <tr
                                          key={ expense.id }
                                          className="expenses-body">
                                          <td>{ expense.description }</td>
                                          <td>{ expense.price }</td>
                                       </tr>
                                    )) }
                                 </tbody>
                              </table>
                           </section>
                           <article className='expenses-totals'>
                              <div className="expenses-flex">
                                 <p>
                                    PRESUPUESTO ESTIMADO YA HA SIDO RESTADO DE AVALÚO
                                 </p>
                                 <p>
                                    { numbro(targetAvaluo.content.totalExpenses).formatCurrency({thousandSeparated: true,}) }
                                 </p>
                              </div>
                              <p>PRESUPUESTO ESTIMADO PUEDE VARIAR DEPENDIENDO DE SI LA PIEZA ES NUEVA O USADA, LA SALA DE VENTA DE REPUESTOS DONDE SE COMPRA Y EL VALOR DE MANO DE OBRA DEL TALLER AL QUE SE LLEVE LA UNIDAD A REPARACIÓN</p>
                              <div className="expenses-comments">
                                 <p>COMENTARIOS AL: { formatWithoutTime(targetAvaluo.content.created) }</p>
                                 <p>{ targetAvaluo.content.comments }</p>
                              </div>
                              <hr />
                              <div className="valuo-totals">
                                 <div className="totals-content">
                                    { carValue === 'MAX-VALOR' ?
                                       <p className='label max'>
                                          LA PRESENTE OPINIÓN DE MÁXIMO VALOR (VENTA / COMPRA) QUE EMITIMOS EN ESTE CASO EN PARTICULAR OBEDECE A QUE LOS COSTOS DE REPARACIÓN EQUIVALEN O EXCEDEN EL { expensesPercentage >= 100 ? 100 : expensesPercentage }% DEL VALOR DE ESTE BIEN, POR LO QUE NO SE APLICA UN VALOR DE MERCADO NI PUEDE EXISTIR UNA RECONSIDERACIÓN DE DICHO VALOR. EXPUESTO LO ANTERIOR; NO RESULTARIA PRACTICO INVERTIR EN SU REPARACIÓN PARA SU POSTERIOR COMERCIALIZACIÓN
                                       </p>
                                       :
                                       <p className='label'>
                                          AVALÚO COMERCIAL (INCLUYE IVA / COMISIÓN POS VENTA)
                                       </p>
                                    }
                                    <div className="total">
                                       <div>
                                          <p
                                             className={
                                             carValue === 'MAX-VALOR'
                                                ? 'max'
                                                : undefined
                                             }> { carValue === 'MAX-VALOR'
                                                   ? 'MÁXIMO VALOR'
                                                   : 'VALOR'
                                                }
                                          </p>
                                          <h4>{ numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</h4>
                                       </div>
                                       <div>
                                          <p
                                             className={
                                             carValue === 'MAX-VALOR'
                                                ? 'max'
                                                : undefined
                                             }> { carValue === 'MAX-VALOR'
                                                   ? 'MÁXIMO VALOR EN LETRAS'
                                                   : 'VALOR EN LETRAS'
                                                }
                                          </p>
                                          <h4 className='value-in-letters'>{ numberToString(numbro.unformat(targetAvaluo.content.commercialPrice)) }</h4>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </article>
                        </section>

                        {/* <section className="expenses">
                           <p>RE INSPECCION GRATUITA APLICA ÚNICAMENTE DURANTE LOS PRIMEROS 15 DÍAS POSTERIORES AL AVALÚO DE LOS PUNTOS OBSERVADOS EN SU FECHA; DEBERÁ ENTREGAR DOCUMENTOS ORIGINALES - MÁXIMOS VALORES DE COMPRA O VENTA NO APLICAN</p>
                           <section className="expenses__header">
                              <p>CONDICIONES FÍSICAS ACTUALES DEL AUTOMOTOR QUE DEBEN SUBSANARSE O REPARARSE, REPORTADO DURANTE EL PROCESO DE INSPECCIÓN</p>
                              <p>PRESUPUESTO ESTIMADO DE REPARACIÓN</p>
                           </section>
                           <section className={ isResponsive === true
                              ? 'expenses__content responsive'
                              : 'expenses__content'
                           }>
                              { expenses.length > 0 &&
                                 expenses.map((expense) => {
                                    return (
                                       <article
                                          key={ expense.id }
                                          className={ expense?.isImportant ? 'expenses important' : 'expenses' }>
                                          <p>{ expense.description }</p>
                                          <p>{ expense.price }</p>
                                       </article>
                                    ); 
                                 })
                              }
                           </section>
                           <section className={ isResponsive
                              ? 'expenses-conclusions responsive'
                              : expenses.length <= 24
                              ? 'expenses-conclusions bottom'
                              : 'expenses-conclusions'
                           }>
                              <section className="notes-expenses">
                                 <article className="total">
                                    <p>VALOR DE PRESUPUESTO ESTIMADO YA HA SIDO RESTADO DE AVALÚO</p>
                                    <p>{ numbro(targetAvaluo.content.totalExpenses).formatCurrency({
                                       thousandSeparated: true,
                                    }) }</p>
                                 </article>
                                 <p className='total-message'>PRESUPUESTO ESTIMADO PUEDE VARIAR DEPENDIENDO DE SI LA PIEZA ES NUEVA O USADA, LA SALA DE VENTA DE REPUESTOS DONDE SE COMPRA Y EL VALOR DE MANO DE OBRA DEL TALLER AL QUE SE LLEVE LA UNIDAD A REPARACIÓN</p>
                                 <section className="car-comments">
                                    <p>COMENTARIOS AL: { formatWithoutTime(targetAvaluo.content.created) }</p>
                                    <p>{ targetAvaluo.content.comments }</p>
                                 </section>
                              </section>
                              <section className="total-expenses">
                                 { carValue === 'MAX-VALOR' ?
                                    <p className='max-valor-message'>LA PRESENTE OPINIÓN DE MÁXIMO VALOR (VENTA / COMPRA) QUE EMITIMOS EN ESTE CASO EN PARTICULAR OBEDECE A QUE LOS COSTOS DE REPARACIÓN EQUIVALEN O EXCEDEN EL { expensesPercentage >= 100 ? 100 : expensesPercentage }% DEL VALOR DE ESTE BIEN, POR LO QUE NO SE APLICA UN VALOR DE MERCADO NI PUEDE EXISTIR UNA RECONSIDERACIÓN DE DICHO VALOR. EXPUESTO LO ANTERIOR; NO RESULTARIA PRACTICO INVERTIR EN SU REPARACIÓN PARA SU POSTERIOR COMERCIALIZACIÓN</p>
                                    :
                                    <p>AVALÚO COMERCIAL (INCLUYE IVA / COMISION POS VENTA)</p>
                                 }
                                 <section className="two-columns">
                                    <article className="total">
                                       <p>
                                          { carValue === 'MAX-VALOR' ? 'MÁXIMO VALOR' : 'VALOR' }
                                       </p>
                                       <p className={ carValue === 'MAX-VALOR' ? 'max' : undefined }>
                                          { numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }
                                       </p>
                                    </article>
                                    <article className="total-in-words">
                                       <p>VALOR EN LETRAS</p>
                                       <p className={ carValue === 'MAX-VALOR' ? 'max' : undefined }>
                                          { numberToString(numbro.unformat(targetAvaluo.content.commercialPrice)) }
                                       </p>
                                    </article>
                                 </section>
                              </section>
                           </section>
                        </section> */}
                     </section>
      
                     { expenses.length < 33 &&
                        <footer className="page-footer">
                           <hr />
                           <section className="social__media-grid">
                              <figure className='social-media'>
                                 <img src={ facebookLogo } alt="facebook logo" />
                                 <figcaption>Avalúos Calleja's El Salvador</figcaption>
                              </figure>
                              <figure className='social-media'>
                                 <img src={ instagramLogo } alt="instagram logo" />
                                 <figcaption>@avaluos_callejas</figcaption>
                              </figure>
                              <figure className='social-media'>
                                 <img src={ internetLogo } alt="internet logo" />
                                 <figcaption>www.avaluoscallejas.com</figcaption>
                              </figure>
                           </section>
                           <section className="contact">
                              <article className="contact-article">
                                 <p>San Salvador 2520-5942</p>
                              </article>
                              <article className="contact-article">
                                 <p>San Miguel 2684 9177</p>
                              </article>
                           </section>
                        </footer>
                     }
                  </section>
                  :
                  <section className="pdf-container avaluo-page">
                     <figure className='background-logo'>
                        <img src={ logoLowOpacity } alt="logo with low opacity" />
                     </figure>
                     <header className="page-header">
                        <figure className="logo">
                           <img src={ logo } alt="logo" />
                        </figure>
                        <section className="header__content">
                           <p>Callejas & Asociados; Empresa acreditada por superintendencia del sistema financiero en categoria de <u>bienes muebles en general</u> con numero de inscripcion PV00122020 - { uniqueDocId }</p>
                           <p className='important'>Exija documento original / validez 30 días / ver notas al reverso</p>
                        </section>
                     </header>

                     <section className="car-expenses">
                        <header className='car-header'>
                           <p>INFORME DE DIAGNÓSTICO MECÁNICO - AVALÚO COMERCIAL</p>
                           <p>PAGINA 2-{ pages }</p>
                           <p className='serial'>{ targetAvaluo.content.commercialPrice === undefined ? '$0.00' : numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true }) }/{ uniqueDocId }</p>
                        </header>
                        <table className="car-data-table">
                           <tbody>
                              <tr className="table-row-body">
                                 <td><strong>FECHA:</strong></td>
                                 <td>{ formatWithoutTime(targetAvaluo.content.created) }</td>
                                 <td><strong>MARCA:</strong></td>
                                 <td>{ targetAvaluo.content.brand }</td>
                                 <td><strong>ORIGEN:</strong></td>
                                 <td>{ targetAvaluo.content.origin }</td>
                              </tr>
                              <tr className='table-row-body'>
                                 <td><strong>PLACA:</strong></td>
                                 <td>{ targetAvaluo.content.plate }</td>
                                 <td><strong>MODELO:</strong></td>
                                 <td>{ targetAvaluo.content.model }</td>
                                 <td><strong>PROCEDENCIA:</strong></td>
                                 <td>{ targetAvaluo.content.from }</td>
                              </tr>
                              <tr className='table-row-body'>
                                 <td><strong>AÑO:</strong></td>
                                 <td>{ targetAvaluo.content.year }</td>
                                 <td><strong>ODÓMETRO:</strong></td>
                                 <td>{ targetAvaluo.content.odometer }</td>
                                 <td><strong>CILINDRADA:</strong></td>
                                 <td>{ targetAvaluo.content.cylindersProm }</td>
                              </tr>
                           </tbody>
                        </table>

                        <section className="re-inspeccion">
                           <p>RE INSPECCION GRATUITA APLICA ÚNICAMENTE DURANTE LOS PRIMEROS 15 DÍAS POSTERIORES AL AVALÚO DE LOS PUNTOS OBSERVADOS EN SU FECHA; DEBERÁ ENTREGAR DOCUMENTOS ORIGINALES - MÁXIMOS VALORES DE COMPRA O VENTA NO APLICAN</p>
                        </section>

                        <section className={ isResponsive
                              ? 'expenses-square responsive'
                              : 'expenses-square'
                           }>
                           <section className="expenses-content">
                              <table className="expenses-table">
                                 <tbody>
                                    <tr className="expenses-header">
                                       <td className={ expenses.length === 0
                                          ? 'border-bottom'
                                          : undefined
                                       }>CONDICIONES FÍSICAS ACTUALES DEL AUTOMOTOR QUE DEBEN SUBSANARSE O REPARARSE, REPORTADO DURANTE EL PROCESO DE INSPECCIÓN</td>
                                       <td className={ expenses.length === 0
                                          ? 'border-bottom'
                                          : undefined
                                       }>PRESUPUESTO DE REPARACIÓN</td>
                                    </tr>
                                    { expenses.map((expense) => (
                                       <tr
                                          key={ expense.id }
                                          className="expenses-body">
                                          <td>{ expense.description }</td>
                                          <td>{ expense.price }</td>
                                       </tr>
                                    )) }
                                 </tbody>
                              </table>
                           </section>
                           <article className='expenses-totals'>
                              <div className="expenses-flex">
                                 <p>
                                    PRESUPUESTO ESTIMADO YA HA SIDO RESTADO DE AVALÚO
                                 </p>
                                 <p>
                                    { numbro(targetAvaluo.content.totalExpenses).formatCurrency({thousandSeparated: true,}) }
                                 </p>
                              </div>
                              <p>PRESUPUESTO ESTIMADO PUEDE VARIAR DEPENDIENDO DE SI LA PIEZA ES NUEVA O USADA, LA SALA DE VENTA DE REPUESTOS DONDE SE COMPRA Y EL VALOR DE MANO DE OBRA DEL TALLER AL QUE SE LLEVE LA UNIDAD A REPARACIÓN</p>
                              <div className="expenses-comments">
                                 <p>COMENTARIOS AL: { formatWithoutTime(targetAvaluo.content.created) }</p>
                                 <p>{ targetAvaluo.content.comments }</p>
                              </div>
                              <hr />
                              <div className="valuo-totals">
                                 <div className="totals-content">
                                    { carValue === 'MAX-VALOR' ?
                                       <p className='label max'>
                                          LA PRESENTE OPINIÓN DE MÁXIMO VALOR (VENTA / COMPRA) QUE EMITIMOS EN ESTE CASO EN PARTICULAR OBEDECE A QUE LOS COSTOS DE REPARACIÓN EQUIVALEN O EXCEDEN EL { expensesPercentage >= 100 ? 100 : expensesPercentage }% DEL VALOR DE ESTE BIEN, POR LO QUE NO SE APLICA UN VALOR DE MERCADO NI PUEDE EXISTIR UNA RECONSIDERACIÓN DE DICHO VALOR. EXPUESTO LO ANTERIOR; NO RESULTARIA PRACTICO INVERTIR EN SU REPARACIÓN PARA SU POSTERIOR COMERCIALIZACIÓN
                                       </p>
                                       :
                                       <p className='label'>
                                          AVALÚO COMERCIAL (INCLUYE IVA / COMISIÓN POS VENTA)
                                       </p>
                                    }
                                    <div className="total">
                                       <div>
                                          <p
                                             className={
                                             carValue === 'MAX-VALOR'
                                                ? 'max'
                                                : undefined
                                             }> { carValue === 'MAX-VALOR'
                                                   ? 'MÁXIMO VALOR'
                                                   : 'VALOR'
                                                }
                                          </p>
                                          <h4>{ numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</h4>
                                       </div>
                                       <div>
                                          <p
                                             className={
                                             carValue === 'MAX-VALOR'
                                                ? 'max'
                                                : undefined
                                             }> { carValue === 'MAX-VALOR'
                                                   ? 'MÁXIMO VALOR EN LETRAS'
                                                   : 'VALOR EN LETRAS'
                                                }
                                          </p>
                                          <h4 className='value-in-letters'>{ numberToString(numbro.unformat(targetAvaluo.content.commercialPrice)) }</h4>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </article>
                        </section>
                        {/* <section className="expenses">
                           <p>RE INSPECCION GRATUITA APLICA ÚNICAMENTE DURANTE LOS PRIMEROS 15 DÍAS POSTERIORES AL AVALÚO DE LOS PUNTOS OBSERVADOS EN SU FECHA; DEBERÁ ENTREGAR DOCUMENTOS ORIGINALES - MÁXIMOS VALORES DE COMPRA O VENTA NO APLICAN</p>
                           <section className="expenses__header">
                              <p>CONDICIONES FÍSICAS ACTUALES DEL AUTOMOTOR QUE DEBEN SUBSANARSE O REPARARSE, REPORTADO DURANTE EL PROCESO DE INSPECCIÓN</p>
                              <p>PRESUPUESTO ESTIMADO DE REPARACIÓN</p>
                           </section>
                           <section className={ isResponsive
                              ? 'expenses__content responsive'
                              : 'expenses__content'
                           }>
                              { expenses.length > 0 &&
                                 expenses.map((expense) => {
                                    return (
                                       <article
                                          key={ expense.id }
                                          className={ expense?.isImportant ? 'expenses important' : 'expenses' }>
                                          <p>{ expense.description }</p>
                                          <p>{ expense.price }</p>
                                       </article>
                                    ); 
                                 })
                              }
                           </section>
                           <section className={ isResponsive
                              ? 'expenses-conclusions responsive'
                              : expenses.length <= 24
                              ? 'expenses-conclusions bottom'
                              : 'expenses-conclusions'
                           }>
                              <section className="notes-expenses">
                                 <article className="total">
                                    <p>VALOR DE PRESUPUESTO ESTIMADO YA HA SIDO RESTADO DE AVALÚO</p>
                                    <p>{ numbro(targetAvaluo.content.totalExpenses).formatCurrency({
                                       thousandSeparated: true,
                                    }) }</p>
                                 </article>
                                 <p className='total-message'>PRESUPUESTO ESTIMADO PUEDE VARIAR DEPENDIENDO DE SI LA PIEZA ES NUEVA O USADA, LA SALA DE VENTA DE REPUESTOS DONDE SE COMPRA Y EL VALOR DE MANO DE OBRA DEL TALLER AL QUE SE LLEVE LA UNIDAD A REPARACIÓN</p>
                                 <section className="car-comments">
                                    <p>COMENTARIOS AL: { formatWithoutTime(targetAvaluo.content.created) }</p>
                                    <p>{ targetAvaluo.content.comments }</p>
                                 </section>
                              </section>
                              <section className="total-expenses">
                                 { carValue === 'MAX-VALOR' ?
                                    <p className='max-valor-message'>LA PRESENTE OPINIÓN DE MÁXIMO VALOR (VENTA / COMPRA) QUE EMITIMOS EN ESTE CASO EN PARTICULAR OBEDECE A QUE LOS COSTOS DE REPARACIÓN EQUIVALEN O EXCEDEN EL { expensesPercentage >= 100 ? 100 : expensesPercentage }% DEL VALOR DE ESTE BIEN, POR LO QUE NO SE APLICA UN VALOR DE MERCADO NI PUEDE EXISTIR UNA RECONSIDERACIÓN DE DICHO VALOR. EXPUESTO LO ANTERIOR; NO RESULTARIA PRACTICO INVERTIR EN SU REPARACIÓN PARA SU POSTERIOR COMERCIALIZACIÓN</p>
                                    :
                                    <p>AVALÚO COMERCIAL (INCLUYE IVA / COMISION POS VENTA)</p>
                                 }
                                 <section className="two-columns">
                                    <article className="total">
                                       <p>
                                          { carValue === 'MAX-VALOR' ? 'MÁXIMO VALOR' : 'VALOR' }
                                       </p>
                                       <p className={ carValue === 'MAX-VALOR' ? 'max' : undefined }>
                                          { numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }
                                       </p>
                                    </article>
                                    <article className="total-in-words">
                                       <p>VALOR EN LETRAS</p>
                                       <p className={ carValue === 'MAX-VALOR' ? 'max' : undefined }>
                                          { numberToString(numbro.unformat(targetAvaluo.content.commercialPrice)) }
                                       </p>
                                    </article>
                                 </section>
                              </section>
                           </section>
                        </section> */}
                     </section>

                     { expenses.length < 33 &&
                        <footer className="page-footer">
                           <hr />
                           <section className="social__media-grid">
                              <figure className='social-media'>
                                 <img src={ facebookLogo } alt="facebook logo" />
                                 <figcaption>Avalúos Calleja's El Salvador</figcaption>
                              </figure>
                              <figure className='social-media'>
                                 <img src={ instagramLogo } alt="instagram logo" />
                                 <figcaption>@avaluos_callejas</figcaption>
                              </figure>
                              <figure className='social-media'>
                                 <img src={ internetLogo } alt="internet logo" />
                                 <figcaption>www.avaluoscallejas.com</figcaption>
                              </figure>
                           </section>
                           <section className="contact">
                              <article className="contact-article">
                                 <p>San Salvador 2520-5942</p>
                              </article>
                              <article className="contact-article">
                                 <p>San Miguel 2684 9177</p>
                              </article>
                           </section>
                        </footer>
                     }
                  </section>
               }
            </>
         }

         { pages > '1' && pages === '3' &&
            <section className="pdf-container avaluo-page">
               <figure className='background-logo'>
                  <img src={ logoLowOpacity } alt="logo with low opacity" />
               </figure>
               <header className="page-header">
                  <figure className="logo">
                     <img src={ logo } alt="logo" />
                  </figure>
                  <section className="header__content">
                     <p>Callejas & Asociados; Empresa acreditada por superintendencia del sistema financiero en categoria de <u>bienes muebles en general</u> con numero de inscripcion PV00122020 - { uniqueDocId }</p>
                     <p className='important'>Exija documento original / validez 30 días / ver notas al reverso</p>
                  </section>
               </header>

               <section className="car-expenses">
                  <header className='car-header'>
                     <p>INFORME DE DIAGNÓSTICO MECÁNICO - AVALÚO CANJE EN AGENCIA</p>
                     <p>PAGINA 3-{ pages }</p>
                     <p className='serial'>{ targetAvaluo.content.agencyPrice === undefined ? '$0.00' : numbro(targetAvaluo.content.agencyPrice).formatCurrency({ thousandSeparated: true }) }/{ uniqueDocId }</p>
                  </header>
                  <table className="car-data-table">
                     <tbody>
                        <tr className="table-row-body">
                           <td><strong>FECHA:</strong></td>
                           <td>{ formatWithoutTime(targetAvaluo.content.created) }</td>
                           <td><strong>MARCA:</strong></td>
                           <td>{ targetAvaluo.content.brand }</td>
                           <td><strong>ORIGEN:</strong></td>
                           <td>{ targetAvaluo.content.origin }</td>
                        </tr>
                        <tr className='table-row-body'>
                           <td><strong>PLACA:</strong></td>
                           <td>{ targetAvaluo.content.plate }</td>
                           <td><strong>MODELO:</strong></td>
                           <td>{ targetAvaluo.content.model }</td>
                           <td><strong>PROCEDENCIA:</strong></td>
                           <td>{ targetAvaluo.content.from }</td>
                        </tr>
                        <tr className='table-row-body'>
                           <td><strong>AÑO:</strong></td>
                           <td>{ targetAvaluo.content.year }</td>
                           <td><strong>ODÓMETRO:</strong></td>
                           <td>{ targetAvaluo.content.odometer }</td>
                           <td><strong>CILINDRADA:</strong></td>
                           <td>{ targetAvaluo.content.cylindersProm }</td>
                        </tr>
                     </tbody>
                  </table>
                  <section className="re-inspeccion">
                     <p>RE INSPECCION GRATUITA APLICA ÚNICAMENTE DURANTE LOS PRIMEROS 15 DÍAS POSTERIORES AL AVALÚO DE LOS PUNTOS OBSERVADOS EN SU FECHA; DEBERÁ ENTREGAR DOCUMENTOS ORIGINALES - MÁXIMOS VALORES DE COMPRA O VENTA NO APLICAN</p>
                  </section>

                  <section className={ isResponsive
                        ? 'expenses-square responsive'
                        : 'expenses-square'
                     }>
                        <section className="expenses-content">
                           <table className="expenses-table">
                              <tbody>
                                 <tr className="expenses-header">
                                    <td className={ expenses.length === 0
                                       ? 'border-bottom'
                                       : undefined
                                    }>CONDICIONES FÍSICAS ACTUALES DEL AUTOMOTOR QUE DEBEN SUBSANARSE O REPARARSE, REPORTADO DURANTE EL PROCESO DE INSPECCIÓN</td>
                                    <td className={ expenses.length === 0
                                       ? 'border-bottom'
                                       : undefined
                                    }>PRESUPUESTO DE REPARACIÓN</td>
                                 </tr>
                                 { expenses.map((expense) => (
                                    <tr
                                       key={ expense.id }
                                       className="expenses-body">
                                       <td>{ expense.description }</td>
                                       <td>{ expense.price }</td>
                                    </tr>
                                 )) }
                              </tbody>
                           </table>
                        </section>
                        <article className='expenses-totals'>
                           <div className="expenses-flex">
                              <p>
                                 PRESUPUESTO ESTIMADO YA HA SIDO RESTADO DE AVALÚO
                              </p>
                              <p>
                                 { numbro(targetAvaluo.content.totalExpenses).formatCurrency({thousandSeparated: true,}) }
                              </p>
                           </div>
                           <p>PRESUPUESTO ESTIMADO PUEDE VARIAR DEPENDIENDO DE SI LA PIEZA ES NUEVA O USADA, LA SALA DE VENTA DE REPUESTOS DONDE SE COMPRA Y EL VALOR DE MANO DE OBRA DEL TALLER AL QUE SE LLEVE LA UNIDAD A REPARACIÓN</p>
                           <div className="expenses-comments">
                              <p>COMENTARIOS AL: { formatWithoutTime(targetAvaluo.content.created) }</p>
                              <p>{ targetAvaluo.content.comments }</p>
                           </div>
                           <hr />
                           <div className="valuo-totals">
                              <div className="totals-content">
                                 { carValue === 'MAX-VALOR' ?
                                    <p className='label max'>
                                       LA PRESENTE OPINIÓN DE MÁXIMO VALOR (VENTA / COMPRA) QUE EMITIMOS EN ESTE CASO EN PARTICULAR OBEDECE A QUE LOS COSTOS DE REPARACIÓN EQUIVALEN O EXCEDEN EL { expensesPercentage >= 100 ? 100 : expensesPercentage }% DEL VALOR DE ESTE BIEN, POR LO QUE NO SE APLICA UN VALOR DE MERCADO NI PUEDE EXISTIR UNA RECONSIDERACIÓN DE DICHO VALOR. EXPUESTO LO ANTERIOR; NO RESULTARIA PRACTICO INVERTIR EN SU REPARACIÓN PARA SU POSTERIOR COMERCIALIZACIÓN
                                    </p>
                                    :
                                    <p className='label'>
                                       AVALÚO AGENCIA (NO INCLUYE IVA Y COMISIÓN POS VENTA)
                                    </p>
                                 }
                                 <div className="total">
                                    <div>
                                       <p
                                          className={
                                          carValue === 'MAX-VALOR'
                                             ? 'max'
                                             : undefined
                                          }> { carValue === 'MAX-VALOR'
                                                ? 'MÁXIMO VALOR'
                                                : 'VALOR'
                                             }
                                       </p>
                                       <h4>{ numbro(targetAvaluo.content.agencyPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</h4>
                                    </div>
                                    <div>
                                       <p
                                          className={
                                          carValue === 'MAX-VALOR'
                                             ? 'max'
                                             : undefined
                                          }> { carValue === 'MAX-VALOR'
                                                ? 'MÁXIMO VALOR EN LETRAS'
                                                : 'VALOR EN LETRAS'
                                             }
                                       </p>
                                       <h4 className='value-in-letters'>{ numberToString(numbro.unformat(targetAvaluo.content.agencyPrice)) }</h4>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </article>
                  </section>

                  {/* <section className="expenses">
                     <p>RE INSPECCION GRATUITA APLICA ÚNICAMENTE DURANTE LOS PRIMEROS 15 DÍAS POSTERIORES AL AVALÚO DE LOS PUNTOS OBSERVADOS EN SU FECHA; DEBERÁ ENTREGAR DOCUMENTOS ORIGINALES - MÁXIMOS VALORES DE COMPRA O VENTA NO APLICAN</p>
                     <section className="expenses__header">
                        <p>CONDICIONES FÍSICAS ACTUALES DEL AUTOMOTOR QUE DEBEN SUBSANARSE O REPARARSE, REPORTADO DURANTE EL PROCESO DE INSPECCIÓN</p>
                        <p>PRESUPUESTO ESTIMADO DE REPARACIÓN</p>
                     </section>
                     <section className={ isResponsive
                        ? 'expenses__content responsive'
                        : 'expenses__content'
                     }>
                        { expenses.length > 0 &&
                           expenses.map((expense) => {
                              return (
                                 <article
                                    key={ expense.id }
                                    className={ expense?.isImportant ? 'expenses important' : 'expenses' }>
                                    <p>{ expense.description }</p>
                                    <p>{ expense.price }</p>
                                 </article>
                              );
                           })
                        }
                     </section>
                     <section className={ isResponsive
                        ? 'expenses-conclusions responsive'
                        : expenses.length <= 24
                        ? 'expenses-conclusions bottom'
                        : 'expenses-conclusions'
                     }>
                        <section className="notes-expenses">
                           <article className="total">
                              <p>VALOR DE PRESUPUESTO ESTIMADO YA HA SIDO RESTADO DE AVALÚO</p>
                              <p>{ numbro(targetAvaluo.content.totalExpenses).formatCurrency({
                                 thousandSeparated: true,
                              }) }</p>
                           </article>
                           <p className='total-message'>PRESUPUESTO ESTIMADO PUEDE VARIAR DEPENDIENDO DE SI LA PIEZA ES NUEVA O USADA, LA SALA DE VENTA DE REPUESTOS DONDE SE COMPRA Y EL VALOR DE MANO DE OBRA DEL TALLER AL QUE SE LLEVE LA UNIDAD A REPARACIÓN.</p>
                           <section className="car-comments">
                              <p>COMENTARIOS AL: { formatWithoutTime(targetAvaluo.content.created) }</p>
                              <p>{ targetAvaluo.content.comments }</p>
                           </section>
                        </section>
                        <section className="total-expenses">
                           { carValue === 'MAX-VALOR' ?
                              <p className='max-valor-message'>LA PRESENTE OPINIÓN DE MÁXIMO VALOR (VENTA / COMPRA) QUE EMITIMOS EN ESTE CASO EN PARTICULAR OBEDECE A QUE LOS COSTOS DE REPARACIÓN EQUIVALEN O EXCEDEN EL { expensesPercentage >= 100 ? 100 : expensesPercentage }% DEL VALOR DE ESTE BIEN, POR LO QUE NO SE APLICA UN VALOR DE MERCADO NI PUEDE EXISTIR UNA RECONSIDERACIÓN DE DICHO VALOR. EXPUESTO LO ANTERIOR; NO RESULTARIA PRACTICO INVERTIR EN SU REPARACIÓN PARA SU POSTERIOR COMERCIALIZACIÓN</p>
                              :
                              <p>AVALÚO CANJE AGENCIA (NO INCLUYE IVA / NI COMISION POS VENTA)</p>
                           }
                           <section className="two-columns">
                              <article className="total">
                                 <p>
                                    { carValue === 'MAX-VALOR' ? 'MÁXIMO VALOR' : 'VALOR' }
                                 </p>
                                 <p className={ carValue === 'MAX-VALOR' ? 'max' : undefined }>
                                    { numbro(targetAvaluo.content.agencyPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }
                                 </p>
                              </article>
                              <article className="total-in-words">
                                 <p>VALOR EN LETRAS</p>
                                 <p className={ carValue === 'MAX-VALOR' ? 'max' : undefined }>
                                    { numberToString(numbro.unformat(targetAvaluo.content.agencyPrice)) }
                                 </p>
                              </article>
                           </section>
                        </section>
                     </section>
                  </section> */}
               </section>

               { expenses.length < 33 &&
                  <footer className="page-footer">
                     <hr />
                     <section className="social__media-grid">
                        <figure className='social-media'>
                           <img src={ facebookLogo } alt="facebook logo" />
                           <figcaption>Avalúos Calleja's El Salvador</figcaption>
                        </figure>
                        <figure className='social-media'>
                           <img src={ instagramLogo } alt="instagram logo" />
                           <figcaption>@avaluos_callejas</figcaption>
                        </figure>
                        <figure className='social-media'>
                           <img src={ internetLogo } alt="internet logo" />
                           <figcaption>www.avaluoscallejas.com</figcaption>
                        </figure>
                     </section>
                     <section className="contact">
                        <article className="contact-article">
                           <p>San Salvador 2520-5942</p>
                        </article>
                        <article className="contact-article">
                           <p>San Miguel 2684 9177</p>
                        </article>
                     </section>
                  </footer>
               }
            </section>
         }
      </>
   );
};