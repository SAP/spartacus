import { EventEmitter } from '@angular/core';
import { Product } from '@spartacus/core';
import { ProductItem } from '../asm-customer-360-product-listing/product-item.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ProductItemComponent {
    product: ProductItem;
    quantity: number;
    isOrderEntry: boolean;
    selectProduct: EventEmitter<Product>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ProductItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ProductItemComponent, "cx-asm-customer-360-product-item", never, { "product": "product"; "quantity": "quantity"; "isOrderEntry": "isOrderEntry"; }, { "selectProduct": "selectProduct"; }, never, never, false, never>;
}
