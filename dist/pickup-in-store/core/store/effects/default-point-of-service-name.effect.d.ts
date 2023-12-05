import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WindowRef } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { StateWithPickupLocations } from '../pickup-location-state';
import * as i0 from "@angular/core";
export declare class DefaultPointOfServiceEffect {
    private actions$;
    protected store: Store<StateWithPickupLocations>;
    protected userProfileService: UserProfileFacade;
    protected winRef: WindowRef;
    constructor(actions$: Actions, store: Store<StateWithPickupLocations>, userProfileService: UserProfileFacade, winRef: WindowRef);
    loadDefaultPointOfService$: import("rxjs").Observable<{
        payload: Required<{
            name: string;
            displayName: string;
        }>;
    } & import("@ngrx/store/src/models").TypedAction<"[Default Point Of Service] Load Default Point Of Service Success">> & import("@ngrx/effects").CreateEffectMetadata;
    setDefaultPointOfService$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[Default Point Of Service] Load Default Point Of Service">> & import("@ngrx/effects").CreateEffectMetadata;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultPointOfServiceEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultPointOfServiceEffect>;
}
