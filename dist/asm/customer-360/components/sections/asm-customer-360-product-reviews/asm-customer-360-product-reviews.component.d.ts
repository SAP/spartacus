import { OnInit } from '@angular/core';
import { AsmCustomer360ReviewList } from '@spartacus/asm/customer-360/root';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { CustomerTableColumn, TableEntry } from '../../asm-customer-360-table/asm-customer-360-table.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { ReviewEntry } from './asm-customer-360-product-reviews.model';
import { AsmCustomer360Config } from '../../config/asm-customer-360-config';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ProductReviewsComponent implements OnInit {
    protected asmCustomer360Config: AsmCustomer360Config;
    protected context: AsmCustomer360SectionContext<AsmCustomer360ReviewList>;
    protected datePipe: CxDatePipe;
    protected translation: TranslationService;
    reviewColumns: Array<CustomerTableColumn>;
    reviewEntries$: Observable<Array<ReviewEntry>>;
    protected subscription: Subscription;
    constructor(asmCustomer360Config: AsmCustomer360Config, context: AsmCustomer360SectionContext<AsmCustomer360ReviewList>, datePipe: CxDatePipe, translation: TranslationService);
    ngOnInit(): void;
    navigateTo(entry: TableEntry): void;
    protected getLongDate(date: Date): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ProductReviewsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ProductReviewsComponent, "cx-asm-customer-360-product-reviews", never, {}, {}, never, never, false, never>;
}
