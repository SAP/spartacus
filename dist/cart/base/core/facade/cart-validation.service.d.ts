import { ActiveCartFacade, CartModification, CartModificationList, CartValidationFacade } from '@spartacus/cart/base/root';
import { Command, CommandService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';
import { CartValidationStateService } from '../services/cart-validation-state.service';
import * as i0 from "@angular/core";
export declare class CartValidationService implements CartValidationFacade {
    protected cartValidationConnector: CartValidationConnector;
    protected command: CommandService;
    protected userIdService: UserIdService;
    protected activeCartFacade: ActiveCartFacade;
    protected cartValidationStateService: CartValidationStateService;
    protected validateCartCommand: Command<void, CartModificationList>;
    constructor(cartValidationConnector: CartValidationConnector, command: CommandService, userIdService: UserIdService, activeCartFacade: ActiveCartFacade, cartValidationStateService: CartValidationStateService);
    /**
     * Validates cart and returns cart modification list.
     */
    validateCart(): Observable<CartModificationList>;
    /**
     * Returns cart modification results
     */
    getValidationResults(): Observable<CartModification[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartValidationService>;
}
