import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { PickupLocationConnector } from '../../connectors';
import * as i0 from "@angular/core";
export declare class PickupLocationEffect {
    private actions$;
    private pickupLocationConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, pickupLocationConnector: PickupLocationConnector);
    storeDetails$: import("rxjs").Observable<({
        payload: import("@spartacus/core").PointOfService;
    } & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Get Store Details Success">) | ({
        payload: any;
    } & import("@ngrx/store/src/models").TypedAction<"[Pickup Locations] Get Store Details Fail">)> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupLocationEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupLocationEffect>;
}
