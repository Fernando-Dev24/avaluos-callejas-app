import React, { useState, useEffect } from 'react';
/* helpers */
import html2pdf from 'html2pdf.js';
/* components */
import { GeneratePdf } from './GeneratePdf';
import { GenerateMechanicPdf } from './GenerateMechanicPdf';
import { GenerateCompressionsReport } from './GenerateCompressionsReport';
/* assets */
import { FiXCircle, FiCheckCircle, FiCircle } from 'react-icons/fi';

export const ExportModal = ({
   exportValues,
   setExportValues,
   targetAvaluo,
   setAlertState,
   setAlertContent,
}) => {
   /* props */
   const { plate, brand, model, year, avaluoType } = targetAvaluo.content;
   
   /* states */
   const [showPdf, setShowPdf] = useState(false);
   const [isResponsive, setIsResponsive] = useState(false);
   const [imagesFiles, setImagesFiles] = useState([]);
   const [images, setImages] = useState([]);

   /* functions */
   const exportPdf = async () => {
      const avaluosPages = [...document.querySelectorAll('.avaluo-page')];
      let customFileName = '';

      customFileName = `${ plate } ${ brand } ${ model } ${ year }`;
      
      // Options to export the pdf document
      let options = {
         margin: 0,
         filename: customFileName,
         image: { type: 'jpg', quality: 1 },
         html2canvas: { scale: 4 },
         jsPDF: { format: 'letter', orientation: 'portrait', compress: true, },
      };

      // Export multiple pages
      let doc = html2pdf().set(options).from(avaluosPages[0]).toPdf();
      for( let index = 1; index < avaluosPages.length; index++ ) {
         doc = doc.get('pdf').from(avaluosPages[index]).toContainer().toCanvas().toPdf();
      };

      // Save the file
      try {
         doc.save();
         setAlertState(true);
         setAlertContent({ type: 'success', message: 'Creando avalúo...' });
      } catch(error) {
         setAlertState(true);
         setAlertContent({ type: 'error', message: 'Hubo un error, vuelve a intentarlo' });
      };
   };

   /* handleCloseModal */
   const handleCloseModal = () => {
      setExportValues({
         state: false,
         exportAs: ''
      });
   };

   /* export values */
   const handleExport = ({ target }) => {
      const targetId = target.id;
      setExportValues({ ...exportValues, carValue: targetId });
      setShowPdf(true);
   };

   /* handleFilesChange */
   const handleFilesChange = ({ target }) => {
      const { files } = target;
      const filesArr = [];
      for (const file of Object.keys(files)) {
         filesArr.push(files[file]);
      };
      setImagesFiles(filesArr);
   };

   useEffect(() => {
      if( imagesFiles.length > 0 ) {
         const promises = imagesFiles.map((file) => {
            return new Promise((resolve, reject) => {
               const fileReader = new FileReader();
               fileReader.onload = ({ target }) => {
                  const { result } = target;
                  result && resolve(result);
               };
               fileReader.onabort = () => reject(new Error('Se interrumpió la lectura del archivo'));
               fileReader.onerror = () => reject(new Error('Hubo un error, vuelve a intentarlo'));
               fileReader.readAsDataURL(file);
            });
         });

         Promise.all(promises).then((images) => setImages(images));
      };
   }, [ imagesFiles ]);

   useEffect(() => {
      window.addEventListener('keydown', ({ key }) => key === 'Escape' && setExportValues({ state: false, exportAs: '' }));
      return () => {
         window.addEventListener('keydown', ({ key }) => key === 'Escape' && setExportValues({ state: false, exportAs: '' }));
      };
   }, [setExportValues]);

   return (
      <>
         <section className="shadow-modal">
            <article className={ showPdf
               ? 'modal modal-pdf modal-overflow'
               : 'modal half-width cancel-modal'
            }>
               { showPdf ?
                  <>
                     { avaluoType !== 'DIAGNOSTICO MECANICO' ?
                        avaluoType !== 'NIVEL DE COMPRESIONES' ?
                           <GeneratePdf
                              exportValues={ exportValues }
                              isResponsive={ isResponsive }
                              targetAvaluo={ targetAvaluo }
                           />
                           :
                           <GenerateCompressionsReport
                              targetAvaluo={ targetAvaluo.content }
                              images={ images }
                              setImages={ setImages }
                              isResponsive={ isResponsive }
                           />
                        :
                        <GenerateMechanicPdf
                           exportValues={ exportValues }
                           isResponsive={ isResponsive }
                           targetAvaluo={ targetAvaluo }
                        />
                     }
                     <nav className='btn-nav'>
                        <button
                           className="btn btn-export"
                           onClick={ exportPdf }>
                           Exportar PDF
                        </button>
                        { avaluoType === 'NIVEL DE COMPRESIONES' &&
                           <label
                              htmlFor="file-uploader"
                              className='btn btn-export input-btn'>
                              <input
                                 type="file"
                                 id="file-uploader"
                                 multiple
                                 accept='image/*'
                                 onChange={ handleFilesChange }
                              />
                              Agregar Imágenes
                           </label>
                        }
                        <button
                              className='btn btn-export'
                              onClick={ () => setIsResponsive(!isResponsive) }>
                              { isResponsive ?
                                 <FiCheckCircle className='btn-icon' />
                                 :
                                 <FiCircle className='btn-icon' />
                              }
                              Adaptar contenido
                           </button>
                        <button
                           className='btn btn-export btn-close-modal'
                           onClick={ handleCloseModal }>
                           Cerrar
                        </button>
                     </nav>
                  </>
                  :
                  <>
                     <h2 className='less-margin'>¿Cómo quieres exportar el avalúo?</h2>
                     <p>
                        ASEGURATE DE COMPROBAR: <strong>PROCEDENCIA DEL VEHICULO || NÚMERO DE MOTOR, CHASIS, Y VIN || BUSCAR EL AUTO EN
                        AUTOCHECK Y SALVAGEDB || COMPRESIONES DE MOTOR || VERIFICAR SUMA TOTAL DE COSTOS</strong>
                     </p>
                     <nav className='actions-nav'>
                        <button
                           className='btn btn-action recommend'
                           id='NORMAL'
                           onClick={ handleExport }>
                           Exportar PDF Normal
                        </button>
                        <button
                           className='btn btn-action'
                           id='MAX-VALOR'
                           onClick={ handleExport }>
                           Exportar PDF Máximo Valor
                        </button>
                     </nav>
                     <FiXCircle
                        className='btn-icon'
                        onClick={ () => setExportValues({ state: false, exportAs: '' }) }
                     />
                  </>
               }
            </article>
         </section>
      </>
   );
};