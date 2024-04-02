import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const fetchProducts = async () => {
    const productsData = await apiServices.getProducts();
    // console.log(productsData.products);
    setProducts(productsData.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Tous les Produits</h1>
      <main>
        {products.map((product) =>
          //si le product ne contient ni product_name_fr ni brands, on ne l'affiche pas
          !product.product_name_fr || !product.brands ? null : (
            <Link to={`/product/${product.id}`}>
              <div className="item" key={product.id}>
                <h2>{product.product_name_fr}</h2>
                <h3>{product.brands}</h3>

                <div className="details">
                  <h4>
                    <span>UNit</span>
                  </h4>
                  <h4>
                    <span>Pilot</span>pilot
                  </h4>
                </div>
                <div className="description">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Blanditiis fuga vel optio reiciendis aperiam cupiditate fugiat
                  corrupti, mollitia corporis. Quis laborum consectetur eius.
                  Facere, rem.
                </div>
                <div className="bottom">
                  <button className="primary">boutton 1</button>
                  <button className="secondary">boutton 2</button>
                </div>
                <img src={product.image_url} alt={product.product_name_fr} />
                <div className="bg"></div>
              </div>
            </Link>
          )
        )}
      </main>
    </>
  );
}

export default Products;

{
  /* {products.map((product) => (
  <Link to={`/product/${product.id}`}>
    <div key={product.id}>
      <img src={product.image_url} alt={product.product_name_fr} />
      <h2>{product.brand}</h2>
      <h3>{product.product_name_fr}</h3>
      
    </div>
  </Link>
))} */
}
