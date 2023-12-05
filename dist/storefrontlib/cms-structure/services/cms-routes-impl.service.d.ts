import { Router } from '@angular/router';
import { PageContext } from '@spartacus/core';
import { CmsComponentsService } from './cms-components.service';
import { CmsGuardsService } from './cms-guards.service';
import * as i0 from "@angular/core";
export declare class CmsRoutesImplService {
    private router;
    private cmsComponentsService;
    private cmsGuardsService;
    constructor(router: Router, cmsComponentsService: CmsComponentsService, cmsGuardsService: CmsGuardsService);
    private cmsRouteExists;
    /**
     * Contains Cms driven routing logic intended for use use in guards, especially in canActivate method.
     *
     * Will return true, when logic wont have to modify routing (so canActivate could be easily resolved to true)
     * or will return false, when routing configuration was updated and redirection to newly generated route was initiated.
     *
     * @param pageContext
     * @param currentUrl
     */
    handleCmsRoutesInGuard(pageContext: PageContext, componentTypes: string[], currentUrl: string, currentPageLabel: string): boolean;
    private updateRouting;
    /**
     * Traverses recursively the given Routes and wraps each `canActivate`
     * guard of each Route with a special `CanActivateFn` function.
     *
     * This special wrapper function allows for resolving
     * those guards by the Angular Router using the `UnifiedInjector`
     * instead of only root injector.
     *
     * This allows Angular Router to inject the guards (and their dependencies)
     * even when they are provided only in a child injector of a lazy-loaded module.
     */
    private wrapCmsGuardsRecursively;
    /**
     * Returns a wrapper function `CanActivateFn` (https://angular.io/api/router/CanActivateFn)
     * that injects the given guard instance and runs its method `.canActivate()`.
     *
     * It allows to inject the guard's instance (and it's dependencies)
     * even if it's 'provided only in a child injector of a lazy-loaded module.
     */
    private wrapCmsGuard;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsRoutesImplService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsRoutesImplService>;
}
