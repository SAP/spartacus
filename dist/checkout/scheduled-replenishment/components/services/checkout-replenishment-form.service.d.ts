import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { ORDER_TYPE, ScheduleReplenishmentForm } from '@spartacus/order/root';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutReplenishmentFormService implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    /**
     * Default form data
     */
    readonly defaultFormData: ScheduleReplenishmentForm;
    private scheduleReplenishmentFormData$;
    protected orderType$: Observable<ORDER_TYPE>;
    constructor(eventService: EventService);
    protected registerOrderTypeEventListers(): void;
    /**
     * Get replenishment form data
     */
    getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm>;
    /**
     * Set replenishment form data
     * @param formData : an object containing the data for scheduling a replenishment order
     */
    setScheduleReplenishmentFormData(formData: ScheduleReplenishmentForm): void;
    /**
     * Clears the existing replenishment form data to include the default replenishment form data
     */
    resetScheduleReplenishmentFormData(): void;
    /**
     * Get current checkout order type
     */
    getOrderType(): Observable<ORDER_TYPE>;
    /**
     * Set checkout order type
     * @param orderType : an enum of types of order we are placing
     */
    setOrderType(orderType: ORDER_TYPE): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutReplenishmentFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutReplenishmentFormService>;
}
