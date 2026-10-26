import { useState } from 'react';

function ProductCard({ nazwa, cena, staraCena, zdjecie, kategoria, dodajDoKoszyka }) {
  const [polubiono, setPolubiono] = useState(false);
  const [licznik, setLicznik] = useState(0);

  function kliknijSerce() {
    setPolubiono(!polubiono);
    setLicznik(prev => (polubiono ? prev - 1 : prev + 1));
  }

  return (
    <div className="product-card">
      <img src={zdjecie} alt={nazwa} />
      <h2>{nazwa}</h2>
      <p>Cena: {cena.toFixed(2)} zł</p>
      {staraCena && (
        <p className="stara-cena">Stara sprzed 30 dni: {staraCena.toFixed(2)} zł</p>
      )}
      <p className="kategoria">{kategoria}</p>

      <button onClick={dodajDoKoszyka}>
        Dodaj do koszyka
      </button>

      <button className="heart-button" onClick={kliknijSerce}>
        {polubiono ? '❤️' : '🤍'} {licznik > 0 && licznik}
      </button>
    </div>
  );
}

export default ProductCard;
