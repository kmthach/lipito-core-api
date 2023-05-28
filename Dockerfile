FROM node:18-buster-slim
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start:prod"]