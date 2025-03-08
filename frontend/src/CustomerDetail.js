import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles/CustomerDetail.module.scss";
import axios from "axios";

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
        setEditData(response.data);
      })

      .catch((error) => console.error(error));
  }, [id]);

  // インプットの変更を管理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };


  return (
    <div>
      <div>顧客詳細</div>
      {customer ? (
        <>
          {isEditing ? (
            <>
              {/* <button onClick={handleSave}>保存</button> */}
              <button>保存</button>
              <button onClick={() => setIsEditing(false)}>キャンセル</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>編集</button>
          )}

          <h1>{customer.company_name}</h1>
          <dl className={styles.customerDetail}>
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
