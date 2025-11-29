import React from 'react';

const CountryItem = ({ country, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{country.name}</td>
      <td>{country.capital || 'No especificada'}</td>
      <td>{country.currency || 'No especificada'}</td>
      <td>
        <button onClick={onEdit} className="btn btn-edit">Editar</button>
        <button onClick={onDelete} className="btn btn-delete">Eliminar</button>
      </td>
    </tr>
  );
};

export default CountryItem;