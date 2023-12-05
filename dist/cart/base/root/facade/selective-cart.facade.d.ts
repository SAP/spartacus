import { Observable } from 'rxjs';
import { Cart, OrderEntry } from '../models/cart.model';
import * as i0 from "@angular/core";
export declare abstract class SelectiveCartFacade {
    abstract getCart(): Observable<Cart>;
    abstract getEntries(): Observable<OrderEntry[]>;
    /**
     * Returns true when selective cart is stable (not loading and not pending processes on cart)
     */
    abstract isStable(): Observable<boolean>;
    abstract addEntry(productCode: string, quantity: number): void;
    abstract removeEntry(entry: OrderEntry): void;
    abstract updateEntry(entryNumber: number, quantity: number): void;
    abstract getEntry(productCode: string): Observable<OrderEntry | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectiveCartFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SelectiveCartFacade>;
}
