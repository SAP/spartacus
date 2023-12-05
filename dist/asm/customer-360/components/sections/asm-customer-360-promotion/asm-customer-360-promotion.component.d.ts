import { OnDestroy, OnInit } from '@angular/core';
import { AsmCustomer360Facade, AsmCustomer360PromotionList, AsmCustomer360Promotion } from '@spartacus/asm/customer-360/root';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
export declare class AsmCustomer360PromotionComponent implements OnInit, OnDestroy {
    protected context: AsmCustomer360SectionContext<AsmCustomer360PromotionList>;
    protected asmCustomer360Facade: AsmCustomer360Facade;
    protected activeCartFacade: ActiveCartFacade;
    showErrorAlert$: BehaviorSubject<boolean>;
    entries$: BehaviorSubject<AsmCustomer360Promotion[]>;
    subscription: Subscription;
    userId: string;
    constructor(context: AsmCustomer360SectionContext<AsmCustomer360PromotionList>, asmCustomer360Facade: AsmCustomer360Facade, activeCartFacade: ActiveCartFacade);
    ngOnInit(): void;
    refreshPromotions(): void;
    fetchPromotions(): void;
    closeErrorAlert(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360PromotionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360PromotionComponent, "cx-asm-customer-360-promotion", never, {}, {}, never, never, false, never>;
}
