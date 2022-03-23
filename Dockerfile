FROM node:16.13.2-alpine AS build
ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM node:16.13.2-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist ./dist
RUN yarn install --production --frozen-lockfile
CMD [ "yarn", "start" ]
