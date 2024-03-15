import { useState, useEffect } from "react";
import { apiServices } from "../services/apiServices";

function Products() {
  const [products, setProducts] = useState([]);
  const nutriImg = {
    a: "https://static.openfoodfacts.org/images/misc/nutriscore-a.svg",
    b: "https://static.openfoodfacts.org/images/misc/nutriscore-b.svg",
    c: "https://static.openfoodfacts.org/images/misc/nutriscore-c.svg",
    d: "https://static.openfoodfacts.org/images/misc/nutriscore-d.svg",
    e: "https://static.openfoodfacts.org/images/misc/nutriscore-e.svg",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await apiServices.getProducts();
      // console.log(productsData.products);
      setProducts(productsData.products);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Tous les Produits</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image_url} alt={product.product_name_fr} />
            <h2>{product.brand}</h2>
            <h3>{product.product_name_fr}</h3>
            <img src={nutriImg[product.nutriscore_grade]} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
