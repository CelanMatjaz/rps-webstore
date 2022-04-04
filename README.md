# RPS VAJA - Web store

## How to run

Add values to `example.env` file and rename it to `.env`, then run the following commands

Install yarn wth:

> `npm install yarn --global`

Install npm packages:

> `yarn`

Open console and run webpack configs and watch for changes:

> `dev:watch`

Open another console and run server:

> `dev:server`

## Setup database

Add a postgres connection string to .env file: `postgres://<username>:<password>@localhost:5432/<db-name>`

Create a database with your database name on your local machine

Run command `yarn db:migrate`
