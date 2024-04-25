<h1 align="center">Xtatuz Backend</h1>

## Installation

1. Clone this repository
2. Run `npm install` to download dependencies

## Setup

1. Copy `.env.example` and rename to `.env` and fill in your values. You can consult the Finstable dev team for the values.
2. Update

```bash
# Database
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
SYNCHRONIZE=
```

```bash
# JWT
JWT_SECRET=
JWT_REFRESH=
SECRET_EXPIRES_IN=
REFRESH_EXPIRES_IN=
```

```bash
#Contract
RPC_PROVIDER=
PRIVATE_KEY=
CONTRACT_XTATUZ_ADDRESS=
```

```bash
#AWS
AWS_S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

## Run local development server

1. Run `npm run start:dev`

## Deployment

This project is deployed on AWS EC2. You can deploy in on any devices that support docker.

## Related repositories

1. <a href="https://github.com/Finstable/xtatuz-poc-frontend" target="_blank">Frontend</a> - The main user interface for interacting with backend.
1. <a href="https://github.com/Finstable/xtatuz-poc-contract" target="_blank">Contract</a> - Xtatuz contracts Router and Factory
