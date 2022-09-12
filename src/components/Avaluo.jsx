import React, { useState, useEffect } from 'react';
/* firebase */
import { db } from '../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
/* hooks */
import { useNewAvaluo } from '../contexts/NewAvaluoContext';
import { useParams, useNavigate } from 'react-router-dom';
/* helpers */
import numbro from 'numbro';
import { formatDate } from '../helpers/formatDate';
import { numberToString } from '../helpers/numberToString';
import { deleteAvaluo } from '../helpers/deleteAvaluo';
/* components */
import { Alert } from '../styled-components/Alert';
import { BaseModal } from './BaseModal';
import { ExportModal } from './ExportModal';
import { ExpensesBar } from './ExpensesBar';
import { ImageUploader } from './ImageUploader';
/* assets */
import { FiArrowLeft, FiEdit, FiTrash2, FiDollarSign } from 'react-icons/fi';
import { FaRegFilePdf } from 'react-icons/fa';

export const Avaluo = ({
   targetAvaluo,
   setTargetAvaluo,
   alertState,
   alertContent,
   setAlertState,
   setAlertContent,
   setEditAvaluo,
}) => {
   /* hooks */
   const navigate = useNavigate();
   const { id } = useParams();
   const { setNewAvaluo } = useNewAvaluo();

   /* props */
   const {
      plate,
      brand,
      model,
      year,
      avaluoType,
      engineTarget,
      engineCar,
      chasisTarget,
      chasisCar,
      vinTarget,
      vinCar
   } = targetAvaluo.content;
   const { commercialPrice = 0, agencyPrice = 0 } = targetAvaluo.content;

   /* states */
   const [showAvaluoInfo, setShowAvaluoInfo] = useState(false);
   const [showBaseModal, setShowBaseModal] = useState(false);
   const [exportValues, setExportValues] = useState({
      state: false,
      exportAs: ''
   });
   const [addDefaultValue, setAddDefaultValue] = useState(false);
   const [commercialDefaultValue, setCommercialDefaultValue] = useState(numbro.unformat(commercialPrice));
   const [agencyDefaultValue, setAgencyDefaultValue] = useState(numbro.unformat(agencyPrice));

   /* handleBack */
   const handleBack = () => {
      setTargetAvaluo({
         isSomething: false,
         content: {},
      });
      navigate("/");
   };

   /* handleChangeDefault */
   const handleChangeDefault = () => {
      setAddDefaultValue(!addDefaultValue);
   };

   /* handleDefaultState */
   const handleDefaultState = ({ target }) => {
      const targetId = target.id;
      if( targetId === 'commercial' ) {
         setCommercialDefaultValue(target.value);
      } else if ( targetId === 'agency' ) {
         setAgencyDefaultValue(target.value);
      }
   };

   /* handleSubmitDefault */
   const handleSubmitDefault = async (e) => {
      e.preventDefault();
      // First we need to validate if a value is equal to zero
      if( isNaN(commercialDefaultValue) ) {
         setAlertState(true);
         setAlertContent({
            type: 'errror',
            message: 'Asigna el valor comercial del vehículo',
         });
         return;
      }

      // Now we are sure that vehicle's values are completed, we proceed to update the firestore document
      try {
         const docRef = doc(db, 'avaluos', id);
         const newAvaluoWithDefaultValues = {
            ...targetAvaluo.content,
            commercialPrice: numbro(commercialDefaultValue).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
            agencyPrice: numbro(agencyDefaultValue).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
            images: [],
         };
         await updateDoc(docRef, newAvaluoWithDefaultValues);
         setTargetAvaluo({ isSomething: true, content: newAvaluoWithDefaultValues });
         setAddDefaultValue(false);
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Base actualizada con éxito',
         });
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: 'Ha habido un error, vuelve a intentarlo',
         });
      };
   };

   /* handleExport */
   const handleExport = () => {
      setExportValues({ state: true, exportAs: avaluoType });
   };

   /* handleDelete */
   const handleDelete = async () => {
      try {
         await deleteAvaluo(id);
         setAlertState(true);
         setAlertContent({
            type: 'success',
            message: 'Avalúo Eliminado',
         });
         setShowAvaluoInfo(false);
         setNewAvaluo({
            avaluoType: 'PARTICULAR',
            applicant: '',
            costumer: '',
            plate: '',
            sticker: 'NO TIENE',
            brand: '',
            model: '',
            year: new Date().getFullYear(),
            color: '',
            origin: '',
            from: 'AGENCIA',
            odometer: '',
            fuel: 'GASOLINA',
            cylinders: 0,
            cylindersProm: '',
            transmission: 'AUTOMÁTICO',
            traction: '4X2',
            runningIn: '',
            capacity: '',
            targetOutDated: "",
            targetAs: '',
            engineTarget: '',
            chasisTarget: '',
            vinTarget: '',
            engineCar: '',
            chasisCar: '',
            vinCar: '',
            extras: '',
            expenses: [],
            totalExpenses: 0,
            power: 'BUENA',
            smoke: 'NORMAL',
            combustion: 'NORMAL',
            temperature: 'NORMAL',
            engineRunning: 'NORMAL',
            engineBlowing: 'NO TIENE',
            checkEnginePilot: 'BUENO',
            absPilot: 'BUENO',
            airbagPilot: 'BUENO',
            tpmsPilot: 'BUENO',
            oilPilot: 'BUENO',
            batteryPilot: 'BUENO',
            frontTires: '',
            rearTires: '',
            replacementTire: '',
            tireCarrier: 'BUENO',
            tools: 'TIENE MICA Y LLAVE',
            board: '',
            chasisCondition: '',
            batteryTest: 'BATERÍA BUENA - ESTADO AL 100% / NIVEL DE CARGA AL 100% (SE ADJUNTA COMPROBANTE)',
            acCondition: '',
            vacuumGauge: 'PRUEBA CON VACUÓMETRO NO REPORTA FUGAS DE VACÍO A LA FECHA, LECTURA FUE DE: ',
            cylindersCondition: {
               cylinder1: 0,
               cylinder2: 0,
               cylinder3: 0,
               cylinder4: 0,
               cylinder5: 0,
               cylinder6: 0,
               cylinder7: 0,
               cylinder8: 0
            },
            cylindersReason: '',
            images: [],
            comments: '',
            state: 'Pendiente'
         })
         navigate("/");
      } catch(error) {
         console.log(error);
         setAlertState(true);
         setAlertContent({
            type: 'error',
            message: "Hubo un error, vuelve a intentarlo"
         });
      };
   };

   /* handleEdit */
   const handleEdit = () => {
      setNewAvaluo({
         ...targetAvaluo.content,
         images: [],
      });
      setEditAvaluo(true);
      navigate('/new/general');
   };

   /* Effect will validate if there is something to show, if it's no then redirect to homepage */
   useEffect(() => {
      if( targetAvaluo.isSomething ) {
         setShowAvaluoInfo(true);
      } else if( targetAvaluo.isSomething === false ) {
         navigate("/");
      }
   }, [targetAvaluo]);

   useEffect(() => {
      const agencyDefaultValue = commercialDefaultValue / 1.23;
      setAgencyDefaultValue(agencyDefaultValue.toFixed(2));
   }, [commercialDefaultValue]);

   useEffect(() => {
      setCommercialDefaultValue(numbro.unformat(commercialPrice));
      setAgencyDefaultValue(numbro.unformat(agencyPrice));
   }, [targetAvaluo]);

   return (
      <>
         <header className='header avaluo-header'>
            <article className="header-content avaluo-header container">
               <button
                  className='btn btn-back'
                  onClick={ handleBack }>
                  <FiArrowLeft />
                  Regresar
               </button>
               <h3>Asegúrate de verificar todos los datos antes de exportar el PDF</h3>
            </article>
         </header>

         <section className="avaluo-container">
            <section className="avaluo-wrapper container">
               <aside className="avaluo-nav">
                  <nav className='avaluo-actions'>
                     <article className="button-container">
                        <p>Exportar</p>
                        <button
                           className='btn btn-action'
                           onClick={ handleExport }>
                           <FaRegFilePdf className='btn-icon' />
                           Generar PDF
                        </button>
                     </article>
                     <article className="button-container">
                        <p>Editar</p>
                        <button
                           className='btn btn-action'
                           onClick={ handleEdit }>
                           <FiEdit className='btn-icon' />
                           Editar Avalúo
                        </button>
                     </article>
                     <article className="button-container">
                        <p>Administrador</p>
                        <button
                           className='btn btn-action'
                           onClick={ () => setShowBaseModal(true) }>
                           <FiDollarSign className='btn-icon' />
                           Agregar base
                        </button>
                     </article>
                     <article className="button-container">
                        <p>Eliminar</p>
                        <button
                           className='btn btn-action bg-primary'
                           onClick={ handleDelete }>
                           <FiTrash2 className='btn-icon' />
                           Eliminar Avalúo
                        </button>
                     </article>
                  </nav>
               </aside>
               { showAvaluoInfo &&
                  <section className='avaluo-info'>
                     {/* title */}
                     <section className="avaluo-info-section">
                        <h2>{ plate } { brand } { model } { year }</h2>
                        <p>Tipo de Avalúo: { targetAvaluo.content.avaluoType }</p>
                        <p>Solicitante: { targetAvaluo.content.applicant }</p>
                        <p>Cliente: { targetAvaluo.content.costumer }</p>
                     </section>

                     {/* target data */}
                     <section className="avaluo-info-section">
                        <h2>Datos de tarjeta</h2>
                        <p className='avaluo-data full-width-data'>
                           Fecha: { formatDate(targetAvaluo.content.created) }
                        </p>
                        <p className='avaluo-data'>
                           Tarjeta Vence: { targetAvaluo.content.targetOutDated }
                        </p>
                        <p className='avaluo-data'>
                           En calidad de: { targetAvaluo.content.targetAs }
                        </p>
                        <article className="avaluo-info-grid">
                           <p className='avaluo-data'>
                              Placa Frontal: { targetAvaluo.content.frontalSticker }
                           </p>
                           <p className='avaluo-data'>
                              Placa Trasera: { targetAvaluo.content.rearSticker }
                           </p>
                           <p className='avaluo-data'>
                              Placa Parabrisas: { targetAvaluo.content.thirdSticker }
                           </p>
                           <p className='avaluo-data'>
                              Marca: { targetAvaluo.content.brand }
                           </p>
                           <p className='avaluo-data'>
                              Módelo: { targetAvaluo.content.model }
                           </p>
                           <p className='avaluo-data'>
                              Año: { targetAvaluo.content.year }
                           </p>
                           <p className='avaluo-data'>
                              Color: { targetAvaluo.content.color }
                           </p>
                           <p className='avaluo-data'>
                              Tipo: { targetAvaluo.content.carType }
                           </p>
                           <p className='avaluo-data'>
                              Origen: { targetAvaluo.content.origin }
                           </p>
                           <p className='avaluo-data'>
                              Procedencia: { targetAvaluo.content.from }
                           </p>
                           <p className='avaluo-data'>
                              Odómetro: { targetAvaluo.content.odometer }
                           </p>
                           <p className='avaluo-data'>
                              Combustible: { targetAvaluo.content.fuel }
                           </p>
                           <p className='avaluo-data'>
                              Cilindros: { targetAvaluo.content.cylinders }
                           </p>
                           <p className='avaluo-data'>
                              Cilindrada: { targetAvaluo.content.cylindersProm }
                           </p>
                           <p className='avaluo-data'>
                              Transmisión: { targetAvaluo.content.transmission }
                           </p>
                           <p className='avaluo-data'>
                              Tracción: { targetAvaluo.content.traction }
                           </p>
                           <p className='avaluo-data'>
                              Rodaje: { targetAvaluo.content.runningIn }
                           </p>
                           <p className='avaluo-data'>
                              Capacidad: { targetAvaluo.content.capacity }
                           </p>
                        </article>
                     </section>

                     {/* engine-numbers */}
                     <section className="avaluo-info-section">
                        <h2>Números de motor, chasis, y VIN</h2>
                        <section className="target-data">
                           <p className={ engineTarget !== engineCar
                              ? 'avaluo-data different'
                              : 'avaluo-data'
                           }>
                              Número de motor en tarjeta: { targetAvaluo.content.engineTarget }
                           </p>
                           <p className={ engineTarget !== engineCar
                              ? 'avaluo-data different'
                              : 'avaluo-data'
                           }>
                              Número de motor en vehículo: { targetAvaluo.content.engineCar }
                           </p>
                        </section>
                        <section className="target-data">
                           <p className={ chasisTarget !== chasisCar
                              ? 'avaluo-data different'
                              : 'avaluo-data'
                           }>
                              Número de chasis en tarjeta: { targetAvaluo.content.chasisTarget }
                           </p>
                           <p className={ chasisTarget !== chasisCar
                              ? 'avaluo-data different'
                              : 'avaluo-data'
                           }>
                              Número de chasis en vehículo: { targetAvaluo.content.chasisCar }
                           </p>
                        </section>
                        <section className="target-data">
                           <p className={ vinTarget !== vinCar
                              ? 'avaluo-data different'
                              : 'avaluo-data'
                           }>
                              Número de VIN en tarjeta: { targetAvaluo.content.vinTarget }
                           </p>
                           <p className={ vinTarget !== vinCar
                              ? 'avaluo-data different'
                              : 'avaluo-data'
                           }>
                              Número de VIN en vehículo: { targetAvaluo.content.vinCar }
                           </p>
                        </section>
                        { targetAvaluo.content.numbersReason !== '' &&
                           <section className="target-data">
                              <p className='avaluo-data'>RAZÓN POR LAS QUE NO SE VIERON NÚMEROS GRABADOS: { targetAvaluo.content.numbersReason }</p>
                           </section>
                        }
                     </section>

                     {/* extras */}
                     <section className="avaluo-info-section">
                        <h2>Extras del vehículo</h2>
                        <p className='avaluo-data no-styles'>{ targetAvaluo.content.extras }</p>
                     </section>

                     {/* technical-data */}
                     <section className="avaluo-info-section">
                        <h2>Datos ténicos del vehículo</h2>
                        <article className="avaluo-info-grid">
                           <p className='avaluo-data'>
                              Potencia: { targetAvaluo.content.power }
                           </p>
                           <p className='avaluo-data'>
                              Color de humo: { targetAvaluo.content.smoke }
                           </p>
                           <p className='avaluo-data'>
                              Combustión: { targetAvaluo.content.combustion }
                           </p>
                           <p className='avaluo-data'>
                              Temperatura: { targetAvaluo.content.temperature }
                           </p>
                           <p className='avaluo-data'>
                              Marcha de motor: { targetAvaluo.content.engineRunning }
                           </p>
                           <p className='avaluo-data'>
                              Soplo en motor: { targetAvaluo.content.engineBlowing }
                           </p>
                           <p className='avaluo-data'>
                              Piloto Check Engine: { targetAvaluo.content.checkEnginePilot }
                           </p>
                           <p className='avaluo-data'>
                              Piloto ABS: { targetAvaluo.content.absPilot }
                           </p>
                           <p className='avaluo-data'>
                              Piloto Airbag: { targetAvaluo.content.airbagPilot }
                           </p>
                           <p className='avaluo-data'>
                              Piloto TPMS: { targetAvaluo.content.tpmsPilot }
                           </p>
                           <p className='avaluo-data'>
                              Piloto de Aceite: { targetAvaluo.content.oilPilot }
                           </p>
                           <p className='avaluo-data'>
                              Piloto de Batería: { targetAvaluo.content.batteryPilot }
                           </p>
                        </article>
                        <article className="avaluo-info-grid full-width">
                           <p className='avaluo-data'>
                              Llantas delanteras: { targetAvaluo.content.frontTires }
                           </p>
                           <p className='avaluo-data'>
                              Llantas traseras: { targetAvaluo.content.rearTires }
                           </p>
                           <p className='avaluo-data'>
                              Llantas de repuesto: { targetAvaluo.content.replacementTire }
                           </p>
                           <p className='avaluo-data'>
                              Condición de chasis, y puente de suspensión: { targetAvaluo.content.chasisCondition }
                           </p>
                           <p className='avaluo-data'>
                              Test de medición de batería: { targetAvaluo.content.batteryTest }
                           </p>
                           <p className='avaluo-data'>
                              Funcionamiento del sistema de aire acondicionado: { targetAvaluo.content.acCondition }
                           </p>
                           <p className='avaluo-data'>
                              Prueba del vacuómetro: { targetAvaluo.content.vacuumGauge }
                           </p>
                        </article>
                        <article className="avaluo-info-grid mt">
                           <p className='avaluo-data'>
                              Cilindro 1: { targetAvaluo.content.cylindersCondition.cylinder1 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 2: { targetAvaluo.content.cylindersCondition.cylinder2 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 3: { targetAvaluo.content.cylindersCondition.cylinder3 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 4: { targetAvaluo.content.cylindersCondition.cylinder4 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 5: { targetAvaluo.content.cylindersCondition.cylinder5 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 6: { targetAvaluo.content.cylindersCondition.cylinder6 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 7: { targetAvaluo.content.cylindersCondition.cylinder7 }
                           </p>
                           <p className='avaluo-data'>
                              Cilindro 8: { targetAvaluo.content.cylindersCondition.cylinder8 }
                           </p>
                        </article>
                        { targetAvaluo.content.cylindersReason !== '' && 
                           <article className="avaluo-info-grid full-width">
                              <p className='avaluo-data'>
                                 MOTIVO POR EL QUE NO SE MIDIERON COMPRESIONES A MOTOR: { targetAvaluo.content.cylindersReason }
                              </p>
                           </article>
                        }
                     </section>

                     {/* expenses */}
                     <section className='avaluo-info-section'>
                        <h2>Gastos estéticos y mecánicos</h2>
                        { targetAvaluo.content.expenses.map(({ id, description, price }) => {
                           return (
                              <div key={ id } className="avaluo-data flex">
                                 <p>{ description }</p>
                                 <p>{ price }</p>
                              </div>
                           );
                        }) }
                        <div className="avaluo-data flex bg-primary">
                           <p>Costos ingresados: { targetAvaluo.content.expenses.length }</p>
                           <div className='total-expenses'>
                              <p>Total gastos:</p>
                              <p>{ numbro(targetAvaluo.content.totalExpenses).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</p>
                           </div>
                        </div>
                     </section>

                     {/* comments */}
                     <section className="avaluo-info-section">
                        <h2>Comentarios</h2>
                        <p className='avaluo-data comments'>
                           { targetAvaluo.content.comments }
                        </p>
                     </section>

                     {/* carValue */}
                     { avaluoType !== 'NIVEL DE COMPRESIONES' &&
                        <section className="avaluo-info-section">
                           <h2>Valor del vehículo</h2>
                           <p>Base de { plate } { brand } { model } { year } actualmente es de: { numbro(targetAvaluo.content.base).formatCurrency({ thousandSeparated: true, mantissa: 2 }) }</p>
                           <ExpensesBar
                              percentage={ targetAvaluo.content.expensesPercentage }
                           />
                           <button
                              className='btn btn-add-max-value'
                              onClick={ handleChangeDefault }>
                              { !addDefaultValue ? 'Aproximar manualmente' : 'Cancelar' }
                           </button>
                           <article className='avaluo-info-grid two-columns'>
                              <div className='value-container'>
                                 <p>Valor comercial</p>
                                 { addDefaultValue === false ?
                                    <p
                                       className="data-style">
                                       { targetAvaluo.content.commercialPrice === undefined
                                          ? 'Pendiente de base'
                                          : numbro(targetAvaluo.content.commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 })
                                       }
                                    </p> 
                                    :
                                    <div className="data-style">
                                       <input
                                          type="number"
                                          name='commercial-default-price'
                                          id="commercial"
                                          className='default-input'
                                          value={ commercialDefaultValue }
                                          onChange={ handleDefaultState }
                                          onKeyPress={ (e) => {
                                             if( e.key === 'Enter' ) {
                                                handleSubmitDefault(e);
                                             };
                                          } }
                                       />
                                    </div>
                                 }
                              </div>
                              <div className='value-container'>
                                 <p>Expresado en letras</p>
                                 <p className="data-style text-price">
                                    { targetAvaluo.content.commercialPrice === undefined
                                       ? 'Pendiente de base'
                                       : numberToString(numbro.unformat(targetAvaluo.content.commercialPrice))
                                    }
                                 </p>
                              </div>
                              <div className='value-container'>
                                 <p>Valor de Agencia</p>
                                 { addDefaultValue === false ?
                                    <p
                                       className="data-style">
                                       { targetAvaluo.content.agencyPrice === undefined
                                          ? 'Pendiente de base'
                                          : numbro(targetAvaluo.content.agencyPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 })
                                       }
                                    </p>
                                    :
                                    <div className='data-style'>
                                       <input
                                          type="number"
                                          name='agency-default-price'
                                          id="agency"
                                          className='default-input'
                                          value={ agencyDefaultValue }
                                          onChange={ handleDefaultState }
                                          onKeyPress={ (e) => {
                                             if( e.key === 'Enter' ) {
                                                handleSubmitDefault(e);
                                             };
                                          } }
                                       />
                                    </div>
                                 }
                              </div>
                              <div className='value-container'>
                                 <p>Expresado en letras</p>
                                 <p className="data-style text-price">
                                    { targetAvaluo.content.agencyPrice === undefined
                                       ? 'Pendiente de base'
                                       : numberToString(numbro.unformat(targetAvaluo.content.agencyPrice))
                                    }
                                 </p>
                              </div>
                           </article>
                        </section>
                     }
                  </section>
               }
            </section>
         </section>

         { showBaseModal &&
            <BaseModal
               targetAvaluo={ targetAvaluo }
               setTargetAvaluo={ setTargetAvaluo }
               setAlertState={ setAlertState }
               setAlertContent={ setAlertContent }
               setShowBaseModal={ setShowBaseModal }
            />
         }

         { exportValues.state === true &&
            <ExportModal
               exportValues={ exportValues }
               setExportValues={ setExportValues }
               targetAvaluo={ targetAvaluo }
               setAlertState={ setAlertState }
               setAlertContent={ setAlertContent }
            />
         }

         <Alert
            type={alertContent.type}
            message={alertContent.message}
            alertState={alertState}
            setAlertState={setAlertState}
         />
      </>
   );
};