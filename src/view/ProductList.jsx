import ProductCard from "../components/ProductCard";

function ProductList({ produkty }) {
    if(produkty.length === 0){
        return <p>Brak produktów w tej kategorii</p>
    }

    return (
        <div className="products">
            {produkty.map((produkt) => (
                <ProductCard key={produkt.id} {...produkt} />
            ))}
        </div>    
    )
}

export default ProductList;