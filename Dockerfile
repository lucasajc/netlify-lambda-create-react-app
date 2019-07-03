FROM mhart/alpine-node:12

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
EXPOSE 3000
EXPOSE 9000

CMD [ "yarn", "run", "dev" ]
