import React, { useState, useEffect } from 'react';
import { getCountries, deleteCountry } from '../services/api';
import CountryItem from "./countryItem.jsx";
import CountryForm from "./countryForm.jsx";


const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await getCountries();
      setCountries(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los países');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este país?')) {
      try {
        await deleteCountry(id);
        fetchCountries();
      } catch (err) {
        setError('Error al eliminar el país');
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormSubmit = () => {
    fetchCountries();
    setEditingId(null);
  };

  if (loading) return <div>Cargando países...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="country-list">
      <h2>Lista de Países</h2>

      {!editingId && (
        <div className="new-country">
          <CountryForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}

      <table className="country-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capital</th>
            <th>Moneda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {countries.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No hay países registrados.</td>
            </tr>
          ) : (
            countries.map((country) =>
              editingId === country.id ? (
                <tr key={country.id}>
                  <td colSpan="4">
                    <CountryForm
                      country={country}
                      onSubmitSuccess={handleFormSubmit}
                      onCancel={handleCancelEdit}
                    />
                  </td>
                </tr>
              ) : (
                <CountryItem
                  key={country.id}
                  country={country}
                  onDelete={() => handleDelete(country.id)}
                  onEdit={() => handleEdit(country.id)}
                />
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CountryList;