FROM node:10.16.3
ENV NODE_VERSION=10.16.3
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync rethinkdb -y
ENV DOCKER_DIR=$(pwd)
RUN mkdir client
RUN mkdir server
ENV NODE_BIN=/usr/bin
RUN cd ${DOCKER_DIR}/../client/companies && ${NODE_BIN}/npm install --no-save && ${NODE_BIN}/npm run build-prod && cp dist/companies/* ${DOCKER_DIR}/client
RUN cd ${DOCKER_DIR}/../server/companies && ${NODE_BIN}/npm install --no-save && ${NODE_BIN}/npm run build-prod && cp build/server/companies/src/*      ${DOCKER_DIR}/server
RUN cd ${DOCKER_DIR}
ENTRYPOINT ["${NODE_BIN}/node", "${DOCKER_DIR}/server/main.js", "${DOCKER_DIR}/client"]
