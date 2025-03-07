import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/customers/${id}`)
      .then((response) => setCustomer(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <h1>顧客詳細</h1>
      {customer ? (
        <ul>
          <li>会社名: {customer.company_name}</li>
          <li>住所: {customer.address1}</li>
          <li>住所: {customer.address2}</li>
          <li>TEL: {customer.phone_number}</li>
          <li>備考: {customer.note}</li>
        </ul>
      ) : (
        <p>読み込み中...</p>
      )}
      <Link to="/">戻る</Link>
    </div>
  );
}

export default CustomerDetail;
