import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    login: null,
    id_user: null,
  });
  const [connected, setConnected] = useState(false);

  const PATH = import.meta.env.VITE_PATH;

  const fetchUser = async () => {
    // on récupère les données de l'utilisateur
    try {
      let data = new FormData();
      data.append("user", user.login);
      data.append("context", "fetchUser");

      const response = await fetch(`${PATH}controller/authController.php`, {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      if (res) {
        setData(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setConnected(false);
    localStorage.removeItem("login");
    localStorage.removeItem("id_user");
    localStorage.removeItem("solde");
  };

  // useEffect(() => {
  //   if (user) {
  //     fetchUser();
  //   } else {
  //     setData({});
  //   }
  // }, [user]);

  // si l'utilisateur est en localstorage, on le connecte automatiquement
  // useEffect(() => {
  //   if (localStorage.getItem("login")) {
  //     setUser({
  //       login: localStorage.getItem("login"),
  //       id_user: localStorage.getItem("id_user"),
  //     });

  //     setConnected(true);
  //   }
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        connected,
        setConnected,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
