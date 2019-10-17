import {Handler} from "./handler";
import {RequestHandler} from "restify";
import {StorageData} from "../../storage/storage.data";
import {CompanyRestDTO} from "../../../../../api/company.rest.dto";
import {ChangesResult} from "./changes.result";
import {WriteResult} from "rethinkdb";

export class CompaniesCreatePostHandler implements Handler {
    constructor(private storage: StorageData) {
    }

    getRequestHandler(): RequestHandler {
        return (req, res, next) => {
            const newCompanyData = req.body;
            delete newCompanyData.id; // we create an id ourselves
            newCompanyData.version = 1;
            this.storage.table.insert(newCompanyData, {returnChanges: true}).run(this.storage.connection).then((result: WriteResult) => {
                const changes = (result as any as ChangesResult).changes;
                if (changes.length) {
                    res.json(changes[0].new_val);
                    next();
                } else {
                    res.send(204);
                    next();
                }
            }, err => {
                next(err);
            });
        };
    }

}
