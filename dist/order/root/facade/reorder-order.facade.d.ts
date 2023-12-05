import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class ReorderOrderFacade {
    /**
     * Create cart from an existing order
     */
    abstract reorder(orderId: string): Observable<CartModificationList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReorderOrderFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReorderOrderFacade>;
}
