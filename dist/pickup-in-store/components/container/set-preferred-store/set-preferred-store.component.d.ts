import { OnDestroy, OnInit } from '@angular/core';
import { PointOfServiceNames, PreferredStoreFacade } from '@spartacus/pickup-in-store/root';
import { ICON_TYPE, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SetPreferredStoreComponent implements OnInit, OnDestroy {
    protected preferredStoreFacade: PreferredStoreFacade;
    protected outlet: OutletContextData<PointOfServiceNames>;
    readonly ICON_TYPE: typeof ICON_TYPE;
    pointOfServiceName: PointOfServiceNames;
    storeSelected$: Observable<PointOfServiceNames | null>;
    subscription: Subscription;
    constructor(preferredStoreFacade: PreferredStoreFacade, outlet: OutletContextData<PointOfServiceNames>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setAsPreferred(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SetPreferredStoreComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SetPreferredStoreComponent, "cx-set-preferred-store", never, { "pointOfServiceName": "pointOfServiceName"; }, {}, never, never, false, never>;
}
