# 簡易記帳本專案
此專案讓使用者可以新增、瀏覽、篩選支出紀錄，同時具備修改及刪除功能

#### 本專案使用 Node.js 搭配 Express框架及樣板(handlebars)，運用 mongoose 操作 mongoDB資料庫。
#### 本專案部屬於Heroku [Live-Demo](https://sheltered-shore-93035.herokuapp.com/users/login)

## 預設使用者  User
>* email: root@example.com
>* password: 12345678

## 功能
- 使用者可以註冊帳號或是用 Facebook Login 直接登入，建立並管理專屬他的一個支出記錄
- 使用者可以瀏覽所有支出清單
- 使用者可以根據「類別」來篩選目前瀏覽的支出清單
- 使用者可以看到目前清單上所有支出的總計金額
- 使用者可以新增一筆支出
- 使用者可以編輯支出的所有屬性
- 使用者可以刪除任何一筆支出

### 預使用專案於本地端，請優先下載並安裝MongoDB資料庫

## 安裝
1. 開啟終端機(Terminal)將此專案Clone至本機電腦
```
git clone https://github.com/paulchang0801/expense-tracker.git
```
2. 進入存放此專案的資料夾
```
cd expense-tracker
```
3. 安裝 npm 套件
```
npm install
```
4. 設定環境變數檔案，將檔案 .env.example 檔名改為 .env。  
若要使用 facebook login ，則需要先在 [Facebook for Developers](https://developers.facebook.com/) 中建立應用程式，將應用程式編號和密鑰填入 .env，即可使用 facebook login 功能。

5. 請在本地MongoDB 資料庫做連線(macOS)：
```
  cd ~/mongodb/bin/
./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
```
6. 加入種子資料
```
npm run seed
```
7. 啟動網頁伺服器
```
npm run dev
```
當 Terminal 出現以下文字表示成功連結本地伺服器
```
ExpenseTracker is listening on localhost:3000
mongodb connected!
```
8. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案

## Author
[張博堯 PAUL](https://medium.com/cs%E8%87%AA%E5%AD%B8%E4%B9%8B%E8%B7%AF)