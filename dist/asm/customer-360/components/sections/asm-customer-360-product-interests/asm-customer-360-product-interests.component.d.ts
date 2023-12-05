import { AsmCustomer360ProductInterestList } from '@spartacus/asm/customer-360/root';
import { Product, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ProductInterestsComponent {
    sectionContext: AsmCustomer360SectionContext<AsmCustomer360ProductInterestList>;
    protected productService: ProductService;
    products$: Observable<Array<Product>>;
    constructor(sectionContext: AsmCustomer360SectionContext<AsmCustomer360ProductInterestList>, productService: ProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ProductInterestsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ProductInterestsComponent, "cx-asm-customer-360-product-interests", never, {}, {}, never, never, false, never>;
}
