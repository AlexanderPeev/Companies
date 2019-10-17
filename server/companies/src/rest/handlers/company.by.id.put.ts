import {Handler} from "./handler";
import {RequestHandler} from "restify";
import {StorageData} from "../../storage/storage.data";
import {WriteResult} from "rethinkdb";
import {ChangesResult} from "./changes.result";

export class CompanyByIdPutHandler implements Handler {
    constructor(private storage: StorageData) {
    }

    getRequestHandler(): RequestHandler {
        return (req, res, next) => {
            const newCompanyData = req.body;
            const version = newCompanyData.version;
            newCompanyData.version += 1;
            delete newCompanyData.id; // they may not update the id
            this.storage.table.getAll(req.params.id).filter({version: version}).update(newCompanyData, {returnChanges: true}).run(this.storage.connection).then((result: WriteResult) => {
                const changes = (result as any as ChangesResult).changes;
                if (changes.length) {
                    res.json(changes[0].new_val);
                    next();
                } else {
                    res.send(409); // Version conflict
                    next();
                }
            }, err => {
                next(err);
            });
        };
    }

}
