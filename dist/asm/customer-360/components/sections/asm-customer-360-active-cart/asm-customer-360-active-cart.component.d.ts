import { ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../../asm-customer-360-product-listing/product-item.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360ActiveCart, CustomerCart } from '@spartacus/asm/customer-360/root';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ActiveCartComponent {
    sectionContext: AsmCustomer360SectionContext<AsmCustomer360ActiveCart>;
    protected productService: ProductService;
    productItems$: Observable<Array<ProductItem>>;
    activeCart$: Observable<CustomerCart | undefined>;
    constructor(sectionContext: AsmCustomer360SectionContext<AsmCustomer360ActiveCart>, productService: ProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ActiveCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ActiveCartComponent, "cx-asm-customer-360-active-cart", never, {}, {}, never, never, false, never>;
}
