import { Observable } from 'rxjs';
import { ProductItem } from '../../asm-customer-360-product-listing/product-item.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360SavedCart, CustomerCart } from '@spartacus/asm/customer-360/root';
import { ProductService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class AsmCustomer360SavedCartComponent {
    protected sectionContext: AsmCustomer360SectionContext<AsmCustomer360SavedCart>;
    protected productService: ProductService;
    savedCart$: Observable<CustomerCart | undefined>;
    productItems$: Observable<Array<ProductItem>>;
    constructor(sectionContext: AsmCustomer360SectionContext<AsmCustomer360SavedCart>, productService: ProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360SavedCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360SavedCartComponent, "cx-asm-customer-360-saved-cart", never, {}, {}, never, never, false, never>;
}
