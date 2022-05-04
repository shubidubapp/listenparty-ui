FROM node:alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn install --dev

ENV NODE_ENV=production

COPY . /app
CMD ["yarn", "build"]
