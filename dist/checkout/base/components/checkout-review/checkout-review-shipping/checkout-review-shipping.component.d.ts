import { ActiveCartFacade, CartOutlets, DeliveryMode, OrderEntry } from '@spartacus/cart/base/root';
import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { Address, TranslationService } from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutReviewShippingComponent {
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected translationService: TranslationService;
    protected checkoutStepService: CheckoutStepService;
    readonly cartOutlets: typeof CartOutlets;
    iconTypes: typeof ICON_TYPE;
    deliveryAddressStepRoute: string | undefined;
    deliveryModeStepRoute: string | undefined;
    constructor(activeCartFacade: ActiveCartFacade, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, translationService: TranslationService, checkoutStepService: CheckoutStepService);
    entries$: Observable<OrderEntry[]>;
    deliveryAddress$: Observable<Address | undefined>;
    deliveryMode$: Observable<DeliveryMode | undefined>;
    getDeliveryAddressCard(deliveryAddress: Address, countryName?: string): Observable<Card>;
    getDeliveryModeCard(deliveryMode: DeliveryMode): Observable<Card>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutReviewShippingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutReviewShippingComponent, "cx-checkout-review-shipping", never, {}, {}, never, never, false, never>;
}
