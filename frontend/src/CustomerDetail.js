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
      <div>顧客詳細</div>
      {customer ? (
        <>
          <h1>{customer.company_name}</h1>
          <dl>
            <dt>ID</dt>
            <dd>{customer.id}</dd>
            <dt>会社名</dt>
            <dd>{customer.company_name}</dd>
            <dt>お名前</dt>
            <dd>{customer.contact_person}</dd>
            <dt>郵便番号</dt>
            <dd>{customer.postal_code}</dd>
            <dt>住所</dt>
            <dd>
              {customer.address1} <br />
              {customer.addres2}
            </dd>
            <dt>TEL</dt>
            <dd>{customer.phone_number}</dd>
            <dt>備考</dt>
            <dd>{customer.note}</dd>
            <dt>請求用会社名</dt>
            <dd>{customer.billing_name}</dd>
          </dl>
        </>
      ) : (
        <p>読み込み中...</p>
      )}
      <Link to="/">一覧へ戻る</Link>
    </div>
  );
}

export default CustomerDetail;
