import { returnRequests } from "./returnRequests";
import { pagination } from "./pagination";
import { sorts } from "./sorts";

export interface returnOrder {
   returnRequests: returnRequests[];
   pagination: pagination;
   sorts: sorts[];
}
