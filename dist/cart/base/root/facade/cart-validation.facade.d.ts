import { Observable } from 'rxjs';
import { CartModification, CartModificationList } from '../models/cart.model';
import * as i0 from "@angular/core";
export declare abstract class CartValidationFacade {
    /**
     * Validates cart, and returns cart modification list.
     */
    abstract validateCart(): Observable<CartModificationList>;
    /**
     * Returns cart modification results
     */
    abstract getValidationResults(): Observable<CartModification[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartValidationFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartValidationFacade>;
}
