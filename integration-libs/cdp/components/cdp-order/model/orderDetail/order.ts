import { consignments } from "./consignments";
import { entries } from "./entries";

export interface order{
    deliveryItemsQuantity: number;
    consignments: consignments[];
    entries: entries[];
}
