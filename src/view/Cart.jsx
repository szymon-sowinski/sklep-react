import React from 'react';

function Cart({ koszyk, usunZKoszyka, zmienIlosc }) {
  const suma = koszyk.reduce(
    (wynik, produkt) => wynik + produkt.cena * produkt.ilosc,
    0
  );

  return (
    <div className="cart">
      <h2 className="cart-title">Twój koszyk</h2>
      {koszyk.length === 0 ? (
        <p className="cart-empty">Koszyk jest pusty.</p>
      ) : (
        koszyk.map((produkt) => (
          <div key={produkt.id} className="cart-item">
            <span className="cart-item-info">
              {produkt.nazwa} | {produkt.ilosc} szt.
            </span>
            <div className="cart-controls">
              <button onClick={() => zmienIlosc(produkt.id, -1)}>-</button>
              <button onClick={() => zmienIlosc(produkt.id, 1)}>+</button>
            </div>
            <span className="cart-item-price">
              {(produkt.cena * produkt.ilosc).toFixed(2)} zł
            </span>
            <button
              className="cart-remove-btn"
              onClick={() => usunZKoszyka(produkt.id)}
            >
              Usuń
            </button>
          </div>
        ))
      )}
      <h3 className="cart-total">Razem: {suma.toFixed(2)} zł</h3>
    </div>
  );
}

export default Cart;
