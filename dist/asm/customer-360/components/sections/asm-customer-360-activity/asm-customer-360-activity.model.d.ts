import { AsmCustomer360Activity } from '@spartacus/asm/customer-360/root';
export interface ActivityEntry extends AsmCustomer360Activity {
    typeLabel?: string;
    statusLabel?: string;
}
export declare enum TypeCodes {
    SavedCart = "SAVED CART",
    Cart = "CART",
    Ticket = "TICKET",
    Order = "ORDER"
}
