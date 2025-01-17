FROM node:slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY . .

RUN npm ci --omit=dev

USER node

CMD ["npm", "start"]
