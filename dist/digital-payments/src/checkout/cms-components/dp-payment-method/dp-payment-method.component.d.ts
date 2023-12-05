import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, PaymentDetails } from '@spartacus/cart/base/root';
import { CheckoutPaymentMethodComponent as CorePaymentMethodComponent, CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutDeliveryAddressService, CheckoutPaymentService } from '@spartacus/checkout/base/core';
import { GlobalMessageService, TranslationService, UserPaymentService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class DpPaymentMethodComponent extends CorePaymentMethodComponent {
    protected userPaymentService: UserPaymentService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressService;
    protected checkoutPaymentFacade: CheckoutPaymentService;
    protected activatedRoute: ActivatedRoute;
    protected translationService: TranslationService;
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutStepService: CheckoutStepService;
    protected globalMessageService: GlobalMessageService;
    showCallbackScreen: boolean;
    isDpCallback(): boolean;
    hideCallbackScreen(): void;
    paymentDetailsAdded(paymentDetails: PaymentDetails): void;
    constructor(userPaymentService: UserPaymentService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressService, checkoutPaymentFacade: CheckoutPaymentService, activatedRoute: ActivatedRoute, translationService: TranslationService, activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService, globalMessageService: GlobalMessageService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DpPaymentMethodComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DpPaymentMethodComponent, "cx-payment-method", never, {}, {}, never, never, false, never>;
}
