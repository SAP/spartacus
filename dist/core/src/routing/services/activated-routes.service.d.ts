import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Helper service to expose all activated routes
 */
export declare class ActivatedRoutesService {
    protected router: Router;
    constructor(router: Router);
    /**
     * Array of currently activated routes (from the root route to the leaf route).
     */
    readonly routes$: Observable<ActivatedRouteSnapshot[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActivatedRoutesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActivatedRoutesService>;
}
