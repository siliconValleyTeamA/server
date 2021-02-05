# Pudding (server)

Global Project Funding Service

## ✋Team Members

- [![title](https://img.shields.io/badge/DEVLOPER-최윤선-123456)](https://github.com/OMEGA-Y)
- [![title](https://img.shields.io/badge/DEVLOPER-이연정-123456)](https://github.com/YeonJeongLee00)
- [![title](https://img.shields.io/badge/DEVLOPER-유창헌-123456)](https://github.com/dbckdgjs369)
- [![title](https://img.shields.io/badge/DEVLOPER-노기진-123456)](https://github.com/nohgijin)

---

## 🧞Quick Start 

### 1. Clone & Install Packages

```bash

git clone https://github.com/siliconValleyTeamA/server.git
cd server
npm install

```

### 2. Add config.json / secret.json / auth.json in server

1) add cofing.json in db folder

```bash
confing.json
{
    "host": “${serverIP}”,
    "user": “${dbUser}”,
    "password”: “${dbPassword}”,
    "database": “${dbName}”
}
```

2) add secret.json in root folder

```bash
secret.json
{
    "SECRET_KEY": “${loginKEY}”
}
```

3) add auth.json in root folder

```bash
auth.json
{
    "CLIENT_ID": "${githubPassPortID}",
    "CLIENT_SECRET": "${githubPassPortID}",
    "CALLBACK_URL": "${githubCallbackURL}"
}
```

4) add s3config.json in route folder
```bash
auth.json
{
    "accessKeyId": "${S3accessKeyId}",
    "secretAccessKey": "${S3secretAccessKey}",
    "region": "${S3region}"
}
```

### 3. Run develop server

```bash
npm run dev
```

Then, you can access to your server http://localhost:8080

---

## API - Swagger
![Swagger](https://user-images.githubusercontent.com/67114268/106980805-35369880-67a4-11eb-8c03-de4d5911fc6a.png)

---

## 기술 스택

**Backend**

- ![title](https://img.shields.io/badge/-Node.js-339933?&logo=Node.js&logoColor=white)
- ![title](https://img.shields.io/badge/-Express-191919?&logo=Node.js&logoColor=white)
- ![title](https://img.shields.io/badge/-MySQL-4479A1?&logo=MySQL&logoColor=white)

**ETC**

- ![title](https://img.shields.io/badge/-EC2-232F3E?&logo=Amazon-AWS&logoColor=white)
- ![title](https://img.shields.io/badge/-Github-181717?&logo=Github&logoColor=white)
- ![title](https://img.shields.io/badge/-Slack-4A154B?&logo=Slack&logoColor=white)

---

## 프로젝트 구조

```bash
|-- server // Backend
    |-- bin
    |   |-- www
    |
    |-- public
    |   |-- docs
    |   |   ... // 스웨거 관련 파일
    |   |
    |   |-- swagger.yaml
    |
    |-- db
    |   ... // 데이터베이스 작업 처리(config.json 위치)
    |
    |-- routes
    |   ... // 라우터 요청에 따른 작업 처리(s3config.json 위치)
    |
    |-- views
    |   ...  // pug 파일
    |
    |-- app.js
    |-- auth.json
    |-- secret.json 
```

