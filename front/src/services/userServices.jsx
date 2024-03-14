const PATH = import.meta.env.VITE_PATH;

export const userActions = {
  async register(user) {
    try {
      const response = await fetch(`${PATH}/register`, {
        method: "POST",
        body: user,
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
