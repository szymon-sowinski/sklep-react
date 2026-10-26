import { useState } from 'react';
import ProductList from './view/ProductList.jsx';
import { 
  filtrujProdukty, 
  wyszukajProdukty, 
  sortujProdukty 
} from './controllers/productController.js';
import './App.css';
import Cart from './view/Cart.jsx';

function App() {
  const [kategoria, setKategoria] = useState('wszystkie');
  const [szukaj, setSzukaj] = useState('');
  const [sortowanie, setSortowanie] = useState('domyslnie');
  const [koszyk, setKoszyk] = useState([]);

  function wyczyscFiltry() {
    setSzukaj('');
    setKategoria('wszystkie');
    setSortowanie('domyslnie');
  }

  const produktyKategorii = filtrujProdukty(kategoria);
  const produktyPoWyszukaniu = wyszukajProdukty(produktyKategorii, szukaj);
  const produkty = sortujProdukty(produktyPoWyszukaniu, sortowanie);

  function dodajDoKoszyka(produkt) {
    setKoszyk(poprzedniKoszyk => {
      const znaleziony = poprzedniKoszyk.find(element => element.id === produkt.id);
      if (znaleziony) {
        return poprzedniKoszyk.map(element => 
          element.id === produkt.id 
            ? { ...element, ilosc: element.ilosc + 1 } 
            : element
        );
      }
      return [...poprzedniKoszyk, { ...produkt, ilosc: 1 }];
    });
  }

  function zmienIlosc(id, zmiana) {
    setKoszyk(poprzedniKoszyk => 
      poprzedniKoszyk
        .map(produkt => 
          produkt.id === id 
            ? { ...produkt, ilosc: produkt.ilosc + zmiana } 
            : produkt
        )
        .filter(produkt => produkt.ilosc > 0)
    );
  }

  function usunZKoszyka(id) {
    setKoszyk(poprzedniKoszyk => poprzedniKoszyk.filter(produkt => produkt.id !== id));
  }

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

      <ProductList produkty={produkty} dodajDoKoszyka={dodajDoKoszyka} />
      <Cart koszyk={koszyk} usunZKoszyka={usunZKoszyka} zmienIlosc={zmienIlosc} />
    </div>
  );
}

export default App;
