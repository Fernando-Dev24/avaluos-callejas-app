import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
/* contexts */
import { NotesProvider } from '../contexts/NotesContext';
/* hooks */
import { useNavigate } from 'react-router-dom';
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
/* components */
import { CreateHeader } from './CreateHeader';
import { Expenses } from './Expenses';
import { PricesModal } from './PricesModal';
import { NotesModal } from './NotesModal';
import { SaveProgress } from './SaveProgress';

export const Mechanic = ({
   showModal,
   setShowModal,
   alertState,
   alertContent,
   setAlertState,
   setAlertContent,
   editAvaluo,
   setEditAvaluo
}) => {
   /* hooks */
   const { newAvaluo, setNewAvaluo } = useNewAvaluo();
   const navigate = useNavigate();

   /* states */
   const [showPricesModal, setShowPricesModal] = useState(false);
   const [showNotesModal, setShowNotesModal] = useState(false);

   /* desestructuring fields use in this section */
   const { power, smoke, combustion, temperature, engineRunning, engineBlowing, checkEnginePilot, absPilot, airbagPilot, tpmsPilot, oilPilot, batteryPilot, frontTires, rearTires, replacementTire, tireCarrier, tools, board, chasisCondition, batteryTest, acCondition, vacuumGauge, cylindersCondition, cylindersReason } = newAvaluo;

   /* desestructuring cylinders */
   const { cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6, cylinder7, cylinder8 } = cylindersCondition

   /* handleMechanicState */
   const handleMechanicState = ({ target }) => {
      let newCylindersCondition;
      switch( target.name ) {
         case 'cylinder1':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder1: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder2':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder2: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder3':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder3: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder4':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder4: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder5':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder5: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder6':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder6: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder7':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder7: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         case 'cylinder8':
            newCylindersCondition = {
               ...cylindersCondition,
               cylinder8: target.value,
            };
            setNewAvaluo({
               ...newAvaluo,
               cylindersCondition: newCylindersCondition,
            });
         break;
         default:
            setNewAvaluo({ ...newAvaluo, [target.name]: target.value });
         break;
      };
   };

   /* handleSubmit */
   const handleSubmit = (e) => {
      e.preventDefault();
      setAlertState(false);
      setAlertContent({});

      try {
         setNewAvaluo({ ...newAvaluo });
         navigate("/new/files");
      } catch(error) {
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Ha ocurrido un error, vuelve a intentarlo',
         });
      };
   }

   return (
      <>
         <Helmet>
            <title>Nuevo avalúo | Diagnóstico Mecánico</title>
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
            <form className='form container' spellCheck="true" onSubmit={ handleSubmit }>
               <article className="form-title">
                  <h3>Diagnóstico mecánico</h3>
                  <div className="search-buttons">
                     <button
                        className='btn btn-option'
                        onClick={ (e) => {
                           e.preventDefault();
                           setShowPricesModal(true);
                        } }>
                        Costos al recibir un vehículo
                     </button>
                     <button
                        className='btn btn-option'
                        onClick={ (e) => {
                           e.preventDefault();
                           setShowNotesModal(true);
                        } }>
                        Ver Notas
                     </button>
                  </div>
               </article>
               {/* pilots and engine state */}
               <article className="input-grid">
                  <article className='input-field'>
                     <label htmlFor="power">Potencia</label>
                     <select
                        name="power"
                        id="power"
                        value={ power }
                        onChange={ handleMechanicState }>
                        <option value="BUENA">BUENA</option>
                        <option value="REGULAR">REGULAR</option>
                        <option value="IRREGULAR">IRREGULAR</option>
                        <option value="DEFICIENTE">DEFICIENTE</option>
                        <option value="MALA">MALA</option>
                        <option value="NO VISTO - REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="smoke">Color de humo</label>
                     <select
                        name="smoke"
                        id="smoke"
                        value={ smoke }
                        onChange={ handleMechanicState }>
                        <option value="NORMAL">NORMAL</option>
                        <option value="NEGRO">NEGRO</option>
                        <option value="NEGRO-GRIS">NEGRO-GRIS</option>
                        <option value="GRIS">GRIS</option>
                        <option value="GRIS - BLANCO">GRIS-BLANCO</option>
                        <option value="BLANCO">BLANCO</option>
                        <option value="BLANCO-GRIS">BLANCO-GRIS</option>
                        <option value="NEGRO-GRIS-BLANCO">NEGRO-GRIS-BLANCO</option>
                        <option value="BLANCO AZULADO">BLANCO AZULADO</option>
                        <option value="NO VISTO - REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="combustion">Combustión</label>
                     <select
                        name="combustion"
                        id="combustion"
                        value={ combustion }
                        onChange={ handleMechanicState }>
                        <option value="NORMAL">NORMAL</option>
                        <option value="REGULAR">REGULAR</option>
                        <option value="IRREGULAR">IRREGULAR</option>
                        <option value="RICA">RICA</option>
                        <option value="MALA">MALA</option>
                        <option value="NO VISTO - REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="engineRunning">Marcha de motor</label>
                     <select
                        name="engineRunning"
                        id="engineRunning"
                        value={ engineRunning }
                        onChange={ handleMechanicState }>
                        <option value="NORMAL">NORMAL</option>
                        <option value="IRREGULAR">IRREGULAR</option>
                        <option value="INESTABLE">INESTABLE</option>
                        <option value="NO VISTO - REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="temperature">Temperatura</label>
                     <select
                        name="temperature"
                        id="temperature"
                        value={ temperature }
                        onChange={ handleMechanicState }>
                        <option value="NORMAL">NORMAL</option>
                        <option value="IRREGULAR">IRREGULAR</option>
                        <option value="ALTA">ALTA</option>
                        <option value="NO VISTO - REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="engineBlowing">Sopla aceite en</label>
                     <select
                        name="engineBlowing"
                        id="engineBlowing"
                        value={ engineBlowing }
                        onChange={ handleMechanicState }>
                        <option value="TAPÓN DE LLENADO">TAPÓN DE LLENADO</option>
                        <option value="BAYONETA">BAYONETA</option>
                        <option value="SALPICADURA EN BAYONETA">SALPICADURA EN BAYONETA</option>
                        <option value="SALPICA EN ESCAPE">SALPICA EN ESCAPE</option>
                        <option value="LEVE SALPICADURA EN BAYONETA">LEVE SALPICADURA</option>
                        <option value="VAPOR EN BAYONETA">VAPOR EN BAYONETA</option>
                        <option value="VAPOR EN RESPIRADERO">VAPOR EN RESPIRADERO</option>
                        <option value="RESPIRADERO">RESPIRADERO</option>
                        <option value="NO TIENE">NO TIENE</option>
                        <option value="NO VISTO - REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="checkEnginePilot">Piloto Check Engine</label>
                     <select
                        name="checkEnginePilot"
                        id="checkEnginePilot"
                        value={ checkEnginePilot }
                        onChange={ handleMechanicState }>
                        <option value="BUENO">BUENO</option>
                        <option value="TIENE">TIENE</option>
                        <option value="DIGITAL">DIGITAL</option>
                        <option value="ANÁLOGO">ANALOGO</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVA">NO ACTIVA</option>
                        <option value="INTERMITENTE">INTERMITENTE</option>
                        <option value="NO FUNCIONA">NO FUNCIONA</option>
                        <option value="NO VISTO REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="absPilot">Piloto ABS</label>
                     <select
                        name="absPilot"
                        id="absPilot"
                        value={ absPilot }
                        onChange={ handleMechanicState }>
                        <option value="BUENO">BUENO</option>
                        <option value="TIENE">TIENE</option>
                        <option value="DIGITAL">DIGITAL</option>
                        <option value="ANÁLOGO">ANALOGO</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVA">NO ACTIVA</option>
                        <option value="INTERMITENTE">INTERMITENTE</option>
                        <option value="NO FUNCIONA">NO FUNCIONA</option>
                        <option value="NO VISTO REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="airbagPilot">Piloto Airbag</label>
                     <select
                        name="airbagPilot"
                        id="airbagPilot"
                        value={ airbagPilot }
                        onChange={ handleMechanicState }>
                        <option value="BUENO">BUENO</option>
                        <option value="TIENE">TIENE</option>
                        <option value="DIGITAL">DIGITAL</option>
                        <option value="ANÁLOGO">ANALOGO</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVA">NO ACTIVA</option>
                        <option value="INTERMITENTE">INTERMITENTE</option>
                        <option value="NO FUNCIONA">NO FUNCIONA</option>
                        <option value="NO VISTO REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="tpmsPilot">Piloto TPMS</label>
                     <select
                        name="tpmsPilot"
                        id="tpmsPilot"
                        value={ tpmsPilot }
                        onChange={ handleMechanicState }>
                        <option value="BUENO">BUENO</option>
                        <option value="TIENE">TIENE</option>
                        <option value="DIGITAL">DIGITAL</option>
                        <option value="ANÁLOGO">ANALOGO</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVA">NO ACTIVA</option>
                        <option value="INTERMITENTE">INTERMITENTE</option>
                        <option value="NO FUNCIONA">NO FUNCIONA</option>
                        <option value="NO VISTO REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="oilPilot">Piloto Aceite</label>
                     <select
                        name="oilPilot"
                        id="oilPilot"
                        value={ oilPilot }
                        onChange={ handleMechanicState }>
                        <option value="BUENO">BUENO</option>
                        <option value="TIENE">TIENE</option>
                        <option value="DIGITAL">DIGITAL</option>
                        <option value="ANÁLOGO">ANALOGO</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVA">NO ACTIVA</option>
                        <option value="INTERMITENTE">INTERMITENTE</option>
                        <option value="NO FUNCIONA">NO FUNCIONA</option>
                        <option value="NO VISTO REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
                  <article className='input-field'>
                     <label htmlFor="batteryPilot">Piloto Batería</label>
                     <select
                        name="batteryPilot"
                        id="batteryPilot"
                        value={ batteryPilot }
                        onChange={ handleMechanicState }>
                        <option value="BUENO">BUENO</option>
                        <option value="TIENE">TIENE</option>
                        <option value="DIGITAL">DIGITAL</option>
                        <option value="ANÁLOGO">ANALOGO</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="NO ACTIVA">NO ACTIVA</option>
                        <option value="INTERMITENTE">INTERMITENTE</option>
                        <option value="NO FUNCIONA">NO FUNCIONA</option>
                        <option value="NO VISTO REVISAR">NO VISTO REVISAR</option>
                        <option value="VER COMENTARIOS">VER COMENTARIOS</option>
                        <option value="NO TIENE">NO TIENE</option>
                     </select>
                  </article>
               </article>

               {/* tires */}
               <article className="input-grid one-grid">
                  <article className="input-field">
                     <label htmlFor="frontTires">
                        Información y estado de llantas delanteras
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='frontTires'
                        id='frontTires'
                        spellCheck="true"
                        placeholder='Marca, serie de la llanta, número de rin, estado'
                        value={ frontTires }
                        onChange={ handleMechanicState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="rearTires">
                        Información y estado de llantas traseras
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='rearTires'
                        id='rearTires'
                        spellCheck="true"
                        placeholder='Marca, serie de la llanta, número de rin, estado'
                        value={ rearTires }
                        onChange={ handleMechanicState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="replacementTire">
                        Información y estado de llanta de repuesto
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='replacementTire'
                        id='replacementTire'
                        spellCheck="true"
                        placeholder='Marca, serie de la llanta, número de rin, estado'
                        value={ replacementTire }
                        onChange={ handleMechanicState }
                     />
                  </article>
               </article>

               {/* tools */}
               <article className="input-grid pt">
                  <article className="input-field">
                     <label htmlFor="tireCarrier">Porta Llanta</label>
                     <input
                        lang='es'
                        type="text"
                        name='tireCarrier'
                        id='tireCarrier'
                        spellCheck="true"
                        placeholder='Estado de porta llanta'
                        value={ tireCarrier }
                        onChange={ handleMechanicState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="tools">Herramientas</label>
                     <select
                        name='tools'
                        id='tools'
                        value={ tools }
                        onChange={ handleMechanicState }>
                        <option value="TIENE MICA Y LLAVE">TIENE MICA Y LLAVE</option>
                        <option value="TIENE MICA, HACE FALTA LLAVE">TIENE MICA, HACE FALTA LLAVE</option>
                        <option value="TIENE LLAVE, HACE FALTA MICA">TIENE LLAVE, HACE FALTA MICA</option>
                        <option value="TIENE MICA, HACE FALTA COMPLEMENTO DE LLAVE">TIENE MICA, HACE FALTA COMPLEMENTO DE LLAVE</option>
                        <option value="TIENE LLAVE, HACE FALTA MANIVELA DE MICA">TIENE LLAVE, HACE FALTA MANIVELA DE MICA</option>
                        <option value="FALTA MANIVELA DE MICA / NO PORTA LLAVE">FALTA MANIVELA DE MICA / NO PORTA LLAVE</option>
                        <option value="TIENE YACK Y LLAVE">TIENE YACK Y LLAVE</option>
                        <option value="TIENE YACK, HACE FALTA LLAVE">TIENE YACK, HACE FALTA LLAVE</option>
                        <option value="NO TIENE YACK, TIENE LLAVE">NO TIENE YACK, TIENE LLAVE</option>
                        <option value="TIENE MICA, LLAVE NO VISTA">TIENE MICA, LLAVE NO VISTA</option>
                        <option value="TIENE LLAVE, MICA NO VISTA">TIENE LLAVE, MICA NO VISTA</option>
                        <option value="TIENE MICA Y CRUZ">TIENE MICA Y CRUZ</option>
                        <option value="MICA EN MAL ESTADO, PORTA LLAVE">MICA EN MAL ESTADO, PORTA LLAVE</option>
                        <option value="LLAVE EN MAL ESTADO, PORTA MICA">LLAVE EN MAL ESTADO, PORTA MICA</option>
                        <option value="LLAVE EN MAL ESTADO, NO PORTA MICA">LLAVE EN MAL ESTADO, NO PORTA MICA</option>
                        <option value="MICA EN MAL ESTADO, NO PORTA LLAVE">MICA EN MAL ESTADO, NO PORTA LLAVE</option>
                        <option value="NO PORTA MICA, TIENE CRUZ">NO PORTA MICA, TIENE CRUZ</option>
                        <option value="NO PORTA / ASISTENCIA VIAL">NO PORTA / ASISTENCIA VIAL</option>
                        <option value="DAÑADOS">DAÑADOS</option>
                        <option value="NO PORTA">NO PORTA</option>
                        <option value="NO UTILIZA">NO UTILIZA</option>
                        <option value="NO VISTO - REVISAR">NO VISTO - REVISAR</option>
                     </select>
                  </article>
                  <article className="input-field">
                     <label htmlFor="board">Estado del tablero</label>
                     <input
                        lang='es'
                        type="text"
                        name='board'
                        id='board'
                        spellCheck="true"
                        placeholder='Estado del tablero'
                        value={ board }
                        onChange={ handleMechanicState }
                     />
                  </article>
               </article>

               {/* chasisState */}
               <article className="input-grid one-grid pt">
                  <article className="input-field">
                     <label htmlFor="chasisCondition">
                        Condición de chasis y puente de suspensión
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='chasisCondition'
                        id='chasisCondition'
                        spellCheck="true"
                        placeholder='Condición del chasis y puente de suspensión'
                        value={ chasisCondition }
                        onChange={ handleMechanicState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="batteryTest">
                        Test de medición de Batería
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='batteryTest'
                        id='batteryTest'
                        spellCheck="true"
                        placeholder='Test de medición de batería'
                        value={ batteryTest }
                        onChange={ handleMechanicState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="acCondition">
                        Funcionamiento del sistema de Aire Acondicionado
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='acCondition'
                        id='acCondition'
                        spellCheck="true"
                        placeholder='Funcionamiento del sistema de aire acondicionado'
                        value={ acCondition }
                        onChange={ handleMechanicState }
                     />
                  </article>
                  <article className="input-field">
                     <label htmlFor="vacuumGauge">
                        Prueba de fuga de vacío por medio de vacuómetro
                     </label>
                     <input
                        lang='es'
                        type="text"
                        name='vacuumGauge'
                        id='vacuumGauge'
                        spellCheck="true"
                        placeholder='Prueba de fuga de vacío por medio de vacuómetro'
                        value={ vacuumGauge }
                        onChange={ handleMechanicState }
                     />
                  </article>
               </article>

               {/* cylinders */}
               <article className="input-grid one-grid">
                  <article className="input-grid four-grid pt">
                     <article className="input-field">
                        <label htmlFor="cylinder1">Cilindro 1</label>
                        <input
                           type="text"
                           name='cylinder1'
                           id='cylinder1'
                           value={ cylinder1 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder2">Cilindro 2</label>
                        <input
                           type="text"
                           name='cylinder2'
                           id='cylinder2'
                           value={ cylinder2 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder3">Cilindro 3</label>
                        <input
                           type="text"
                           name='cylinder3'
                           id='cylinder3'
                           value={ cylinder3 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder4">Cilindro 4</label>
                        <input
                           type="text"
                           name='cylinder4'
                           id='cylinder4'
                           value={ cylinder4 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder5">Cilindro 5</label>
                        <input
                           type="text"
                           name='cylinder5'
                           id='cylinder5'
                           value={ cylinder5 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder6">Cilindro 6</label>
                        <input
                           type="text"
                           name='cylinder6'
                           id='cylinder6'
                           value={ cylinder6 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder7">Cilindro 7</label>
                        <input
                           type="text"
                           name='cylinder7'
                           id='cylinder7'
                           value={ cylinder7 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                     <article className="input-field">
                        <label htmlFor="cylinder8">Cilindro 8</label>
                        <input
                           type="text"
                           name='cylinder8'
                           id='cylinder8'
                           value={ cylinder8 }
                           onChange={ handleMechanicState }
                        />
                     </article>
                  </article>
                  <article className="input-field">
                     <label htmlFor="cylindersReason">Motivo por el que no se midieron compresiones a motor</label>
                     <input
                        type="text"
                        name='cylindersReason'
                        id='cylindersReason'
                        value={ cylindersReason }
                        onChange={ handleMechanicState }
                     />
                  </article>
               </article>

               <Expenses
                  alertState={ alertState }
                  alertContent={ alertContent }
                  setAlertState={ setAlertState }
                  setAlertContent={ setAlertContent }
               />

               <button
                  type='submit'
                  className='btn btn-submit'>
                  Guardar y continuar
               </button>
            </form>
         </section>

         { showPricesModal &&
            <PricesModal
               setShowPricesModal={ setShowPricesModal }
            />
         }

         { showNotesModal &&
            <NotesProvider>
               <NotesModal
                  setShowNotesModal={ setShowNotesModal }
                  setAlertState={ setAlertState }
                  setAlertContent={ setAlertContent }
               />
            </NotesProvider>
         }

         <SaveProgress
            setAlertState={ setAlertState }
            setAlertContent={ setAlertContent }
         />
      </>
   );
};