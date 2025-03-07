import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerList() {
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
            <Link to={`/customer/${customer.id}`}>
              {customer.company_name} - 【tel {customer.phone_number}】
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
