import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { EventService, GlobalMessageService, UserIdService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class ClearCartDialogComponentService {
    protected launchDialogService: LaunchDialogService;
    protected globalMessageService: GlobalMessageService;
    protected activeCartFacade: ActiveCartFacade;
    protected multiCartFacade: MultiCartFacade;
    protected userIdService: UserIdService;
    protected eventService: EventService;
    constructor(launchDialogService: LaunchDialogService, globalMessageService: GlobalMessageService, activeCartFacade: ActiveCartFacade, multiCartFacade: MultiCartFacade, userIdService: UserIdService, eventService: EventService);
    /**
     * Clear the cart by deleting the active cart.
     */
    deleteActiveCart(): void;
    /**
     * Close clear cart modal dialog
     *
     * @param reason to close dialog
     */
    closeDialog(reason: string): void;
    /**
     * Display global message after clearing cart.
     * By default, only message displayed is of type `Success`. A negative scenario
     * related to cart has been handled in the occ layer already.
     *
     * @param success result of clear cart action
     */
    protected displayGlobalMessage(success: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClearCartDialogComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClearCartDialogComponentService>;
}
