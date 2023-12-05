import { OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { CheckoutPlaceOrderComponent } from '@spartacus/checkout/base/components';
import { RoutingService } from '@spartacus/core';
import { OrderFacade, ORDER_TYPE, ScheduledReplenishmentOrderFacade, ScheduleReplenishmentForm } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form.service';
import * as i0 from "@angular/core";
export declare class CheckoutScheduledReplenishmentPlaceOrderComponent extends CheckoutPlaceOrderComponent implements OnInit, OnDestroy {
    protected orderFacade: OrderFacade;
    protected routingService: RoutingService;
    protected fb: UntypedFormBuilder;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService;
    protected scheduledReplenishmentOrderFacade: ScheduledReplenishmentOrderFacade;
    protected subscriptions: Subscription;
    currentOrderType: ORDER_TYPE;
    scheduleReplenishmentFormData: ScheduleReplenishmentForm;
    daysOfWeekNotChecked$: BehaviorSubject<boolean>;
    constructor(orderFacade: OrderFacade, routingService: RoutingService, fb: UntypedFormBuilder, launchDialogService: LaunchDialogService, vcr: ViewContainerRef, checkoutReplenishmentFormService: CheckoutReplenishmentFormService, scheduledReplenishmentOrderFacade: ScheduledReplenishmentOrderFacade);
    submitForm(): void;
    ngOnInit(): void;
    onSuccess(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutScheduledReplenishmentPlaceOrderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutScheduledReplenishmentPlaceOrderComponent, "cx-place-order", never, {}, {}, never, never, false, never>;
}
