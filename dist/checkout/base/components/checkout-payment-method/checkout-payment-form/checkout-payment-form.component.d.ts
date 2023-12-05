import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { CheckoutDeliveryAddressFacade, CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { Address, AddressValidation, Country, GlobalMessageService, Region, TranslationService, UserAddressService, UserPaymentService } from '@spartacus/core';
import { Card, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentFormComponent implements OnInit {
    protected checkoutPaymentFacade: CheckoutPaymentFacade;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected userPaymentService: UserPaymentService;
    protected globalMessageService: GlobalMessageService;
    protected fb: UntypedFormBuilder;
    protected userAddressService: UserAddressService;
    protected launchDialogService: LaunchDialogService;
    protected translationService: TranslationService;
    iconTypes: typeof ICON_TYPE;
    months: string[];
    years: number[];
    cardTypes$: Observable<CardType[]>;
    deliveryAddress$: Observable<Address | undefined>;
    countries$: Observable<Country[]>;
    sameAsDeliveryAddress: boolean;
    regions$: Observable<Region[]>;
    selectedCountry$: BehaviorSubject<string>;
    showSameAsDeliveryAddressCheckbox$: Observable<boolean>;
    loading: boolean;
    setAsDefaultField: boolean;
    paymentMethodsCount: number;
    paymentDetails?: PaymentDetails;
    goBack: EventEmitter<any>;
    closeForm: EventEmitter<any>;
    setPaymentDetails: EventEmitter<any>;
    paymentForm: UntypedFormGroup;
    billingAddressForm: UntypedFormGroup;
    constructor(checkoutPaymentFacade: CheckoutPaymentFacade, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, userPaymentService: UserPaymentService, globalMessageService: GlobalMessageService, fb: UntypedFormBuilder, userAddressService: UserAddressService, launchDialogService: LaunchDialogService, translationService: TranslationService);
    ngOnInit(): void;
    expMonthAndYear(): void;
    toggleDefaultPaymentMethod(): void;
    toggleSameAsDeliveryAddress(): void;
    getAddressCardContent(address: Address): Observable<Card>;
    openSuggestedAddress(results: AddressValidation): void;
    close(): void;
    back(): void;
    /**
     *TODO: This method is not used, but should be. It triggers suggested addresses modal under the hood.
     *
     * See ticket CXSPA-1276
     */
    verifyAddress(): void;
    protected handleAddressVerificationResults(results: AddressValidation): void;
    countrySelected(country: Country): void;
    next(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutPaymentFormComponent, "cx-payment-form", never, { "loading": "loading"; "setAsDefaultField": "setAsDefaultField"; "paymentMethodsCount": "paymentMethodsCount"; "paymentDetails": "paymentDetails"; }, { "goBack": "goBack"; "closeForm": "closeForm"; "setPaymentDetails": "setPaymentDetails"; }, never, never, false, never>;
}
