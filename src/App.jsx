import { useState } from 'react';
import ProductCard from './components/ProductCard.jsx';
import ProductList from './view/ProductList.jsx';
import { 
  pobierzProdukty, 
  filtrujProdukty, 
  wyszukajProdukty, 
  sortujProdukty 
} from './controllers/productController.js';
import './App.css';

function App() {
  // Wszystkie stany (useState) na samej górze komponentu
  const [kategoria, setKategoria] = useState('wszystkie');
  const [szukaj, setSzukaj] = useState('');
  const [sortowanie, setSortowanie] = useState('domyslnie');

  // Przetwarzanie danych po zdefiniowaniu stanów
  const produktyKategorii = filtrujProdukty(kategoria);
  const produktyPoWyszukaniu = wyszukajProdukty(produktyKategorii, szukaj);
  const produkty = sortujProdukty(produktyPoWyszukaniu, sortowanie);

  return (
    <div className="main-container">
      <h1>Sklep konkurencyjny dla wszystkich</h1>

      <input 
        type="text" 
        placeholder="Wyszukaj produkt..." 
        value={szukaj} 
        onChange={(e) => setSzukaj(e.target.value)} 
      />

      <p>Liczba znalezionych produktów: {produkty.length}</p>

      <label htmlFor="filtr">Wybierz kategorię: </label>
      <select id="filtr" value={kategoria} onChange={(e) => setKategoria(e.target.value)}>
        <option value="wszystkie">Wszystkie</option>
        <option value="eco">Eco</option>
        <option value="bio">Bio</option>
        <option value="naturalne">Naturalne</option>
      </select>

      <label htmlFor="sortowanie">Sortuj według ceny: </label>
      <select id="sortowanie" value={sortowanie} onChange={(e) => setSortowanie(e.target.value)}>
        <option value="domyslnie">Domyślnie</option>
        <option value="rosnaco">Rosnąco</option>
        <option value="malejaco">Malejąco</option>
      </select>

      <ProductList produkty={produkty} />
    </div>
  );
}

export default App;




  //map
  // const ceny = [10, 20, 30];
  // const noweCeny = ceny.map(cena => cena * 2);

  //filter
  //const ceny = [10, 20, 30];
  //const tanie = ceny.filter(cena => cena < 30);

  //find
  //const ceny = [10, 20, 30];
  //const wynik = ceny.find(cena => cena > 30);

    //sort
  //const ceny = [10, 20, 30];
  //liczby.sort((a, b) => a - b); //sortowanie rosnąco
  //liczby.sort((a, b) => b - a); //sortowanie malejąco