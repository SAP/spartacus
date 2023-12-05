import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { Address, GlobalMessageService, TranslationService, UserAddressService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutConfigService } from '../services';
import * as i0 from "@angular/core";
export interface CardWithAddress {
    card: Card;
    address: Address;
}
export declare class CheckoutDeliveryAddressComponent implements OnInit {
    protected userAddressService: UserAddressService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected activatedRoute: ActivatedRoute;
    protected translationService: TranslationService;
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutStepService: CheckoutStepService;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    protected globalMessageService: GlobalMessageService;
    protected checkoutConfigService?: CheckoutConfigService | undefined;
    protected busy$: BehaviorSubject<boolean>;
    cards$: Observable<CardWithAddress[]>;
    isUpdating$: Observable<boolean>;
    addressFormOpened: boolean;
    doneAutoSelect: boolean;
    selectedAddress?: Address;
    get isGuestCheckout(): boolean;
    get backBtnText(): string;
    get selectedAddress$(): Observable<Address | undefined>;
    constructor(userAddressService: UserAddressService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, activatedRoute: ActivatedRoute, translationService: TranslationService, activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, globalMessageService: GlobalMessageService, checkoutConfigService: CheckoutConfigService);
    /**
     * @deprecated since 6.2
     */
    constructor(userAddressService: UserAddressService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, activatedRoute: ActivatedRoute, translationService: TranslationService, activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, globalMessageService: GlobalMessageService);
    ngOnInit(): void;
    getCardContent(address: Address, selected: any, textDefaultDeliveryAddress: string, textShipToThisAddress: string, textSelected: string, textPhone: string, textMobile: string): Card;
    selectAddress(address: Address): void;
    addAddress(address: Address | undefined): void;
    showNewAddressForm(): void;
    hideNewAddressForm(goPrevious?: boolean): void;
    next(): void;
    back(): void;
    protected loadAddresses(): void;
    protected createCards(): Observable<CardWithAddress[]>;
    protected selectDefaultAddress(addresses: Address[], selected: Address | undefined): void;
    protected getSupportedAddresses(): Observable<Address[]>;
    protected createIsUpdating(): Observable<boolean>;
    protected getAddressLoading(): Observable<boolean>;
    protected setAddress(address: Address): void;
    protected onSuccess(): void;
    protected onError(): void;
    protected shouldUseAddressSavedInCart(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryAddressComponent, [null, null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutDeliveryAddressComponent, "cx-delivery-address", never, {}, {}, never, never, false, never>;
}
