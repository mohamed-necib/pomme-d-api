const PATH = import.meta.env.VITE_PATH;

export const favoriteActions = {
  //GET FAVORITES
  async getFavorites() {
    try {
      const response = await fetch(`${PATH}/favorites`, {
        method: "GET",
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  //ADD FAVORITE
  async addFavorite(favorite) {
    try {
      const response = await fetch(`${PATH}/favorites/add`, {
        method: "POST",
        body: favorite,
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  //DELETE FAVORITE
  async deleteFavorite(favorite) {
    try {
      const response = await fetch(`${PATH}/favorites/remove`, {
        method: "POST",
        body: favorite,
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
