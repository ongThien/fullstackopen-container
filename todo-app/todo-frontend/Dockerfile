FROM node:slim AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
