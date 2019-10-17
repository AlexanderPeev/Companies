import {Handler} from "./handler";
import {RequestHandler} from "restify";
import {StorageData} from "../../storage/storage.data";
import {CompanyRestDTO} from "../../../../../api/company.rest.dto";
import {WriteResult} from "rethinkdb";

export class CompanyByIdDeleteHandler implements Handler {
    constructor(private storage: StorageData) {
    }

    getRequestHandler(): RequestHandler {
        return (req, res, next) => {
            this.storage.table.get<CompanyRestDTO>(req.params.id).delete().run(this.storage.connection).then((result: WriteResult) => {
                if (result.first_error) {
                    next(result.first_error);
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
