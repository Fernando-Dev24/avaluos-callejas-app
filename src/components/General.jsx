import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* components */
import { CreateHeader } from './CreateHeader';
import { Alert } from '../styled-components/Alert';
import { Decoder } from './Decoder';
import { DifferentImport } from './DifferentImport';
import { SaveProgress } from './SaveProgress';

export const General = ({
   showModal,
   setShowModal,
   alertContent,
   alertState,
   setAlertContent,
   setAlertState,
   editAvaluo,
   setEditAvaluo,
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const navigate = useNavigate();

   /* desestructuring to only use general form elements and its value */
   const { pages, avaluoType, applicant, costumer, plate, frontalSticker, rearSticker, thirdSticker, brand, model, year, color, carType, origin, from, odometer, fuel, cylinders, cylindersProm, transmission, traction, runningIn, capacity, weightCapacity, tara, maxCapacity, targetOutDated, targetAs, engineTarget, chasisTarget, vinTarget, engineCar, chasisCar, vinCar, numbersReason } = newAvaluo;

   /* states */
   const [decoder, setDecoder] = useState({
      state: false,
      name: undefined,
   });
   const [isDifferentImport, setIsDifferentImport] = useState(false);

   /* handleFormValues */
   const handleFormValues = ({ target }) => {
      switch( target.name ) {
         case 'engineTarget':
            setNewAvaluo({
               ...newAvaluo,
               engineTarget: target.value,
               engineCar: target.value,
            });
         break;
         case 'chasisTarget':
            setNewAvaluo({
               ...newAvaluo,
               chasisTarget: target.value,
               chasisCar: target.value,
            });
         break;
         case 'vinTarget':
            setNewAvaluo({
               ...newAvaluo,
               vinTarget: target.value,
               vinCar: target.value,
            });
         break;
         case 'weightCapacity':
            setNewAvaluo({
               ...newAvaluo,
               [target.name]: target.value,
               maxCapacity: Number(target.value) + Number(tara),
            });
            break;
         case 'tara':
            setNewAvaluo({
               ...newAvaluo,
               [target.name]: target.value,
               maxCapacity: Number(weightCapacity) + Number(target.value),
            });
            break;
         default:
            setNewAvaluo({
               ...newAvaluo,
               [target.name]: target.value
            });
         break;
      };
   };

   /* handleDecoder */
   const handleDecoder = (e) => {
      e.preventDefault();
      const targetId = e.target.id;
      setDecoder({ state: true, name: targetId });
   };

   /* handleSubmit */
   const handleSubmit = async (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      try {
         setNewAvaluo({ ...newAvaluo });
         navigate("/new/aesthethic");
      } catch(error) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Hubo un error, vuelve a intentarlo',
         });
      };
   };
   
   return (
      <>
         <Helmet>
            <title>Nuevo avalúo | General</title>
         </Helmet>
         
         <CreateHeader
            showModal={ showModal }
            setShowModal={ setShowModal }
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
            editAvaluo={ editAvaluo }
            setEditAvaluo={ setEditAvaluo }
         />

         <section className="form-container">
            <form
               className="form container"
               lang='es'
               spellCheck="true"
               autoComplete='on'
               onSubmit={ handleSubmit }>
               <article className="form-title">
                  <h3>Datos generales</h3>
                  <div className="search-buttons">
                     <span className='from-label'>PROCEDENCIA: { from }</span>
                     <button
                        className='btn btn-option'
                        onClick={ (e) => {
                           e.preventDefault();
                           setIsDifferentImport(true);
                        } }>
                        Agregar diferente procedencia
                     </button>
                     <button
                        className='btn btn-search'
                        id='salvagedb'
                        onClick={ handleDecoder }>
                        Buscar en SalvageDB
                     </button>
                  </div>
               </article>
               {/* owners */}
               <article className="input-field input-full-w">
                  <label htmlFor="pages">Número de páginas a usar</label>
                  <select
                     name="pages"
                     id="pages"
                     value={ pages }
                     onChange={ handleFormValues }>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                  </select>
               </article>
               <article className="input-field input-full-w">
                  <label htmlFor="avaluoType">Tipo de avalúo</label>
                  <select
                     name='avaluoType'
                     id='avaluoType'
                     value={ avaluoType }
                     onChange={ handleFormValues }>
                     <option value="PARTICULAR">PARTICULAR</option>
                     <option value="CREDIQ / GRUPOQ - RECUPERADO">CREDIQ / GRUPOQ - RECUPERADO</option>
                     <option value="AUTOFACIL">AUTOFACIL</option>
                     <option value="REINSPECCION">REINSPECCIÓN</option>
                     <option value="CONSIGNA">CONSIGNA</option>
                     <option value="DIAGNOSTICO MECANICO">DIAGNOSTICO MECANICO</option>
                     <option value="SAN MIGUEL">SAN MIGUEL</option>
                     <option value="NIVEL DE COMPRESIONES">NIVEL DE COMPRESIONES</option>
                  </select>
               </article>
               <article className="input-field input-full-w">
                  <label htmlFor="applicant">Nombre del solicitante</label>
                  <input
                     lang='es'
                     type="text"
                     name='applicant'
                     id='applicant'
                     spellCheck="true"
                     placeholder='Nombre del solicitante'
                     value={ applicant }
                     onChange={ handleFormValues }
                  />
               </article>
               <article className="input-field input-full-w">
                  <label htmlFor="costumer">Nombre del propietario</label>
                  <input
                     lang='es'
                     type="text"
                     name='costumer'
                     id='costumer'
                     spellCheck="true"
                     placeholder='Nombre del cliente'
                     value={ costumer }
                     onChange={ handleFormValues }
                  />
               </article>

               {/* general info */}
               <article className="input-grid">
                  <article className="input-field">
                     <label htmlFor="plate">Placa o poliza</label>
                     <input
                        lang='es'
                        type="text"
                        name='plate'
                        id='plate'
                        spellCheck="true"
                        placeholder='Placa o poliza'
                        value={ plate }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="frontalSticker">Placa Frontal</label>
                     <select
                        name='frontalSticker'
                        id='frontalSticker'
                        value={ frontalSticker }
                        onChange={ handleFormValues }>
                        <option value="TIENE">TIENE</option>
                        <option value="PLACA PROVISIONAL">PLACAS PROVISIONALES</option>
                        <option value="POLIZA">POLIZA</option>
                        <option value="EN TRÁMITE">EN TRÁMITE</option>
                        <option value="NO ORIGINAL">NO ORIGINAL</option>
                        <option value="EN DEPOSITO EN SERTRACEN">EN DEPOSITO EN SERTRACEN</option>
                        <option value="INSTALAR">INSTALAR</option>
                        <option value="DAÑADA">DAÑADA</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className="input-field">
                     <label htmlFor="rearSticker">Placa Trasera</label>
                     <select
                        name='rearSticker'
                        id='rearSticker'
                        value={ rearSticker }
                        onChange={ handleFormValues }>
                        <option value="TIENE">TIENE</option>
                        <option value="PLACA PROVISIONAL">PLACAS PROVISIONALES</option>
                        <option value="POLIZA">POLIZA</option>
                        <option value="EN TRÁMITE">EN TRÁMITE</option>
                        <option value="NO ORIGINAL">NO ORIGINAL</option>
                        <option value="EN DEPOSITO EN SERTRACEN">EN DEPOSITO EN SERTRACEN</option>
                        <option value="INSTALAR">INSTALAR</option>
                        <option value="DAÑADA">DAÑADA</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className="input-field">
                     <label htmlFor="thirdSticker">Sticker 3ra placa</label>
                     <select
                        name='thirdSticker'
                        id='thirdSticker'
                        value={ thirdSticker }
                        onChange={ handleFormValues }>
                        <option value="TIENE">TIENE</option>
                        <option value="NO TIENE, TIENE POLIZA">NO TIENE, TIENE POLIZA</option>
                        <option value="EN TRÁMITE">EN TRÁMITE</option>
                        <option value="NO ORIGINAL">NO ORIGINAL</option>
                        <option value="EN DEPOSITO EN SERTRACEN">EN DEPOSITO EN SERTRACEN</option>
                        <option value="INSTALAR">INSTALAR</option>
                        <option value="DAÑADA">DAÑADA</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className="input-field">
                     <label htmlFor="brand">Marca</label>
                     <input
                        lang='es'
                        type="text"
                        name='brand'
                        id='brand'
                        spellCheck="true"
                        placeholder='Ej: Nissan, Toyota, Chevrolet'
                        value={ brand }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="model">Módelo</label>
                     <input
                        lang='es'
                        type="text"
                        name='model'
                        id='model'
                        spellCheck="true"
                        placeholder='Ej: Versa, Corolla, H100'
                        value={ model }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="year">Año</label>
                     <input
                        type="number"
                        min="1950"
                        name='year'
                        id='year'
                        placeholder={ new Date().getFullYear() }
                        value={ year }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="color">Color</label>
                     <input
                        lang='es'
                        type="text"
                        name='color'
                        id='color'
                        spellCheck="true"
                        placeholder="Azul, Gris, Negro, Blanco, Rojo"
                        value={ color }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="carType">Tipo</label>
                     <input
                        lang='es'
                        type="text"
                        name='carType'
                        id='carType'
                        spellCheck="true"
                        placeholder="Tipo según tarjeta de circulación"
                        value={ carType }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="origin">Origen</label>
                     <input
                        lang='es'
                        type="text"
                        name='origin'
                        id='origin'
                        spellCheck="true"
                        placeholder="India, Japón, USA, Alemania"
                        value={ origin }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="from">Procedencia</label>
                     <select
                        name="from"
                        id="from"
                        value={ from }
                        onChange={ handleFormValues }>
                        <option value="AGENCIA">AGENCIA</option>
                        <option value="VERSIÓN AMÉRICANA">VERSIÓN AMÉRICANA</option>
                     </select>
                  </article>
                  <article className="input-field">
                     <label htmlFor="odometer">Odómetro</label>
                     <input
                        lang='es'
                        type="text"
                        name='odometer'
                        id='odometer'
                        spellCheck="true"
                        placeholder="0"
                        value={ odometer }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="fuel">Combustible</label>
                     <select
                        name="fuel"
                        id="fuel"
                        value={ fuel }
                        onChange={ handleFormValues }>
                        <option value="GASOLINA">GASOLINA</option>
                        <option value="DIESEL">DIESEL</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className="input-field">
                     <label htmlFor="cylinders">Cilindros</label>
                     <input
                        lang='es'
                        type="text"
                        name='cylinders'
                        id='cylinders'
                        spellCheck="true"
                        placeholder="0"
                        value={ cylinders }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="cylindersProm">Cilindrada</label>
                     <input
                        lang='es'
                        type="text"
                        name='cylindersProm'
                        id='cylindersProm'
                        spellCheck="true"
                        placeholder="2.8L"
                        value={ cylindersProm }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="transmission">Transmisión</label>
                     <input
                        lang='es'
                        type="text"
                        name='transmission'
                        id='transmission'
                        spellCheck="true"
                        placeholder="Automático o Manual"
                        value={ transmission }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="traction">Tracción</label>
                     <input
                        lang='es'
                        type="text"
                        name='traction'
                        id='traction'
                        spellCheck="true"
                        placeholder="Tracción"
                        value={ traction }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="runningIn">Rodaje</label>
                     <input
                        lang='es'
                        type="text"
                        name="runningIn"
                        id="runningIn"
                        spellCheck="true"
                        placeholder='Sencillo'
                        value={ runningIn }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="capacity">Capacidad</label>
                     <input
                        lang='es'
                        type="text"
                        name="capacity"
                        id="capacity"
                        spellCheck="true"
                        placeholder='0'
                        value={ capacity }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="weightCapacity">Capacidad de Carga</label>
                     <input
                        lang='es'
                        type="text"
                        name="weightCapacity"
                        id="weightCapacity"
                        spellCheck="true"
                        placeholder='0'
                        value={ weightCapacity }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="tara">Tara</label>
                     <input
                        lang='es'
                        type="text"
                        name="tara"
                        id="tara"
                        spellCheck="true"
                        placeholder='0'
                        value={ tara }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="maxCapacity">Máxima Capacidad de Carga</label>
                     <input
                        lang='es'
                        type="text"
                        name="maxCapacity"
                        id="maxCapacity"
                        spellCheck="true"
                        placeholder='0'
                        value={ maxCapacity }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="targetOutDated">Tarjeta Vence</label>
                     <input
                        type="month"
                        name="targetOutDated"
                        id="targetOutDated"
                        value={ targetOutDated }
                        onChange={ handleFormValues }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="targetAs">En calidad de</label>
                     <input
                        lang='es'
                        type="text"
                        name="targetAs"
                        id="targetAs"
                        spellCheck="true"
                        placeholder='Propietario'
                        value={ targetAs }
                        onChange={ handleFormValues }
                     />
                  </article>
               </article>

               {/* car numbers */}
               <article className="input-number no-border">
                  <article className="input-grid no-border">
                     <article className="input-field">
                        <label htmlFor="engineTarget">Número de motor en tarjeta</label>
                        <input
                           type="text"
                           name='engineTarget'
                           id='engineTarget'
                           placeholder='XXXXXXXXXXXX'
                           value={ engineTarget }
                           onChange={ handleFormValues }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="chasisTarget">Número de chasis en tarjeta</label>
                        <input
                           type="text"
                           name='chasisTarget'
                           id='chasisTarget'
                           placeholder='XXXXXXXXXXXXXXXXX'
                           value={ chasisTarget }
                           onChange={ handleFormValues }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="vinTarget">VIN en tarjeta</label>
                        <input
                           type="text"
                           name='vinTarget'
                           id='vinTarget'
                           placeholder='XXXXXXXXXXXXXXXXX'
                           value={ vinTarget }
                           onChange={ handleFormValues }
                        />
                     </article>

                     <article className="input-field">
                        <label htmlFor="engineCar">Número de motor en vehículo</label>
                        <input
                           type="text"
                           name='engineCar'
                           id='engineCar'
                           placeholder='XXXXXXXXXXXX'
                           value={ engineCar }
                           onChange={ handleFormValues }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="chasisCar">Número de chasis en vehículo</label>
                        <input
                           type="text"
                           name='chasisCar'
                           id='chasisCar'
                           placeholder='XXXXXXXXXXXXXXXXX'
                           value={ chasisCar }
                           onChange={ handleFormValues }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="vinCar">VIN en vehículo</label>
                        <input
                           type="text"
                           name='vinCar'
                           id='vinCar'
                           placeholder='XXXXXXXXXXXXXXXXX'
                           value={ vinCar }
                           onChange={ handleFormValues }
                        />
                     </article>
                  </article>
                  <article className="input-field">
                     <label htmlFor="numbersReason">Motivo números grabados no coinciden</label>
                     <input
                        type="text"
                        name='numbersReason'
                        id='numbersReason'
                        placeholder='Motivo números grabados no coinciden'
                        value={ numbersReason }
                        onChange={ handleFormValues }
                     />
                  </article>
               </article>
               <button
                  type='submit'
                  className='btn btn-submit'>
                  Guardar y continuar
               </button>
            </form>
         </section>

         { decoder.state &&
            <Decoder
               decoder={ decoder }
               setDecoder={ setDecoder }
            />
         }

         { isDifferentImport &&
            <DifferentImport
               isDifferentImport={ isDifferentImport }
               setIsDifferentImport={ setIsDifferentImport }
            />
         }

         <SaveProgress
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
         />
         
         <Alert
            type={alertContent.type}
            message={alertContent.message}
            alertState={alertState}
            setAlertState={setAlertState}
         />
      </>
   );
};