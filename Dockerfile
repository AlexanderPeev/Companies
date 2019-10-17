FROM node:10.16.3
ENV NODE_VERSION=10.16.3
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync software-properties-common apt-transport-https -y
RUN wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | apt-key add -v -
RUN wget http://mirrors.kernel.org/ubuntu/pool/main/p/protobuf/libprotobuf9v5_2.6.1-1.3_amd64.deb && dpkg -i libprotobuf9v5_2.6.1-1.3_amd64.deb
RUN apt-add-repository -y https://download.rethinkdb.com/apt
RUN apt-get update && \
    apt-get install rethinkdb -y
ENV NODE_BIN=/usr/bin
RUN cd /client/companies && ${NODE_BIN}/npm install --no-save && ${NODE_BIN}/npm run build-prod && cp dist/companies/* ${DOCKER_DIR}/client
RUN cd /server/companies && ${NODE_BIN}/npm install --no-save && ${NODE_BIN}/npm run build-prod && cp build/server/companies/src/* ${DOCKER_DIR}/server
ENTRYPOINT ["${NODE_BIN}/node", "/server/build/server/companies/src/main.js", "/client/dist/companies"]
