import os
import pandas as pd

pd.set_option("display.unicode.east_asian_width", True)

# ディレクトリの指定
data_dir = "../data/"

# ファイルパスの指定
address_pass = os.path.join(data_dir, "住所録.xlsx")
userlist_pass = os.path.join(data_dir, "顧客リスト.xlsx")


def main():

    # 顧客リストの読み込み
    userlist_df = pd.read_excel(userlist_pass)
    userlist_df = userlist_df.fillna("")
    print(userlist_df)

    # 住所録の読み込み
    address_df = pd.read_excel(address_pass)
    address_df = address_df.fillna("")
    print(address_df)


if __name__ == "__main__":
    main()
