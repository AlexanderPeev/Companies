FROM rethinkdb:2.3.6
ENV NODE_VERSION=10.16.3
RUN sudo apt-get install apt-transport-https
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync -y
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
ENV DOCKER_DIR=$(pwd)
ENV NVM_DIR=/root/.nvm
RUN mkdir client
RUN mkdir server
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
ENV NODE_BIN=/usr/bin
RUN cd ${DOCKER_DIR}/../client/companies && ${NODE_BIN}/npm install --no-save && ${NODE_BIN}/npm run build-prod && cp dist/companies/* ${DOCKER_DIR}/client
RUN cd ${DOCKER_DIR}/../server/companies && ${NODE_BIN}/npm install --no-save && ${NODE_BIN}/npm run build-prod && cp build/server/companies/src/*      ${DOCKER_DIR}/server
RUN cd ${DOCKER_DIR}
ENTRYPOINT ["${NODE_BIN}/node", "${DOCKER_DIR}/server/main.js", "${DOCKER_DIR}/client"]
