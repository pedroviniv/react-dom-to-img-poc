import React, { useState } from 'react';
import Table from './Table';
import { toTableStructure } from './tableMapper';
import { toPng } from 'html-to-image';
import './style.css';

function rowToIdMapper(row) {
  return row.id;
}

function App() {

  const tableRef = React.createRef(null);
  const [exportedImgUrl, setExportedImgUrl] = useState('');
  const [exportError, setExportError] = useState('');

  const [columns, rows] = toTableStructure(['Id', 'Nome', 'Sobrenome'], [
    {
      id: 1,
      name: 'Beltrano',
      lastName: 'Fulano de tal'
    },
    {
      id: 2,
      name: 'Fulano',
      lastName: 'Sicrano de tal'
    },
  ]);

  /**
   * generates a image of the tableRef.current
   * @param {*} ev 
   */
  function generateImg(ev) {
    console.log('[generateImg] table ref: ', tableRef);
    toPng(tableRef.current)
      .then(dataUrl => {
        setExportedImgUrl(dataUrl);
      })
      .catch(err => {
        setExportError(err);
      });
  }

  return (
    <div>
      <h1>react-dom-to-img-poc</h1>
      <h3>Some table data to be exported</h3>
      <Table columns={columns} rows={rows} rowToIdMapper={rowToIdMapper} setRef={ref => tableRef.current = ref} />
      <button className='export-button' onClick={generateImg}>Generate Image!</button>

      <div>
        <h3>Exported data:</h3>
        {/* rendering error msg in case something fail in export */}
        {exportError}
        {/* rendering img with the exported img url in case something is exported */}
        {exportedImgUrl ? <img src={exportedImgUrl} alt='table'/> : <></>}
      </div>
    </div>
  );
}

export default App;
