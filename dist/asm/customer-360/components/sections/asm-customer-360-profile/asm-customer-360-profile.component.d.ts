import { OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Card, FocusConfig, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { AsmCustomer360CustomerProfile, AsmCustomer360PaymentDetail, AsmCustomer360Profile } from '@spartacus/asm/customer-360/root';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ProfileComponent implements OnInit {
    sectionContext: AsmCustomer360SectionContext<AsmCustomer360CustomerProfile>;
    protected translation: TranslationService;
    focusConfig: FocusConfig;
    iconTypes: typeof ICON_TYPE;
    customerProfileData$: Observable<AsmCustomer360Profile | undefined>;
    constructor(sectionContext: AsmCustomer360SectionContext<AsmCustomer360CustomerProfile>, translation: TranslationService);
    ngOnInit(): void;
    getCardContent({ defaultPayment, expiryMonth, expiryYear, cardNumber, cardType, }: AsmCustomer360PaymentDetail): Observable<Card>;
    getCardIcon(code: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ProfileComponent, "cx-asm-customer-360-profile", never, {}, {}, never, never, false, never>;
}
