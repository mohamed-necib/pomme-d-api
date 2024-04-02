import { useState, useEffect } from "react";
import { favoriteActions } from "../services/favoriteServices";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const favoritesData = await favoriteActions.getFavorites();
    console.log(favoritesData);
    setFavorites(favoritesData);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (favorites.length > 0) {
    return (
      <div className="item full-screen">
        <h1>Favoris</h1>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <img src={favorite.image_url} alt={favorite.product_name_fr} />
              <h2>{favorite.brands}</h2>
              <h3>{favorite.product_name_fr}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="item full-screen">
        <h1>Favoris</h1>
        <p>Vous n'avez pas de favoris</p>
      </div>
    );
  }
}

export default Favorites;
