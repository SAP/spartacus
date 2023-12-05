import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class OrderConsignedEntriesComponent {
    consignments: Consignment[];
    order: Order;
    enableAddToCart: boolean | undefined;
    buyItAgainTranslation: string;
    promotionLocation: PromotionLocation;
    readonly OrderOutlets: typeof OrderOutlets;
    readonly CartOutlets: typeof CartOutlets;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConsignedEntriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderConsignedEntriesComponent, "cx-order-consigned-entries", never, { "consignments": "consignments"; "order": "order"; "enableAddToCart": "enableAddToCart"; "buyItAgainTranslation": "buyItAgainTranslation"; }, {}, never, never, false, never>;
}
