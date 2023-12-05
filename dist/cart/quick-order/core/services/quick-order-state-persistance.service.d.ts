import { OnDestroy } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { SiteContextParamsService, StatePersistenceService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class QuickOrderStatePersistenceService implements OnDestroy {
    protected quickOrderService: QuickOrderFacade;
    protected siteContextParamsService: SiteContextParamsService;
    protected statePersistenceService: StatePersistenceService;
    protected subscription: Subscription;
    constructor(quickOrderService: QuickOrderFacade, siteContextParamsService: SiteContextParamsService, statePersistenceService: StatePersistenceService);
    /**
     * Identifier used for storage key.
     */
    protected key: string;
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync(): void;
    protected onRead(state: OrderEntry[] | undefined): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderStatePersistenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QuickOrderStatePersistenceService>;
}
