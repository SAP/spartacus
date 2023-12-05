import { PageEvent } from '@spartacus/storefront';
/**
 * Indicates that a user visited a cart page.
 */
export declare class CartPageEvent extends PageEvent {
    /** event's type */
    static readonly type = "CartPageEvent";
}
