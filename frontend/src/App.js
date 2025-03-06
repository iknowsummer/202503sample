import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/customers/")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>顧客一覧</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.company_name} - 【tel {customer.phone_number}】
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
