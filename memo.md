# コマンド

## セットアップ

django-admin startproject 【ディレクトリ名を指定】

## 起動するには

cd app
python manage.py runserver

## models.py を変更したらコマンドで反映が必要らしい

python manage.py makemigrations
python manage.py migrate

## api 設定済みの URL

http://127.0.0.1:8000/api/customers/1/

# ひとまずの Todo

- [x] データ構成を決定

- [x] テーブルとカラム（例: name, email, phone など）を設計。
      sqlite との通信設定
- [x] models.py にテーブル定義。
      migrate コマンドで反映。
- [x] 仮のデータをデータベースへ入れておく

- [ ] 管理画面や manage.py shell で直接登録。
      既存 Excel（csv）から sqlite へのデータ変換スクリプトを用意

- [ ] pandas などで CSV 読み込み → データベースに保存。
      データ取得の一覧ページを作成（テスト用）

- [x] views.py と templates でシンプルに一覧表示。
      データ 1 行を取得して詳細表示（user/{id}）

- [ ] SCSS を読み込み設定。ひとまずのスタイリング。

- [ ] ヘッダー・フッターとか使いまわしできそうだが…？

- [ ] URL ルーティングとテンプレートで実装。
      文字列検索で一覧表示

- [ ] クエリパラメータで検索、フィルター機能を追加。
