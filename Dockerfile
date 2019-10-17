FROM node:10.16.3
ENV NODE_VERSION=10.16.3
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync software-properties-common apt-transport-https -y
RUN wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | apt-key add -v -
RUN wget http://mirrors.kernel.org/ubuntu/pool/main/p/protobuf/libprotobuf9v5_2.6.1-1.3_amd64.deb && dpkg -i libprotobuf9v5_2.6.1-1.3_amd64.deb
RUN apt-add-repository -y https://download.rethinkdb.com/apt
RUN apt-get update && \
    apt-get install rethinkdb -y
RUN ls -al /
ADD client /app/client
ADD api /app/api
ADD server /app/server
RUN cd /app/client/companies && npm install --no-save && npm run build-prod
RUN cd /app/server/companies && npm install --no-save && npm run build-prod
EXPOSE 8081
ENTRYPOINT ["node", "/app/server/build/server/companies/src/main.js", "/app/client/dist/companies"]
