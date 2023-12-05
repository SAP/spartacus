import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, CartOutlets } from '@spartacus/cart/base/root';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { GlobalMessageService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutDeliveryModeComponent {
    protected fb: UntypedFormBuilder;
    protected checkoutConfigService: CheckoutConfigService;
    protected activatedRoute: ActivatedRoute;
    protected checkoutStepService: CheckoutStepService;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    protected activeCartFacade: ActiveCartFacade;
    protected globalMessageService?: GlobalMessageService | undefined;
    protected busy$: BehaviorSubject<boolean>;
    protected readonly isSetDeliveryModeHttpErrorSub: BehaviorSubject<boolean>;
    readonly CartOutlets: typeof CartOutlets;
    isSetDeliveryModeHttpError$: Observable<boolean>;
    selectedDeliveryModeCode$: Observable<string | undefined>;
    supportedDeliveryModes$: Observable<import("@spartacus/cart/base/root").DeliveryMode[]>;
    backBtnText: string;
    mode: UntypedFormGroup;
    isUpdating$: Observable<boolean>;
    get deliveryModeInvalid(): boolean;
    constructor(fb: UntypedFormBuilder, checkoutConfigService: CheckoutConfigService, activatedRoute: ActivatedRoute, checkoutStepService: CheckoutStepService, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, activeCartFacade: ActiveCartFacade, globalMessageService: GlobalMessageService);
    /**
     * @deprecated since 6.2
     */
    constructor(fb: UntypedFormBuilder, checkoutConfigService: CheckoutConfigService, activatedRoute: ActivatedRoute, checkoutStepService: CheckoutStepService, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, activeCartFacade: ActiveCartFacade);
    changeMode(code: string | undefined): void;
    next(): void;
    back(): void;
    getAriaChecked(code: string | undefined): boolean;
    protected onSuccess(): void;
    protected onError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryModeComponent, [null, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutDeliveryModeComponent, "cx-delivery-mode", never, {}, {}, never, never, false, never>;
}
