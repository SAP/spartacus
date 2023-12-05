import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ClearMiscsDataEffect {
    private actions$;
    clearMiscsData$: Observable<Action>;
    constructor(actions$: Actions);
    static ɵfac: i0.ɵɵFactoryDeclaration<ClearMiscsDataEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClearMiscsDataEffect>;
}
