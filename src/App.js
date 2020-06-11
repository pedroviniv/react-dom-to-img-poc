import React from 'react';
import Table from './Table';
import { toTableStructure } from './tableMapper';
import './style.css';
import ExportArea from './ExportArea';
import { PNG, JPEG, SVG } from './ExportArea/imgFormats';

function rowToIdMapper(row) {
  return row.id;
}

function App() {

  const tableRef = React.createRef(null);
  const exportAreaRef = React.createRef(null);

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

  function exportImage(format) {
    console.log('exportAreaRef: ', exportAreaRef);
    exportAreaRef.current.export(format, tableRef.current);
  }

  return (
    <div>
      <h1>react-dom-to-img-poc</h1>
      <h3>Some table data to be exported</h3>
      <Table columns={columns} rows={rows} rowToIdMapper={rowToIdMapper} setRef={ref => tableRef.current = ref} />
      <button className='export-button' onClick={ev => exportImage(PNG)}>Generate PNG Image!</button>
      <button className='export-button' onClick={ev => exportImage(JPEG)}>Generate JPEG Image!</button>
      <button className='export-button' onClick={ev => exportImage(SVG)}>Generate SVG Image!</button>

      <div>
        <ExportArea ref={exportAreaRef} />
      </div>
    </div>
  );
}

export default App;
