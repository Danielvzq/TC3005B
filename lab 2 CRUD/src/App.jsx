import React, { useState } from 'react'
import './App.css'
import CountryList from './components/countryList.jsx'

function App() {
  return (
    <div>
      <header><h1>CRUD FRONTEND-POSTGRESQL</h1></header>
      <CountryList />
      <footer><h5>2025 Tec.mx CRUD</h5></footer>
    </div>
  )
}

export default App