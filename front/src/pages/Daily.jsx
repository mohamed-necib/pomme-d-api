import { useState, useEffect } from "react";
import { dailyActions } from "../services/dailyServices";

function Daily() {
  const [dailies, setDailies] = useState([]);

  const fetchDailies = async () => {
    const dailiesData = await dailyActions.getDailies();
    console.log(dailiesData);
    setDailies(dailiesData);
  };

  useEffect(() => {
    fetchDailies();
  }, []);

  if (dailies.length > 0) {
    return (
      <div className="item full-screen">
        <h1>Quotidiens</h1>
        <ul>
          {dailies.map((daily) => (
            <li key={daily.id}>
              <img src={daily.image_url} alt={daily.product_name_fr} />
              <h2>{daily.brands}</h2>
              <h3>{daily.product_name_fr}</h3>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="item full-screen">
        <h1>Quotidiens</h1>
        <p>Vous n'avez pas de quotidiens</p>
      </div>
    );
  }
}

export default Daily;
