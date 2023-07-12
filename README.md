## Rembook-Frontend '23

## Tech Stack

-   React + Typescript

## Dev Setup

-   create a `index.ts` file inside `src/Config` following `example.ts` and fill in backend url

```shell
yarn install
yarn start
```

-   To format code, run `yarn format`

## Docker Setup (Prod)

-   Change port in `docker-compose.yml` to the required port.

```shell
ports:
    - {new_port_here}:80
```

-   Start up the container

```shell
docker-compose up --build -d
```
