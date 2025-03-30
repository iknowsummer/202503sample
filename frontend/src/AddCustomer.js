import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles/CustomerDetail.module.scss";
import axios from "axios";

// 初期化用のオブジェクトを定義
const initialEditData = {
  company_name: "",
  contact_person: "",
  postal_code: "",
  address1: "",
  address2: "",
  phone_number: "",
  note: "",
  billing_name: "",
};

function CustomerDetail() {
  const [customer, setCustomer] = useState(null);
  const [editData, setEditData] = useState({ initialEditData });

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/api/customers/${id}`)
  //     .get(`https://userlist-web-xxxxx.run.app/api/customers/${id}`)
  //     .then((response) => {
  //       setCustomer(response.data);
  //       setEditData(response.data);
  //     })

  //     .catch((error) => console.error(error));
  // }, [id]);

  // インプットの変更を管理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // 保存ボタンでAPIに更新リクエストを送信
  const handleSave = () => {
    axios
      // .post(`http://127.0.0.1:8000/api/customers/`, editData)
      // .post(`https://userlist-web-xxxxx.run.app/api/customers/`, editData)
      .post(
        `https://userlist-web-915364762630.us-central1.run.app/api/customers/`,
        editData
      )
      .then((response) => {
        setCustomer(response.data); // 更新後のデータをセット
        setEditData(initialEditData); // 入力欄を空欄へ初期化
      })
      .catch((error) => console.error(error));
  };

  // 各項目のテキスト表示と編集を切替、入力コントロールする関数
  const renderField = (name, value) => {
    return (
      <input
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        }}
      />
    );
  };

  return (
    <div>
      {
        <>
          <Link to="/customer">一覧へ戻る</Link>

          <h1>新規登録</h1>
          <dl className={styles.customerDetail}>
            <dt>会社名</dt>
            <dd>{renderField("company_name", editData.company_name)}</dd>
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
          <section className="editButtons">
            <button onClick={handleSave}>追加する</button>
            {/* 登録時にその旨をメッセージ表示 */}
            {customer && <p>登録しました</p>}
          </section>
        </>
      }
    </div>
  );
}

export default CustomerDetail;
