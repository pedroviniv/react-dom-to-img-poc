import React from 'react';

const TableRow = ({columns, id, row}) => {
  return (
    <tr key={id}>
      {columns.map(column =>
        <td key={column}>{row[column]}</td>
      )}
    </tr>
  );
};

const Table = ({setRef, columns, rows, rowToIdMapper}) => {

  const columnsKeys = Object.keys(columns);

  return (
    <table className='table table-striped' ref={setRef}>
      <thead>
        <tr>
          {columnsKeys.map(columnKey => <th key={columnKey}>{columns[columnKey]}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          const rowId = rowToIdMapper(row);
          return <TableRow key={rowId} id={rowId} columns={columnsKeys} row={row} />;
        })}
      </tbody>
    </table>
  );
}

export default Table;