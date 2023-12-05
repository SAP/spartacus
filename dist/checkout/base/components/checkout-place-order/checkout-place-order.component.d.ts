import { ComponentRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutPlaceOrderComponent implements OnDestroy {
    protected orderFacade: OrderFacade;
    protected routingService: RoutingService;
    protected fb: UntypedFormBuilder;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    placedOrder: void | Observable<ComponentRef<any> | undefined>;
    checkoutSubmitForm: UntypedFormGroup;
    get termsAndConditionInvalid(): boolean;
    constructor(orderFacade: OrderFacade, routingService: RoutingService, fb: UntypedFormBuilder, launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    submitForm(): void;
    onSuccess(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPlaceOrderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutPlaceOrderComponent, "cx-place-order", never, {}, {}, never, never, false, never>;
}
