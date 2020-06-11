import React from 'react';
import Table from './Table';
import { toTableStructure } from './tableMapper';
import './style.css';
import './assets/style.css';
import ExportArea from './ExportArea';
import { PNG, JPEG, SVG } from './ExportArea/imgFormats';

function rowToIdMapper(row) {
  return row.id;
}

function App() {

  const tableRef = React.createRef(null);
  const exportAreaRef = React.createRef(null);

  // dados gerados com: https://www.4devs.com.br/gerador_de_pessoas
  const [columns, rows] = toTableStructure(['Id', 'Nome', 'Sobrenome'], [
    {
      id: 1,
      name: 'Louise Carla',
      lastName: 'Peixoto'
    },
    {
      id: 2,
      name: 'Benjamin Kaique',
      lastName: 'Figueiredo'
    },
    {
      id: 3,
      name: 'Nicolas Ian',
      lastName: 'Rodrigues'
    },
    {
      id: 4,
      name: 'Aurora Joana',
      lastName: 'Fernandes'
    },
    {
      id: 5,
      name: 'Luna Tereza',
      lastName: 'Campos'
    },
    {
      id: 6,
      name: 'Isadora Maria',
      lastName: 'Peixoto'
    },
  ]);

  function exportImage(format) {
    console.log('exportAreaRef: ', exportAreaRef);
    exportAreaRef.current.export(format, tableRef.current);
  }

  return (
    <div className='container-fluid'>
      <div className="jumbotron" style={{marginTop: '13px'}}>
      <h1>react-dom-to-img-poc</h1>
      </div>
      <h3 className='title'>Some table data to be exported</h3>
      <div className="row">
        <div className='col-md-5'>
          <p class="mb-0">Estes dados foram gerados a partir desta fonte: <a href="https://www.4devs.com.br/gerador_de_pessoas">https://www.4devs.com.br/gerador_de_pessoas</a>  </p>
          <Table columns={columns} rows={rows} rowToIdMapper={rowToIdMapper} setRef={ref => tableRef.current = ref} />
          <div className='btn-group'>
            <button className='btn btn-primary' onClick={ev => exportImage(PNG)}>Generate PNG</button>
            <button className='btn btn-primary' onClick={ev => exportImage(JPEG)}>Generate JPEG</button>
            <button className='btn btn-primary' onClick={ev => exportImage(SVG)}>Generate SVG</button>
          </div>
        </div>
      </div>
      <hr/>
      <ExportArea ref={exportAreaRef} />
    </div>
  );
}

export default App;
