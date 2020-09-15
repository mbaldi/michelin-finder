# build
FROM node:12.4.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD . .
RUN npm install --silent

EXPOSE 1337

CMD ["sails", "lift", "--prod"]