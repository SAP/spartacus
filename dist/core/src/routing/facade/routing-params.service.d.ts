import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoutesService } from '../services/activated-routes.service';
import * as i0 from "@angular/core";
/**
 * Service to expose all parameters for the router, including child routes.
 * This is convenient in case the parent route (component) requires awareness
 * of child routes parameters.
 */
export declare class RoutingParamsService {
    protected router: Router;
    protected activatedRoutesService: ActivatedRoutesService;
    protected readonly params$: Observable<{
        [key: string]: string;
    }>;
    constructor(router: Router, activatedRoutesService: ActivatedRoutesService);
    /**
     * Get the list of all parameters of the full route. This includes
     * active child routes.
     */
    getParams(): Observable<{
        [key: string]: string;
    }>;
    protected findAllParam(routes: ActivatedRouteSnapshot[]): {
        [key: string]: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<RoutingParamsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoutingParamsService>;
}
