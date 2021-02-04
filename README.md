# Split Backend

Backend for the application [Split](https://chis.dev/split).

## Setup

Download an run [mongodb](https://www.mongodb.com/).

Create a database.

`mongo`

`use split`

Install dependencies.

`npm install`

Create a certs directory and add Cloudfare SSL certs.

`mkdir certs`

```
certs
├── cert.pem
└── key.pem
```

## Run

`npm run devStart`
