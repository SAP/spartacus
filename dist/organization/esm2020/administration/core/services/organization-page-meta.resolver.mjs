/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageMetaResolver, PageType, } from '@spartacus/core';
import { combineLatest, defer, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Resolves the page data for Organization Pages.
 *
 * Breadcrumbs are built in this implementation only.
 *
 * @property {string} ORGANIZATION_SEMANTIC_ROUTE the default root path for organization pages.
 * @property {string} ORGANIZATION_TRANSLATION_KEY the default i18n key for the organization breadcrumb label.
 */
export class OrganizationPageMetaResolver extends PageMetaResolver {
    constructor(contentPageMetaResolver, translation, semanticPath, routingService) {
        super();
        this.contentPageMetaResolver = contentPageMetaResolver;
        this.translation = translation;
        this.semanticPath = semanticPath;
        this.routingService = routingService;
        this.pageTemplate = 'CompanyPageTemplate';
        this.pageType = PageType.CONTENT_PAGE;
        /**
         * Translation key for the breadcrumb of Organization home page
         */
        this.ORGANIZATION_TRANSLATION_KEY = 'organization.breadcrumb';
        /**
         * The semantic route of the organization landing page. It's used to recognize whether
         * we are on this page. In such a case we avoid showing the breadcrumb for this page.
         */
        this.ORGANIZATION_SEMANTIC_ROUTE = 'organization';
        /**
         * Breadcrumb of the Organization page.
         * It's empty when the current page is the Organization page.
         */
        this.organizationPageBreadcrumb$ = defer(() => this.routingService.getRouterState()).pipe(map((routerState) => routerState?.state?.semanticRoute), distinctUntilChanged(), switchMap((semanticRoute) => semanticRoute === this.ORGANIZATION_SEMANTIC_ROUTE
            ? of([])
            : this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(map((label) => [
                {
                    label,
                    link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
                },
            ]))));
        /**
         * Breadcrumbs returned in the method #resolveBreadcrumbs.
         */
        this.breadcrumbs$ = combineLatest([
            this.organizationPageBreadcrumb$,
            defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
        ]).pipe(map(([organizationPageBreadcrumb, breadcrumbs = []]) => {
            const [home, ...restBreadcrumbs] = breadcrumbs;
            return [home, ...organizationPageBreadcrumb, ...restBreadcrumbs];
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    resolveTitle() {
        return this.contentPageMetaResolver.resolveTitle();
    }
    resolveDescription() {
        return this.contentPageMetaResolver.resolveDescription();
    }
    resolveRobots() {
        return this.contentPageMetaResolver.resolveRobots();
    }
    /**
     * Returns list of breadcrumbs for:
     * - the home page
     * - the organization home page
     * - the organization's child pages (i.e. cost center list)
     * - sub-routes of the organization's child pages (i.e. cost center details, edit cost center, ...)
     */
    resolveBreadcrumbs() {
        return this.breadcrumbs$;
    }
}
OrganizationPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaResolver, deps: [{ token: i1.ContentPageMetaResolver }, { token: i1.TranslationService }, { token: i1.SemanticPathService }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
OrganizationPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ContentPageMetaResolver }, { type: i1.TranslationService }, { type: i1.SemanticPathService }, { type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLXBhZ2UtbWV0YS5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZS9zZXJ2aWNlcy9vcmdhbml6YXRpb24tcGFnZS1tZXRhLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFLTCxnQkFBZ0IsRUFJaEIsUUFBUSxHQUlULE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsR0FBRyxFQUNILFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXhCOzs7Ozs7O0dBT0c7QUFJSCxNQUFNLE9BQU8sNEJBQ1gsU0FBUSxnQkFBZ0I7SUFxQnhCLFlBQ1ksdUJBQWdELEVBQ2hELFdBQStCLEVBQy9CLFlBQWlDLEVBQ2pDLGNBQThCO1FBRXhDLEtBQUssRUFBRSxDQUFDO1FBTEUsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWxCMUMsaUJBQVksR0FBRyxxQkFBcUIsQ0FBQztRQUNyQyxhQUFRLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUVqQzs7V0FFRztRQUNnQixpQ0FBNEIsR0FBRyx5QkFBeUIsQ0FBQztRQUU1RTs7O1dBR0c7UUFDZ0IsZ0NBQTJCLEdBQUcsY0FBYyxDQUFDO1FBa0NoRTs7O1dBR0c7UUFDTyxnQ0FBMkIsR0FBaUMsS0FBSyxDQUN6RSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUMzQyxDQUFDLElBQUksQ0FDSixHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQ3ZELG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQzFCLGFBQWEsS0FBSyxJQUFJLENBQUMsMkJBQTJCO1lBQ2hELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FDaEUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDYjtvQkFDRSxLQUFLO29CQUNMLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUM7aUJBQzlEO2FBQ0YsQ0FBQyxDQUNILENBQ04sQ0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDTyxpQkFBWSxHQUFpQyxhQUFhLENBQUM7WUFDbkUsSUFBSSxDQUFDLDJCQUEyQjtZQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDL0QsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixFQUFFLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JELE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDL0MsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLDBCQUEwQixFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLEVBQ0YsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztJQTVERixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7O3lIQXBEVSw0QkFBNEI7NkhBQTVCLDRCQUE0QixjQUYzQixNQUFNOzJGQUVQLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCcmVhZGNydW1iTWV0YSxcbiAgQ29udGVudFBhZ2VNZXRhUmVzb2x2ZXIsXG4gIFBhZ2VCcmVhZGNydW1iUmVzb2x2ZXIsXG4gIFBhZ2VEZXNjcmlwdGlvblJlc29sdmVyLFxuICBQYWdlTWV0YVJlc29sdmVyLFxuICBQYWdlUm9ib3RzTWV0YSxcbiAgUGFnZVJvYm90c1Jlc29sdmVyLFxuICBQYWdlVGl0bGVSZXNvbHZlcixcbiAgUGFnZVR5cGUsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICBUcmFuc2xhdGlvblNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBkZWZlciwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBtYXAsXG4gIHNoYXJlUmVwbGF5LFxuICBzd2l0Y2hNYXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgcGFnZSBkYXRhIGZvciBPcmdhbml6YXRpb24gUGFnZXMuXG4gKlxuICogQnJlYWRjcnVtYnMgYXJlIGJ1aWx0IGluIHRoaXMgaW1wbGVtZW50YXRpb24gb25seS5cbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gT1JHQU5JWkFUSU9OX1NFTUFOVElDX1JPVVRFIHRoZSBkZWZhdWx0IHJvb3QgcGF0aCBmb3Igb3JnYW5pemF0aW9uIHBhZ2VzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IE9SR0FOSVpBVElPTl9UUkFOU0xBVElPTl9LRVkgdGhlIGRlZmF1bHQgaTE4biBrZXkgZm9yIHRoZSBvcmdhbml6YXRpb24gYnJlYWRjcnVtYiBsYWJlbC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvblBhZ2VNZXRhUmVzb2x2ZXJcbiAgZXh0ZW5kcyBQYWdlTWV0YVJlc29sdmVyXG4gIGltcGxlbWVudHNcbiAgICBQYWdlQnJlYWRjcnVtYlJlc29sdmVyLFxuICAgIFBhZ2VUaXRsZVJlc29sdmVyLFxuICAgIFBhZ2VEZXNjcmlwdGlvblJlc29sdmVyLFxuICAgIFBhZ2VSb2JvdHNSZXNvbHZlclxue1xuICBwYWdlVGVtcGxhdGUgPSAnQ29tcGFueVBhZ2VUZW1wbGF0ZSc7XG4gIHBhZ2VUeXBlID0gUGFnZVR5cGUuQ09OVEVOVF9QQUdFO1xuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGlvbiBrZXkgZm9yIHRoZSBicmVhZGNydW1iIG9mIE9yZ2FuaXphdGlvbiBob21lIHBhZ2VcbiAgICovXG4gIHByb3RlY3RlZCByZWFkb25seSBPUkdBTklaQVRJT05fVFJBTlNMQVRJT05fS0VZID0gJ29yZ2FuaXphdGlvbi5icmVhZGNydW1iJztcblxuICAvKipcbiAgICogVGhlIHNlbWFudGljIHJvdXRlIG9mIHRoZSBvcmdhbml6YXRpb24gbGFuZGluZyBwYWdlLiBJdCdzIHVzZWQgdG8gcmVjb2duaXplIHdoZXRoZXJcbiAgICogd2UgYXJlIG9uIHRoaXMgcGFnZS4gSW4gc3VjaCBhIGNhc2Ugd2UgYXZvaWQgc2hvd2luZyB0aGUgYnJlYWRjcnVtYiBmb3IgdGhpcyBwYWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IE9SR0FOSVpBVElPTl9TRU1BTlRJQ19ST1VURSA9ICdvcmdhbml6YXRpb24nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb250ZW50UGFnZU1ldGFSZXNvbHZlcjogQ29udGVudFBhZ2VNZXRhUmVzb2x2ZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aDogU2VtYW50aWNQYXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICByZXNvbHZlVGl0bGUoKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50UGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlVGl0bGUoKTtcbiAgfVxuXG4gIHJlc29sdmVEZXNjcmlwdGlvbigpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRQYWdlTWV0YVJlc29sdmVyLnJlc29sdmVEZXNjcmlwdGlvbigpO1xuICB9XG5cbiAgcmVzb2x2ZVJvYm90cygpOiBPYnNlcnZhYmxlPFBhZ2VSb2JvdHNNZXRhW10+IHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50UGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlUm9ib3RzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsaXN0IG9mIGJyZWFkY3J1bWJzIGZvcjpcbiAgICogLSB0aGUgaG9tZSBwYWdlXG4gICAqIC0gdGhlIG9yZ2FuaXphdGlvbiBob21lIHBhZ2VcbiAgICogLSB0aGUgb3JnYW5pemF0aW9uJ3MgY2hpbGQgcGFnZXMgKGkuZS4gY29zdCBjZW50ZXIgbGlzdClcbiAgICogLSBzdWItcm91dGVzIG9mIHRoZSBvcmdhbml6YXRpb24ncyBjaGlsZCBwYWdlcyAoaS5lLiBjb3N0IGNlbnRlciBkZXRhaWxzLCBlZGl0IGNvc3QgY2VudGVyLCAuLi4pXG4gICAqL1xuICByZXNvbHZlQnJlYWRjcnVtYnMoKTogT2JzZXJ2YWJsZTxCcmVhZGNydW1iTWV0YVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnJlYWRjcnVtYnMkO1xuICB9XG5cbiAgLyoqXG4gICAqIEJyZWFkY3J1bWIgb2YgdGhlIE9yZ2FuaXphdGlvbiBwYWdlLlxuICAgKiBJdCdzIGVtcHR5IHdoZW4gdGhlIGN1cnJlbnQgcGFnZSBpcyB0aGUgT3JnYW5pemF0aW9uIHBhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgb3JnYW5pemF0aW9uUGFnZUJyZWFkY3J1bWIkOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+ID0gZGVmZXIoXG4gICAgKCkgPT4gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRSb3V0ZXJTdGF0ZSgpXG4gICkucGlwZShcbiAgICBtYXAoKHJvdXRlclN0YXRlKSA9PiByb3V0ZXJTdGF0ZT8uc3RhdGU/LnNlbWFudGljUm91dGUpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgc3dpdGNoTWFwKChzZW1hbnRpY1JvdXRlKSA9PlxuICAgICAgc2VtYW50aWNSb3V0ZSA9PT0gdGhpcy5PUkdBTklaQVRJT05fU0VNQU5USUNfUk9VVEVcbiAgICAgICAgPyBvZihbXSlcbiAgICAgICAgOiB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSh0aGlzLk9SR0FOSVpBVElPTl9UUkFOU0xBVElPTl9LRVkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGxhYmVsKSA9PiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBsaW5rOiB0aGlzLnNlbWFudGljUGF0aC5nZXQodGhpcy5PUkdBTklaQVRJT05fU0VNQU5USUNfUk9VVEUpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgKVxuICApO1xuXG4gIC8qKlxuICAgKiBCcmVhZGNydW1icyByZXR1cm5lZCBpbiB0aGUgbWV0aG9kICNyZXNvbHZlQnJlYWRjcnVtYnMuXG4gICAqL1xuICBwcm90ZWN0ZWQgYnJlYWRjcnVtYnMkOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+ID0gY29tYmluZUxhdGVzdChbXG4gICAgdGhpcy5vcmdhbml6YXRpb25QYWdlQnJlYWRjcnVtYiQsXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5jb250ZW50UGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlQnJlYWRjcnVtYnMoKSksXG4gIF0pLnBpcGUoXG4gICAgbWFwKChbb3JnYW5pemF0aW9uUGFnZUJyZWFkY3J1bWIsIGJyZWFkY3J1bWJzID0gW11dKSA9PiB7XG4gICAgICBjb25zdCBbaG9tZSwgLi4ucmVzdEJyZWFkY3J1bWJzXSA9IGJyZWFkY3J1bWJzO1xuICAgICAgcmV0dXJuIFtob21lLCAuLi5vcmdhbml6YXRpb25QYWdlQnJlYWRjcnVtYiwgLi4ucmVzdEJyZWFkY3J1bWJzXTtcbiAgICB9KSxcbiAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICk7XG59XG4iXX0=