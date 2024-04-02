const PATH = import.meta.env.VITE_PATH;

export const apiServices = {
  //Get all the products
  async getProducts() {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/search`
      );
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  //Get one product by id
  async getProduct(id) {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${id}`
      );
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  //Get one product by name
  async getProductByName(name) {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${name}`
      );
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
