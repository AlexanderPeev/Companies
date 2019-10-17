import {createServer, Server} from 'restify';
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

        server.get('/rest/companies/', new CompaniesGetHandler(storage).getRequestHandler());
        server.post('/rest/companies/', new CompaniesCreatePostHandler(storage).getRequestHandler());
        server.get('/rest/companies/:id', new CompanyByIdGetHandler(storage).getRequestHandler());
        server.put('/rest/companies/:id', new CompanyByIdPutHandler(storage).getRequestHandler());
        server.del('/rest/companies/:id', new CompanyByIdDeleteHandler(storage).getRequestHandler());

        server.use(express.static(clientDir));

        server.listen(8080, () => {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}
