import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade, CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { UserAddressService, UserPaymentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import * as i0 from "@angular/core";
export declare class ExpressCheckoutService {
    protected userAddressService: UserAddressService;
    protected userPaymentService: UserPaymentService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected checkoutPaymentFacade: CheckoutPaymentFacade;
    protected checkoutConfigService: CheckoutConfigService;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    private deliveryAddressSet$;
    private deliveryModeSet$;
    private paymentMethodSet$;
    constructor(userAddressService: UserAddressService, userPaymentService: UserPaymentService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, checkoutPaymentFacade: CheckoutPaymentFacade, checkoutConfigService: CheckoutConfigService, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade);
    protected setDeliveryAddress(): void;
    protected setDeliveryMode(): void;
    protected setPaymentMethod(): void;
    trySetDefaultCheckoutDetails(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressCheckoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExpressCheckoutService>;
}
