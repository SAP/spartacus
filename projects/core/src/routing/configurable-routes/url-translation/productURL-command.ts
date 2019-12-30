import { UrlCommandRoute } from "./url-command";
import { Product } from "projects/backend/occ-client/lib/models";

export class ProductURLCommand implements UrlCommandRoute {
    cxRoute?: string;
    params?: Product;

    constructor(cxRoute : string, param : Product) {
        this.cxRoute=cxRoute;
        this.params=param;
    }
}
export type UrlCommand = ProductURLCommand | any;

export type UrlCommands = UrlCommand | UrlCommand[];


  