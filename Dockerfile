# Common build stage
FROM node:18-buster-slim as common-build-stage

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Development build stage
FROM common-build-stage as development-build-stage

RUN npm install

CMD [ "npm", "run", "dev" ]

# Production build stage
FROM common-build-stage as production-build-stage

RUN npm install --omit=dev

RUN npm run build

CMD [ "npm", "run", "preview" ]