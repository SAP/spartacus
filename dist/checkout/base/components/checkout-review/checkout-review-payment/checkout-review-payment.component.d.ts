import { PaymentDetails } from '@spartacus/cart/base/root';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { TranslationService } from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutReviewPaymentComponent {
    protected checkoutStepService: CheckoutStepService;
    protected checkoutPaymentFacade: CheckoutPaymentFacade;
    protected translationService: TranslationService;
    iconTypes: typeof ICON_TYPE;
    paymentDetailsStepRoute: string | undefined;
    constructor(checkoutStepService: CheckoutStepService, checkoutPaymentFacade: CheckoutPaymentFacade, translationService: TranslationService);
    paymentDetails$: Observable<PaymentDetails | undefined>;
    getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card>;
    getBillingAddressCard(paymentDetails: PaymentDetails): Observable<Card>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutReviewPaymentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutReviewPaymentComponent, "cx-checkout-review-payment", never, {}, {}, never, never, false, never>;
}
