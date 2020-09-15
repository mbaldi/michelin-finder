## Michelin restaurant finder

This repo contains an assignment for Emotive

This is a simple web application that finds Michelin-rated restaurants near a specific address (within a 50 mile radius)

The App relies on Google's Geocoding, Reverse Geocoding and Places APIs

## Live Demo
https://michelin-finder.herokuapp.com/

## Motivation
The app is interesting because:

- The app can tell you how far away you are from a world class restaurant
- Can calculate a route so you can see how far away you'd have to drive and for 
how long (by linking to Google directions)

The official Michelin app does not provide those features

Biggest problem in time would be to exceed the geocoding api quotas which can result in a hefty bill.
It can be avoided by caching the geocoding of all restaurants in the backend and implementing location detection in the browser

## Tech Stack

- Backend

  - Node.js using [Sails](https://sailsjs.com/)
  - Tests using [Mocha](https://mochajs.org/) and [SuperTest](https://github.com/visionmedia/supertest)

- Frontend

  - React.js using [Create React App](https://github.com/facebook/create-react-app)
  - Snapshot tests using [Jest](https://jestjs.io/) and [Enzime](https://enzymejs.github.io/enzyme/)

- Deployment with Docker

## Requirements

- A google API Key, Instructions [here](https://support.google.com/googleapi/answer/6158862?hl=en) (You need to enable billing on your project).
- Enable the following APIs in the Google API console:
  - Maps Javascript API
  - Places API
  - Geocoding API
- Restrict the API key to the 3 APIs listed Above
- docker and docker-compose

## Run the Application

1. Copy your api key inside the following files (replace the placeholders)
   - `env`
   - `finder-api/.env`
2. run `docker-compose up --build`

The application will be available in http://localhost:3000

## Run tests

Requires Node.js v12 and yarn

To test the frontend

```
$ yarn install
$ yarn test
```

To test the backend

```
$ cd finder-api
$ npm install
$ npm run test
```

## TODO

- Browser location detection
- Mobile UI optimizacion
- Street view API?

# Credits

Michelin restaurants database from [https://github.com/NicolaFerracin/michelin-stars-restaurants-api](https://github.com/NicolaFerracin/michelin-stars-restaurants-api)
