import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SiteContextParamsService, StatePersistenceService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { StateWithMultiCart } from '../store/multi-cart-state';
import * as i0 from "@angular/core";
export declare class MultiCartStatePersistenceService implements OnDestroy {
    protected statePersistenceService: StatePersistenceService;
    protected store: Store<StateWithMultiCart>;
    protected siteContextParamsService: SiteContextParamsService;
    protected subscription: Subscription;
    constructor(statePersistenceService: StatePersistenceService, store: Store<StateWithMultiCart>, siteContextParamsService: SiteContextParamsService);
    initSync(): void;
    protected getCartState(): Observable<{
        active: string;
    }>;
    protected onRead(state: {
        active: string;
    } | undefined): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiCartStatePersistenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiCartStatePersistenceService>;
}
