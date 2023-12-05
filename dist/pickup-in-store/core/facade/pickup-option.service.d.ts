import { Store } from '@ngrx/store';
import { PickupOption, PickupOptionFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { StateWithPickupOption } from '../store/index';
import * as i0 from "@angular/core";
/**
 * A service for managing the page context and pickup option for a cart entry.
 */
export declare class PickupOptionService implements PickupOptionFacade {
    protected store: Store<StateWithPickupOption>;
    constructor(store: Store<StateWithPickupOption>);
    setPageContext(pageContext: string): void;
    getPageContext(): Observable<string>;
    setPickupOption(entryNumber: number, pickupOption: PickupOption): void;
    getPickupOption(entryNumber: number): Observable<PickupOption | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupOptionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupOptionService>;
}
