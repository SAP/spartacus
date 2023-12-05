import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutCostCenterFacade, CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutDeliveryAddressComponent, CheckoutStepService } from '@spartacus/checkout/base/components';
import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { Address, GlobalMessageService, TranslationService, UserAddressService, UserCostCenterService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export interface CardWithAddress {
    card: Card;
    address: Address;
}
export declare class B2BCheckoutDeliveryAddressComponent extends CheckoutDeliveryAddressComponent implements OnInit, OnDestroy {
    protected userAddressService: UserAddressService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected activatedRoute: ActivatedRoute;
    protected translationService: TranslationService;
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutStepService: CheckoutStepService;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    protected globalMessageService: GlobalMessageService;
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade;
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
    protected userCostCenterService: UserCostCenterService;
    protected subscriptions: Subscription;
    protected isAccountPayment$: Observable<boolean>;
    protected costCenterAddresses$: Observable<Address[]>;
    protected creditCardAddressLoading$: Observable<boolean>;
    protected accountAddressLoading$: Observable<boolean>;
    isAccountPayment: boolean;
    constructor(userAddressService: UserAddressService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, activatedRoute: ActivatedRoute, translationService: TranslationService, activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, globalMessageService: GlobalMessageService, checkoutCostCenterFacade: CheckoutCostCenterFacade, checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade, userCostCenterService: UserCostCenterService);
    ngOnInit(): void;
    protected loadAddresses(): void;
    protected getAddressLoading(): Observable<boolean>;
    protected getSupportedAddresses(): Observable<Address[]>;
    protected selectDefaultAddress(addresses: Address[], selected: Address | undefined): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<B2BCheckoutDeliveryAddressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<B2BCheckoutDeliveryAddressComponent, "cx-delivery-address", never, {}, {}, never, never, false, never>;
}
