import { Observable } from 'rxjs';
import { PickupOption } from '../model';
import * as i0 from "@angular/core";
export declare abstract class PickupOptionFacade {
    abstract setPageContext(pageContext: string): void;
    abstract getPageContext(): Observable<string>;
    abstract setPickupOption(entryNumber: number, pickupOption: PickupOption): void;
    abstract getPickupOption(entryNumber: number): Observable<PickupOption | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupOptionFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupOptionFacade>;
}
