import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, PaymentDetails } from '@spartacus/cart/base/root';
import { CheckoutDeliveryAddressFacade, CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { Address, GlobalMessageService, TranslationService, UserPaymentService } from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentMethodComponent implements OnInit, OnDestroy {
    protected userPaymentService: UserPaymentService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected checkoutPaymentFacade: CheckoutPaymentFacade;
    protected activatedRoute: ActivatedRoute;
    protected translationService: TranslationService;
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutStepService: CheckoutStepService;
    protected globalMessageService: GlobalMessageService;
    protected subscriptions: Subscription;
    protected deliveryAddress: Address | undefined;
    protected busy$: BehaviorSubject<boolean>;
    cards$: Observable<{
        content: Card;
        paymentMethod: PaymentDetails;
    }[]>;
    iconTypes: typeof ICON_TYPE;
    isGuestCheckout: boolean;
    newPaymentFormManuallyOpened: boolean;
    doneAutoSelect: boolean;
    paymentDetails?: PaymentDetails;
    isUpdating$: Observable<boolean>;
    get backBtnText(): string;
    get existingPaymentMethods$(): Observable<PaymentDetails[]>;
    get selectedMethod$(): Observable<PaymentDetails | undefined>;
    constructor(userPaymentService: UserPaymentService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, checkoutPaymentFacade: CheckoutPaymentFacade, activatedRoute: ActivatedRoute, translationService: TranslationService, activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService, globalMessageService: GlobalMessageService);
    ngOnInit(): void;
    selectDefaultPaymentMethod(paymentMethods: {
        payment: PaymentDetails;
        expiryTranslation: string;
    }[], selectedMethod: PaymentDetails | undefined): void;
    selectPaymentMethod(paymentDetails: PaymentDetails): void;
    showNewPaymentForm(): void;
    hideNewPaymentForm(): void;
    setPaymentDetails({ paymentDetails, billingAddress, }: {
        paymentDetails: PaymentDetails;
        billingAddress?: Address;
    }): void;
    next(): void;
    back(): void;
    protected savePaymentMethod(paymentDetails: PaymentDetails): void;
    protected getCardIcon(code: string): string;
    protected createCard(paymentDetails: PaymentDetails, cardLabels: {
        textDefaultPaymentMethod: string;
        textExpires: string;
        textUseThisPayment: string;
        textSelected: string;
    }, selected: PaymentDetails | undefined): Card;
    protected onSuccess(): void;
    protected onError(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentMethodComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutPaymentMethodComponent, "cx-payment-method", never, {}, {}, never, never, false, never>;
}
