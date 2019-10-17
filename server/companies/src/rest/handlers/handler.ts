import {RequestHandler} from "restify";

export interface Handler {
    getRequestHandler(): RequestHandler;
}
