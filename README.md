# Project Name

```
eMedicine
```

## Description

The purpose of this application is to provide the delivery of the drugs requested by the patients to the address they will give.

Users first register the system.

If their role is a pharmacy, they create a pharmacy and add drugs to pharmacy stocks

If their role is the user, they create a prescription containing the drugs they want from the pharmacy of their choice.

The created prescription creates an order, and this order creates a cargo delivery from the integrated cargo companies to the user address from the pharmacy address.

Thanks to the callBacks sent by the integrated cargo companies, the delivery status of the orders is monitored and the delivery of medicines to the end user is ensured.

## Used technologies

- Nest JS

- Node JS

- Mongo DB

- Redis

- Swagger

- JWT

- AWS S3 file upload

- Email Services

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributor

İsmail Akça

## License

Nest is [MIT licensed](LICENSE).

## Contact

Github: https://github.com/ismailakcabey

Email: ismailakca399@gmail.com

Name: İsmail Akça





