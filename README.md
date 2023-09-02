# でーとる 〜今日は誰とデートする？〜
デート管理SNSです。

マッチングアプリが活況であり、女性とのデートも手軽に行える時代になってきました。

何人の女性とデートをする友人からヒントを得て、デートを管理し友人と共有できるアプリを作りました。

レスポンシブ対応しており、スマホからでもご覧頂けます。


<img width="1415" alt="スクリーンショット" src="https://github.com/DJMasaru/date-le-frontend/assets/91363928/b8160b77-f082-452b-8f95-9a2899347e8a">

<img width="375" alt="スクリーンショット" src="https://github.com/DJMasaru/date-le-frontend/assets/91363928/4bf2bb19-3039-47da-ae0e-1c1808c107cb">

# URL
https://main.d2fv1fmmujqt0y.amplifyapp.com/login

「ゲストログインはこちら」からお入りください。

ユーザー情報として

ID：example@example.example　PW：exampleexample

ID：example@masaki.example　PW：exampleexample

ID：example@shinya.example　PW：exampleexample

でもログインできます。

# 使用技術

・TypeScript 5.0.4(Next.js 13.4.4)

　⚪︎Chakra UI

・PHP 8.8.10(Laravel 10.13.0)

・AWS

　⚪︎AWS Amplify

　⚪︎AWS S3

・Railway.app

　⚪︎MySQL 8.1.0

# 構成図

<img width="650" alt="スクリーンショット 2023-09-02 16 43 30" src="https://github.com/DJMasaru/date-le-frontend/assets/91363928/f12e5e31-5f65-404e-9077-7c5d258242de">


# 機能一覧

・ユーザー登録機能

・ログイン機能

・デート情報登録機能（ダッシュボードに表示される情報）

・デート情報に対するコメント機能

・女の子情報一覧確認機能

・女の子情報詳細確認/編集/削除機能

・女の子情報詳細確認画面からデート情報登録できる機能

・デート履歴確認機能（Laravelでcron処理を行わせ終了したデート情報を削除しこちらのテーブルに登録し直す）

・フォロー/フォローリクエスト、フォロワー/被フォローリクエスト機能

・友達情報詳細確認機能

・接点のない人の検索機能

・自身のプロフィール編集/削除機能
