import { useState } from 'react';
import ProductList from './view/ProductList.jsx';
import { 
  filtrujProdukty, 
  wyszukajProdukty, 
  sortujProdukty 
} from './controllers/productController.js';
import './App.css';

function App() {
  const [kategoria, setKategoria] = useState('wszystkie');
  const [szukaj, setSzukaj] = useState('');
  const [sortowanie, setSortowanie] = useState('domyslnie');

  function wyczyscFiltry() {
    setSzukaj('');
    setKategoria('wszystkie');
    setSortowanie('domyslnie');
  }

  const produktyKategorii = filtrujProdukty(kategoria);
  const produktyPoWyszukaniu = wyszukajProdukty(produktyKategorii, szukaj);
  const produkty = sortujProdukty(produktyPoWyszukaniu, sortowanie);

  return (
    <div className="main-container">
      <h1>Sklep konkurencyjny dla wszystkich</h1>

      <div className="filter-panel">
        <input 
          type="text" 
          placeholder="Wyszukaj produkt..." 
          value={szukaj} 
          onChange={(e) => setSzukaj(e.target.value)} 
        />

        <div className="filter-group">
          <label htmlFor="filtr">Wybierz kategorię: </label>
          <select id="filtr" value={kategoria} onChange={(e) => setKategoria(e.target.value)}>
            <option value="wszystkie">Wszystkie</option>
            <option value="eco">Eco</option>
            <option value="bio">Bio</option>
            <option value="naturalne">Naturalne</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortowanie">Sortuj: </label>
          <select id="sortowanie" value={sortowanie} onChange={(e) => setSortowanie(e.target.value)}>
            <option value="domyslnie">Domyślnie</option>
            <option value="rosnaco">Cena: rosnąco</option>
            <option value="malejaco">Cena: malejąco</option>
            <option value="nazwa-az">Nazwa: A–Z</option>
            <option value="nazwa-za">Nazwa: Z–A</option>
          </select>
        </div>

        <button className="clear-btn" onClick={wyczyscFiltry}>
          Wyczyść filtry
        </button>
      </div>

      <p className="counter">Liczba znalezionych produktów: {produkty.length}</p>

      <ProductList produkty={produkty} />
    </div>
  );
}

export default App;
