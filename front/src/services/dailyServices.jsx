const PATH = import.meta.env.VITE_PATH;

export const dailyActions = {
  //GET DAILY
  async getDaily() {
    try {
      const response = await fetch(`${PATH}/daily`, {
        method: "GET",
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  //ADD DAILY
  async addDaily(daily) {
    try {
      const response = await fetch(`${PATH}/daily/add`, {
        method: "POST",
        body: daily,
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  //DELETE DAILY
  async deleteDaily(daily) {
    try {
      const response = await fetch(`${PATH}/daily/remove`, {
        method: "POST",
        body: daily,
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
