import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class AsmBindCartFacade {
    /**
     * Bind an anonymous cart to the current registered user
     */
    abstract bindCart(cartId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmBindCartFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmBindCartFacade>;
}
