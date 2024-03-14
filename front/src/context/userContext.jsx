import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    pseudo: null,
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
    localStorage.removeItem("pseudo");
    localStorage.removeItem("id");
  };

  // useEffect(() => {
  //   if (user) {
  //     fetchUser();
  //   } else {
  //     setData({});
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && user.pseudo && user.id) {
      localStorage.setItem("pseudo", user.pseudo);
      localStorage.setItem("id", user.id);
    } else if (localStorage.getItem("pseudo")) {
      setUser({
        pseudo: localStorage.getItem("pseudo"),
        id: localStorage.getItem("id"),
      });
      setConnected(true);
    }
  }, [user]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    console.log("connected", connected);
  }, [connected]);

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
