import React from 'react';
import { Table } from 'react-bootstrap';

function LectureTable() {
    return (
      <Table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ort</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>HTL Wien Ottakring</td>
          <td>20.12.2023
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>AHS Wien</td>
          <td>13.12.2023</td>
        </tr>
      </tbody>
      </Table>
    );
  }

  export default LectureTable;