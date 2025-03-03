import os
import sqlite3
from time import sleep
import pandas as pd

pd.set_option("display.unicode.east_asian_width", True)

# ディレクトリの指定
data_dir = "../data/"

# ファイルパスの指定
app_dir = "../app/"

address_pass = os.path.join(data_dir, "住所録.xlsx")
userlist_pass = os.path.join(data_dir, "顧客リスト.xlsx")
db_path = os.path.join(app_dir, "db.sqlite3")


def main():

    # 顧客リストの読み込み
    userlist_df = pd.read_excel(userlist_pass)
    userlist_df = userlist_df.fillna("")
    print(userlist_df)

    # 住所録の読み込み
    address_df = pd.read_excel(address_pass)
    address_df = address_df.fillna("")
    print(address_df)

    # 住所録をSQLiteデータベースに登録（置換）
    to_sqlite(address_df)

    print("住所録の登録処理が完了しました。")
    sleep(3)


def to_sqlite(df):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # テーブルを作成（存在する場合は削除して再作成）
    cursor.execute("DROP TABLE IF EXISTS users")
    cursor.execute(
        """
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT,
            contact_person TEXT,
            postal_code TEXT,
            address1 TEXT,
            address2 TEXT,
            phone_number TEXT,
            note TEXT,
            billing_name TEXT
        )
        """
    )

    # データを挿入
    for index, row in df.iterrows():
        cursor.execute(
            """
            INSERT INTO users (company_name,contact_person, postal_code, address1, address2, phone_number, note, billing_name)
            VALUES (?,?,?,?,?,?,?,?)
            """,
            (
                row["会社名"],
                row["お名前"],
                row["郵便番号"],
                row["住所"],
                row["アパート・ビル・建物名など"],
                row["電話番号"],
                row["備考"],
                row["請求用会社名"],
            ),
        )

    # コミットして接続を閉じる
    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
