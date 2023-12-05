import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare function futureStockFacadeFactory(): FutureStockFacade;
export declare abstract class FutureStockFacade {
    /**
     * Get future stock
     */
    abstract getFutureStock(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FutureStockFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FutureStockFacade>;
}
