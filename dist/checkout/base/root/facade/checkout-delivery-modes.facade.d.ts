import { DeliveryMode } from '@spartacus/cart/base/root';
import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class CheckoutDeliveryModesFacade {
    /**
     * Returns the supported delivery modes state.
     */
    abstract getSupportedDeliveryModesState(): Observable<QueryState<DeliveryMode[]>>;
    /**
     * Returns the supported delivery modes, or an empty array if the data is undefined.
     */
    abstract getSupportedDeliveryModes(): Observable<DeliveryMode[]>;
    /**
     * Returns the selected delivery mode
     */
    abstract getSelectedDeliveryModeState(): Observable<QueryState<DeliveryMode | undefined>>;
    /**
     * Sets the provided delivery mode to the current cart
     */
    abstract setDeliveryMode(mode: string): Observable<unknown>;
    /**
     * Clears the selected delivery mode from the current cart
     */
    abstract clearCheckoutDeliveryMode(): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryModesFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryModesFacade>;
}
