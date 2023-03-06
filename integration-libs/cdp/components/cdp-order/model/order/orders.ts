import { orgCustomer } from "./orgCustomer";
import { total } from "./total";

export interface orders{
    code: string;
    guid: string;
    orgCustomer: orgCustomer;
    placed: string;
    status: string;
    statusDisplay: string;
    total: total;
}
