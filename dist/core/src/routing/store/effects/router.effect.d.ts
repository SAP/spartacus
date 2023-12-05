import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RouterEffects {
    private actions$;
    private router;
    clearCmsRoutes$: Observable<Action>;
    constructor(actions$: Actions, router: Router);
    static ɵfac: i0.ɵɵFactoryDeclaration<RouterEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RouterEffects>;
}
