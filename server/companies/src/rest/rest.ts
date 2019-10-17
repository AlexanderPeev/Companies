import {createServer, plugins, Server} from 'restify';
import {StorageData} from "../storage/storage.data";
import {CompaniesGetHandler} from "./handlers/companies.get";
import {CompanyByIdGetHandler} from "./handlers/company.by.id.get";
import {CompaniesCreatePostHandler} from "./handlers/companies.create.post";
import {CompanyByIdPutHandler} from "./handlers/company.by.id.put";
import {CompanyByIdDeleteHandler} from "./handlers/company.by.id.delete";

const express = require('express');

export class Rest {
    public setup(clientDir: string, storage: StorageData): void {
        const server: Server = createServer();
        server.pre(plugins.pre.dedupeSlashes());
        server.pre(plugins.pre.sanitizePath());
        server.use(plugins.bodyParser());

        const allGetRequestHandler = new CompaniesGetHandler(storage).getRequestHandler();
        const createPostRequestHandler = new CompaniesCreatePostHandler(storage).getRequestHandler();
        server.get('/rest/companies', allGetRequestHandler);
        server.post('/rest/companies', createPostRequestHandler);
        server.get('/rest/companies/:id', new CompanyByIdGetHandler(storage).getRequestHandler());
        server.put('/rest/companies/:id', new CompanyByIdPutHandler(storage).getRequestHandler());
        server.del('/rest/companies/:id', new CompanyByIdDeleteHandler(storage).getRequestHandler());

        const clientHandler = plugins.serveStatic({appendRequestPath: false, directory: clientDir, 'default': 'index.html'});
        server.get('/*', clientHandler);
        server.get('/company/*', clientHandler);
        server.get('/companies/*', clientHandler);
        server.get('/companies/new*', clientHandler);

        server.listen(8081, () => {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}
