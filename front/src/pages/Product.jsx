import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiServices } from "../services/apiServices";
import { favoriteActions } from "../services/favoriteServices";
import { dailyActions } from "../services/dailyServices";
import { UserContext } from "../context/userContext";

function Product() {
  const { connected, user } = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_name_fr: "",
    brands: "",
    image_url: "",
    nutriscore_grade: "",
    code: null,
  });

  const fetchProduct = async (id) => {
    const productData = await apiServices.getProduct(id);
    console.log(productData);
    setProduct({
      product_name_fr: productData.product.product_name_fr,
      brands: productData.product.brands,
      image_url: productData.product.image_url,
      nutriscore_grade: productData.product.nutriscore_grade,
      code: productData.code,
    });
  };

  console.log("user", user);
  const addFavorite = async () => {
    let formData = new FormData();
    formData.append("id", product.code);
    formData.append("user_id", user.id);

    if (!connected) {
      alert("Vous devez être connecté pour ajouter un favori");
      return;
    }
    const res = await favoriteActions.addFavorite(formData);
    console.log(res);
  };

  const addDaily = async () => {
    const daily = {
      id: product.code,
    };
    if (!connected) {
      alert("Vous devez être connecté pour ajouter un quotidien");
      return;
    }
    const res = await dailyActions.addDaily(daily);
    console.log(res);
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

      <button onClick={addFavorite}>Ajouter aux favoris</button>
      <button onClick={addDaily}>Ajouter aux quotidiens</button>
      <img
        src={`https://static.openfoodfacts.org/images/misc/nutriscore-${product.nutriscore_grade}.svg`}
        alt=""
      />
    </div>
  );
}

export default Product;
