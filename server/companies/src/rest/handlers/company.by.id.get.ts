import {Handler} from "./handler";
import {RequestHandler} from "restify";
import {StorageData} from "../../storage/storage.data";
import {CompanyRestDTO} from "../../../../../api/company.rest.dto";

export class CompanyByIdGetHandler implements Handler {
    constructor(private storage: StorageData) {
    }

    getRequestHandler(): RequestHandler {
        return (req, res, next) => {
            this.storage.table.get<CompanyRestDTO>(req.params.id).run(this.storage.connection).then((company: CompanyRestDTO | null) => {
                if (company) {
                    res.json(company);
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
