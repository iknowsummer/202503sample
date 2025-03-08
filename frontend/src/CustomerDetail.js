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

  // 保存ボタンでAPIに更新リクエストを送信
  const handleSave = () => {
    axios
      .put(`http://127.0.0.1:8000/api/customers/${id}/`, editData)
      .then((response) => {
        setCustomer(response.data); // 更新後のデータをセット
        setIsEditing(false); // 編集モードを終了
      })
      .catch((error) => console.error(error));
  };

  // 各項目のテキスト表示と編集を切替、入力コントロールする関数
  const renderField = (name, value) => {
    return (
      <input
        name={name}
        value={value || ""}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSave();
          }
        }}
        readOnly={!isEditing}
      />
    );
  };

  return (
    <div>
      <div>顧客詳細</div>
      {customer ? (
        <>
          {isEditing ? (
            <>
              <button onClick={handleSave}>保存</button>
              <button onClick={() => setIsEditing(false)}>キャンセル</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>編集</button>
          )}

          <h1>{customer.company_name}</h1>
          <dl className={styles.customerDetail}>
            <dt>ID</dt>
            <dd>{customer.id}</dd>
            <dt>お名前</dt>
            <dd>{renderField("contact_person", editData.contact_person)}</dd>
            <dt>郵便番号</dt>
            <dd>{renderField("postal_code", editData.postal_code)}</dd>
            <dt>住所1</dt>
            <dd>{renderField("address1", editData.address1)}</dd>
            <dt>住所2</dt>
            <dd>{renderField("address2", editData.address2)}</dd>
            <dt>TEL</dt>
            <dd>{renderField("phone_number", editData.phone_number)}</dd>
            <dt>備考</dt>
            <dd>{renderField("note", editData.note)}</dd>
            <dt>請求用会社名</dt>
            <dd>{renderField("billing_name", editData.billing_name)}</dd>
          </dl>
        </>
      ) : (
        <p>読み込み中...</p>
      )}
      <Link to="/customer">一覧へ戻る</Link>
    </div>
  );
}

export default CustomerDetail;
