FROM node:16-alpine
WORKDIR /usr/src/app
COPY ./SlackAnalyticsFrontEnd/node/slackanalytics_front/package.json ./
COPY ./SlackAnalyticsFrontEnd/node/slackanalytics_front/package-lock.json* ./
COPY ./SlackAnalyticsFrontEnd/node/slackanalytics_front/npm-shrinkwrap.json* ./
RUN npm install
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
