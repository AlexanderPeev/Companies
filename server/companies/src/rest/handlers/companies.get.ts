import {Handler} from "./handler";
import {RequestHandler} from "restify";
import {StorageData} from "../../storage/storage.data";
import {Cursor} from "rethinkdb";

export class CompaniesGetHandler implements Handler {
    constructor(private storage: StorageData) {
    }

    getRequestHandler(): RequestHandler {
        return (req, res, next) => {
            this.storage.table.run(this.storage.connection).then((cursor: Cursor) => {
                cursor.toArray((err, result) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json(result);
                        next();
                    }
                });
            })
        };
    }

}
