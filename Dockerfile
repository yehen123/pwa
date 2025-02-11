FROM node:18
ARG env
COPY . /app
WORKDIR /app
RUN yarn install &&  yarn run build --dotenv .env.${env}

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["node",".output/server/index.mjs"]
