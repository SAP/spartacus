import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { GlobalMessageService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentTypeComponent {
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
    protected checkoutStepService: CheckoutStepService;
    protected activatedRoute: ActivatedRoute;
    protected globalMessageService?: GlobalMessageService | undefined;
    private poNumberInputElement;
    protected busy$: BehaviorSubject<boolean>;
    typeSelected?: string;
    paymentTypesError: boolean;
    isUpdating$: Observable<boolean>;
    paymentTypes$: Observable<PaymentType[]>;
    typeSelected$: Observable<PaymentType>;
    cartPoNumber$: Observable<string>;
    constructor(checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade, checkoutStepService: CheckoutStepService, activatedRoute: ActivatedRoute, globalMessageService?: GlobalMessageService);
    /**
     * @deprecated since 6.3
     */
    constructor(checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade, checkoutStepService: CheckoutStepService, activatedRoute: ActivatedRoute, globalMessageService: GlobalMessageService);
    changeType(code: string): void;
    next(): void;
    back(): void;
    protected onSuccess(): void;
    protected onError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentTypeComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutPaymentTypeComponent, "cx-payment-type", never, {}, {}, never, never, false, never>;
}
