/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { deepMerge, PageType, } from '@spartacus/core';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./cms-components.service";
import * as i3 from "./cms-guards.service";
// This service should be exposed in public API only after the refactor planned in https://github.com/SAP/spartacus/issues/7070
export class CmsRoutesImplService {
    constructor(router, cmsComponentsService, cmsGuardsService) {
        this.router = router;
        this.cmsComponentsService = cmsComponentsService;
        this.cmsGuardsService = cmsGuardsService;
    }
    cmsRouteExists(url) {
        const isCmsDrivenRoute = url.startsWith('/');
        if (!isCmsDrivenRoute) {
            return false;
        }
        const routePath = url.substring(1);
        return (isCmsDrivenRoute &&
            !!this.router.config.find((route) => route.data && route.data.cxCmsRouteContext && route.path === routePath));
    }
    /**
     * Contains Cms driven routing logic intended for use use in guards, especially in canActivate method.
     *
     * Will return true, when logic wont have to modify routing (so canActivate could be easily resolved to true)
     * or will return false, when routing configuration was updated and redirection to newly generated route was initiated.
     *
     * @param pageContext
     * @param currentUrl
     */
    handleCmsRoutesInGuard(pageContext, componentTypes, currentUrl, currentPageLabel) {
        if (this.cmsRouteExists(currentPageLabel)) {
            return true;
        }
        const childRoutesConfig = this.cmsComponentsService.getChildRoutes(componentTypes);
        if (childRoutesConfig?.children?.length) {
            if (this.updateRouting(pageContext, currentPageLabel, childRoutesConfig)) {
                this.router.navigateByUrl(currentUrl);
                return false;
            }
        }
        return true;
    }
    updateRouting(pageContext, pageLabel, childRoutesConfig) {
        if (pageContext.type === PageType.CONTENT_PAGE &&
            pageLabel.startsWith('/') &&
            pageLabel.length > 1) {
            const children = this.wrapCmsGuardsRecursively(childRoutesConfig.children ?? []);
            const newRoute = {
                path: pageLabel.substring(1),
                component: PageLayoutComponent,
                children: children,
                data: deepMerge({}, childRoutesConfig?.parent?.data ?? {}, {
                    cxCmsRouteContext: {
                        type: pageContext.type,
                        id: pageLabel,
                    },
                }),
            };
            this.router.resetConfig([newRoute, ...this.router.config]);
            return true;
        }
        return false;
    }
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
    wrapCmsGuardsRecursively(routes) {
        return routes.map((route) => {
            if (route.children) {
                route.children = this.wrapCmsGuardsRecursively(route.children);
            }
            if (route?.canActivate?.length) {
                route.canActivate = route.canActivate.map((guard) => this.wrapCmsGuard(guard));
            }
            return route;
        });
    }
    /**
     * Returns a wrapper function `CanActivateFn` (https://angular.io/api/router/CanActivateFn)
     * that injects the given guard instance and runs its method `.canActivate()`.
     *
     * It allows to inject the guard's instance (and it's dependencies)
     * even if it's 'provided only in a child injector of a lazy-loaded module.
     */
    wrapCmsGuard(guardClass) {
        return (route, state) => {
            return this.cmsGuardsService.canActivateGuard(guardClass, route, state);
        };
    }
}
CmsRoutesImplService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsRoutesImplService, deps: [{ token: i1.Router }, { token: i2.CmsComponentsService }, { token: i3.CmsGuardsService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsRoutesImplService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsRoutesImplService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsRoutesImplService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.CmsComponentsService }, { type: i3.CmsGuardsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXJvdXRlcy1pbXBsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VydmljZXMvY21zLXJvdXRlcy1pbXBsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFRakQsT0FBTyxFQUdMLFNBQVMsRUFFVCxRQUFRLEdBQ1QsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7Ozs7QUFJaEYsK0hBQStIO0FBRS9ILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDVSxNQUFjLEVBQ2Qsb0JBQTBDLEVBQzFDLGdCQUFrQztRQUZsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ3pDLENBQUM7SUFFSSxjQUFjLENBQUMsR0FBVztRQUNoQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLE9BQU8sQ0FDTCxnQkFBZ0I7WUFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdkIsQ0FBQyxLQUFlLEVBQUUsRUFBRSxDQUNsQixLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLENBQ3pFLENB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TUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIFJvdXRlLFxuICBSb3V0ZXIsXG4gIFJvdXRlclN0YXRlU25hcHNob3QsXG4gIFVybFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb21wb25lbnRDaGlsZFJvdXRlc0NvbmZpZyxcbiAgQ21zUm91dGUsXG4gIGRlZXBNZXJnZSxcbiAgUGFnZUNvbnRleHQsXG4gIFBhZ2VUeXBlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGFnZUxheW91dENvbXBvbmVudCB9IGZyb20gJy4uL3BhZ2UvcGFnZS1sYXlvdXQvcGFnZS1sYXlvdXQuY29tcG9uZW50JztcbmltcG9ydCB7IENtc0NvbXBvbmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9jbXMtY29tcG9uZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IENtc0d1YXJkc1NlcnZpY2UgfSBmcm9tICcuL2Ntcy1ndWFyZHMuc2VydmljZSc7XG5cbi8vIFRoaXMgc2VydmljZSBzaG91bGQgYmUgZXhwb3NlZCBpbiBwdWJsaWMgQVBJIG9ubHkgYWZ0ZXIgdGhlIHJlZmFjdG9yIHBsYW5uZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL1NBUC9zcGFydGFjdXMvaXNzdWVzLzcwNzBcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ21zUm91dGVzSW1wbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgY21zQ29tcG9uZW50c1NlcnZpY2U6IENtc0NvbXBvbmVudHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY21zR3VhcmRzU2VydmljZTogQ21zR3VhcmRzU2VydmljZVxuICApIHt9XG5cbiAgcHJpdmF0ZSBjbXNSb3V0ZUV4aXN0cyh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzQ21zRHJpdmVuUm91dGUgPSB1cmwuc3RhcnRzV2l0aCgnLycpO1xuXG4gICAgaWYgKCFpc0Ntc0RyaXZlblJvdXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVQYXRoID0gdXJsLnN1YnN0cmluZygxKTtcblxuICAgIHJldHVybiAoXG4gICAgICBpc0Ntc0RyaXZlblJvdXRlICYmXG4gICAgICAhIXRoaXMucm91dGVyLmNvbmZpZy5maW5kKFxuICAgICAgICAocm91dGU6IENtc1JvdXRlKSA9PlxuICAgICAgICAgIHJvdXRlLmRhdGEgJiYgcm91dGUuZGF0YS5jeENtc1JvdXRlQ29udGV4dCAmJiByb3V0ZS5wYXRoID09PSByb3V0ZVBhdGhcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIENtcyBkcml2ZW4gcm91dGluZyBsb2dpYyBpbnRlbmRlZCBmb3IgdXNlIHVzZSBpbiBndWFyZHMsIGVzcGVjaWFsbHkgaW4gY2FuQWN0aXZhdGUgbWV0aG9kLlxuICAgKlxuICAgKiBXaWxsIHJldHVybiB0cnVlLCB3aGVuIGxvZ2ljIHdvbnQgaGF2ZSB0byBtb2RpZnkgcm91dGluZyAoc28gY2FuQWN0aXZhdGUgY291bGQgYmUgZWFzaWx5IHJlc29sdmVkIHRvIHRydWUpXG4gICAqIG9yIHdpbGwgcmV0dXJuIGZhbHNlLCB3aGVuIHJvdXRpbmcgY29uZmlndXJhdGlvbiB3YXMgdXBkYXRlZCBhbmQgcmVkaXJlY3Rpb24gdG8gbmV3bHkgZ2VuZXJhdGVkIHJvdXRlIHdhcyBpbml0aWF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSBwYWdlQ29udGV4dFxuICAgKiBAcGFyYW0gY3VycmVudFVybFxuICAgKi9cbiAgaGFuZGxlQ21zUm91dGVzSW5HdWFyZChcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHQsXG4gICAgY29tcG9uZW50VHlwZXM6IHN0cmluZ1tdLFxuICAgIGN1cnJlbnRVcmw6IHN0cmluZyxcbiAgICBjdXJyZW50UGFnZUxhYmVsOiBzdHJpbmdcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY21zUm91dGVFeGlzdHMoY3VycmVudFBhZ2VMYWJlbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkUm91dGVzQ29uZmlnID1cbiAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UuZ2V0Q2hpbGRSb3V0ZXMoY29tcG9uZW50VHlwZXMpO1xuXG4gICAgaWYgKGNoaWxkUm91dGVzQ29uZmlnPy5jaGlsZHJlbj8ubGVuZ3RoKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudXBkYXRlUm91dGluZyhwYWdlQ29udGV4dCwgY3VycmVudFBhZ2VMYWJlbCwgY2hpbGRSb3V0ZXNDb25maWcpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChjdXJyZW50VXJsKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUm91dGluZyhcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHQsXG4gICAgcGFnZUxhYmVsOiBzdHJpbmcsXG4gICAgY2hpbGRSb3V0ZXNDb25maWc6IENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIHBhZ2VDb250ZXh0LnR5cGUgPT09IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSAmJlxuICAgICAgcGFnZUxhYmVsLnN0YXJ0c1dpdGgoJy8nKSAmJlxuICAgICAgcGFnZUxhYmVsLmxlbmd0aCA+IDFcbiAgICApIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy53cmFwQ21zR3VhcmRzUmVjdXJzaXZlbHkoXG4gICAgICAgIGNoaWxkUm91dGVzQ29uZmlnLmNoaWxkcmVuID8/IFtdXG4gICAgICApO1xuXG4gICAgICBjb25zdCBuZXdSb3V0ZTogQ21zUm91dGUgPSB7XG4gICAgICAgIHBhdGg6IHBhZ2VMYWJlbC5zdWJzdHJpbmcoMSksXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICBkYXRhOiBkZWVwTWVyZ2Uoe30sIGNoaWxkUm91dGVzQ29uZmlnPy5wYXJlbnQ/LmRhdGEgPz8ge30sIHtcbiAgICAgICAgICBjeENtc1JvdXRlQ29udGV4dDoge1xuICAgICAgICAgICAgdHlwZTogcGFnZUNvbnRleHQudHlwZSxcbiAgICAgICAgICAgIGlkOiBwYWdlTGFiZWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnJvdXRlci5yZXNldENvbmZpZyhbbmV3Um91dGUsIC4uLnRoaXMucm91dGVyLmNvbmZpZ10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyByZWN1cnNpdmVseSB0aGUgZ2l2ZW4gUm91dGVzIGFuZCB3cmFwcyBlYWNoIGBjYW5BY3RpdmF0ZWBcbiAgICogZ3VhcmQgb2YgZWFjaCBSb3V0ZSB3aXRoIGEgc3BlY2lhbCBgQ2FuQWN0aXZhdGVGbmAgZnVuY3Rpb24uXG4gICAqXG4gICAqIFRoaXMgc3BlY2lhbCB3cmFwcGVyIGZ1bmN0aW9uIGFsbG93cyBmb3IgcmVzb2x2aW5nXG4gICAqIHRob3NlIGd1YXJkcyBieSB0aGUgQW5ndWxhciBSb3V0ZXIgdXNpbmcgdGhlIGBVbmlmaWVkSW5qZWN0b3JgXG4gICAqIGluc3RlYWQgb2Ygb25seSByb290IGluamVjdG9yLlxuICAgKlxuICAgKiBUaGlzIGFsbG93cyBBbmd1bGFyIFJvdXRlciB0byBpbmplY3QgdGhlIGd1YXJkcyAoYW5kIHRoZWlyIGRlcGVuZGVuY2llcylcbiAgICogZXZlbiB3aGVuIHRoZXkgYXJlIHByb3ZpZGVkIG9ubHkgaW4gYSBjaGlsZCBpbmplY3RvciBvZiBhIGxhenktbG9hZGVkIG1vZHVsZS5cbiAgICovXG4gIHByaXZhdGUgd3JhcENtc0d1YXJkc1JlY3Vyc2l2ZWx5KHJvdXRlczogUm91dGVbXSk6IFJvdXRlW10ge1xuICAgIHJldHVybiByb3V0ZXMubWFwKChyb3V0ZSkgPT4ge1xuICAgICAgaWYgKHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgICAgIHJvdXRlLmNoaWxkcmVuID0gdGhpcy53cmFwQ21zR3VhcmRzUmVjdXJzaXZlbHkocm91dGUuY2hpbGRyZW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAocm91dGU/LmNhbkFjdGl2YXRlPy5sZW5ndGgpIHtcbiAgICAgICAgcm91dGUuY2FuQWN0aXZhdGUgPSByb3V0ZS5jYW5BY3RpdmF0ZS5tYXAoKGd1YXJkKSA9PlxuICAgICAgICAgIHRoaXMud3JhcENtc0d1YXJkKGd1YXJkKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm91dGU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHdyYXBwZXIgZnVuY3Rpb24gYENhbkFjdGl2YXRlRm5gIChodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9DYW5BY3RpdmF0ZUZuKVxuICAgKiB0aGF0IGluamVjdHMgdGhlIGdpdmVuIGd1YXJkIGluc3RhbmNlIGFuZCBydW5zIGl0cyBtZXRob2QgYC5jYW5BY3RpdmF0ZSgpYC5cbiAgICpcbiAgICogSXQgYWxsb3dzIHRvIGluamVjdCB0aGUgZ3VhcmQncyBpbnN0YW5jZSAoYW5kIGl0J3MgZGVwZW5kZW5jaWVzKVxuICAgKiBldmVuIGlmIGl0J3MgJ3Byb3ZpZGVkIG9ubHkgaW4gYSBjaGlsZCBpbmplY3RvciBvZiBhIGxhenktbG9hZGVkIG1vZHVsZS5cbiAgICovXG4gIHByaXZhdGUgd3JhcENtc0d1YXJkKFxuICAgIGd1YXJkQ2xhc3M6IFR5cGU8YW55PlxuICApOiAoXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3RcbiAgKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3RcbiAgICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jbXNHdWFyZHNTZXJ2aWNlLmNhbkFjdGl2YXRlR3VhcmQoZ3VhcmRDbGFzcywgcm91dGUsIHN0YXRlKTtcbiAgICB9O1xuICB9XG59XG4iXX0=