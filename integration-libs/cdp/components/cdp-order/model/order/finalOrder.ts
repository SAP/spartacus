import { orders } from "./orders";
import { pagination } from "./pagination";
import { sorts } from "./sorts";

export interface finalOrder{
    orders: orders[];
    pagination?: pagination;
    sorts?: sorts[];
}
