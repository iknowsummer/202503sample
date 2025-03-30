import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/api/customers/")
      // .get(`${process.env.REACT_APP_API_URL}/api/customers/`)

      // .get("https://userlist-web-xxxxx.run.app/api/customers/")
      .get(
        "https://userlist-web-915364762630.us-central1.run.app/api/customers/"
      )
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <nav id="global_navi">
        <ul>
          <li>
            <a href="/">トップページ</a>
          </li>
          <li>
            <Link to="/customer">顧客一覧</Link>
          </li>
          <li>
            <Link to="/add">顧客登録</Link>
          </li>
        </ul>
      </nav>
      <h1>顧客一覧</h1>
      <section id="customer_lists">
        <div class="customer_lists_row">
          <div>ID</div>
          <div>顧客名</div>
          <div>TEL</div>
          <div>住所</div>
        </div>

        {customers.map((customer) => (
          <Link
            to={`/customer/${customer.id}`}
            key={customer.id}
            class="customer_lists_row"
          >
            <div>{customer.id}</div>
            <div>{customer.company_name}</div>
            <div>{customer.phone_number}</div>
            <div>
              {customer.address1} <br />
              {customer.address2}
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

export default CustomerList;
