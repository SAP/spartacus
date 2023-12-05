import { CartModification, CartValidationStatusCode, MultiCartFacade } from '@spartacus/cart/base/root';
import { ReorderOrderFacade } from '@spartacus/order/root';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ReorderDialogComponent {
    protected launchDialogService: LaunchDialogService;
    protected reorderOrderFacade: ReorderOrderFacade;
    protected multiCartFacade: MultiCartFacade;
    iconTypes: typeof ICON_TYPE;
    focusConfig: FocusConfig;
    cartModifications: CartModification[] | undefined;
    loading$: BehaviorSubject<boolean>;
    showDecisionPrompt$: BehaviorSubject<boolean>;
    data$: import("rxjs").Observable<any>;
    constructor(launchDialogService: LaunchDialogService, reorderOrderFacade: ReorderOrderFacade, multiCartFacade: MultiCartFacade);
    createCartFromOrder(orderCode: string): void;
    close(reason: string): void;
    get cartValidationStatusCode(): typeof CartValidationStatusCode;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReorderDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReorderDialogComponent, "cx-reorder-dialog", never, {}, {}, never, never, false, never>;
}
