import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiServices } from "../services/apiServices";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_name_fr: "",
    brands: "",
    image_url: "",
    nutriscore_grade: "",
  });

  const fetchProduct = async (id) => {
    const productData = await apiServices.getProduct(id);
    console.log(productData);
    setProduct({
      product_name_fr: productData.product.product_name_fr,
      brands: productData.product.brands,
      image_url: productData.product.image_url,
      nutriscore_grade: productData.product.nutriscore_grade,
    });
  };
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  return (
    <div className="item full-screen">
      <h1>Un produit</h1>
      <img src={product.image_url} alt={product.product_name_fr} />
      <h2>{product.brands}</h2>
      <h3>{product.product_name_fr}</h3>
      <img
        src={`https://static.openfoodfacts.org/images/misc/nutriscore-${product.nutriscore_grade}.svg`}
        alt=""
      />
    </div>
  );
}

export default Product;
