/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrganizationPageMetaResolver } from '@spartacus/organization/administration/core';
import { combineLatest, defer } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export const ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY = 'orgAccountSummaryList.breadcrumbs.list';
export class AccountSummaryPageMetaResolver extends OrganizationPageMetaResolver {
    constructor(contentPageMetaResolver, translation, semanticPath, routingService) {
        super(contentPageMetaResolver, translation, semanticPath, routingService);
        this.contentPageMetaResolver = contentPageMetaResolver;
        this.translation = translation;
        this.semanticPath = semanticPath;
        this.routingService = routingService;
        this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE = 'orgAccountSummary';
        this.ACCOUNT_SUMMARY_LIST_LABEL = 'Account Summaries';
        this.ACCOUNT_SUMMARY_LIST_PATH = '/organization/account-summary';
        /**
         * Breadcrumbs of the Account Summary page.
         */
        this.orgAccountSummaryBreadcrumb$ = defer(() => this.routingService.getRouterState()).pipe(map((routerState) => routerState?.state?.semanticRoute), distinctUntilChanged(), switchMap((semanticRoute) => {
            return semanticRoute === this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE
                ? this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(map((label) => [
                    {
                        label,
                        link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
                    },
                ]))
                : combineLatest([
                    this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY),
                    this.translation.translate(ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY),
                ]).pipe(map(([orgLabel, _label]) => [
                    {
                        label: orgLabel,
                        link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
                    },
                    {
                        label: this.ACCOUNT_SUMMARY_LIST_LABEL,
                        link: this.semanticPath.get(this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE),
                    },
                ]));
        }));
        /**
         * Breadcrumbs returned in the method #resolveBreadcrumbs.
         */
        this.breadcrumbs$ = combineLatest([
            this.orgAccountSummaryBreadcrumb$,
            defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
        ]).pipe(map(([orgAccountSummaryBreadcrumb, breadcrumbs = []]) => {
            const [home, ...restBreadcrumbs] = breadcrumbs;
            return [home, ...orgAccountSummaryBreadcrumb, ...restBreadcrumbs];
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getScore(page) {
        return (super.getScore(page) +
            (page.label?.startsWith(this.ACCOUNT_SUMMARY_LIST_PATH) ? 1 : -1));
    }
}
AccountSummaryPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryPageMetaResolver, deps: [{ token: i1.ContentPageMetaResolver }, { token: i1.TranslationService }, { token: i1.SemanticPathService }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ContentPageMetaResolver }, { type: i1.TranslationService }, { type: i1.SemanticPathService }, { type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LXBhZ2UtbWV0YS5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L2NvcmUvYWNjb3VudC1zdW1tYXJ5LXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMzQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRixPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCxXQUFXLEVBQ1gsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7OztBQUV4QixNQUFNLENBQUMsTUFBTSxvQ0FBb0MsR0FDL0Msd0NBQXdDLENBQUM7QUFLM0MsTUFBTSxPQUFPLDhCQUErQixTQUFRLDRCQUE0QjtJQUM5RSxZQUNZLHVCQUFnRCxFQUNoRCxXQUErQixFQUMvQixZQUFpQyxFQUNqQyxjQUE4QjtRQUV4QyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUxoRSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBS3ZCLG1DQUE4QixHQUFHLG1CQUFtQixDQUFDO1FBQ3JELCtCQUEwQixHQUFHLG1CQUFtQixDQUFDO1FBQ2pELDhCQUF5QixHQUMxQywrQkFBK0IsQ0FBQztRQUVsQzs7V0FFRztRQUNPLGlDQUE0QixHQUFpQyxLQUFLLENBQzFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQzNDLENBQUMsSUFBSSxDQUNKLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsRUFDdkQsb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDMUIsT0FBTyxhQUFhLEtBQUssSUFBSSxDQUFDLDhCQUE4QjtnQkFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FDaEUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFDYjt3QkFDRSxLQUFLO3dCQUNMLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUM7cUJBQzlEO2lCQUNGLENBQUMsQ0FDSDtnQkFDSCxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsb0NBQW9DLENBQUM7aUJBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUMxQjt3QkFDRSxLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDO3FCQUM5RDtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjt3QkFDdEMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUN6QixJQUFJLENBQUMsOEJBQThCLENBQ3BDO3FCQUNGO2lCQUNGLENBQUMsQ0FDSCxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGOztXQUVHO1FBQ08saUJBQVksR0FBaUMsYUFBYSxDQUFDO1lBQ25FLElBQUksQ0FBQyw0QkFBNEI7WUFDakMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQy9ELENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsRUFBRSxXQUFXLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0RCxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsZUFBZSxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRywyQkFBMkIsRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxFQUNGLFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQy9DLENBQUM7SUF6REYsQ0FBQztJQTJERCxRQUFRLENBQUMsSUFBVTtRQUNqQixPQUFPLENBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsRSxDQUFDO0lBQ0osQ0FBQzs7MkhBeEVVLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRjdCLE1BQU07MkZBRVAsOEJBQThCO2tCQUgxQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJyZWFkY3J1bWJNZXRhLFxuICBDb250ZW50UGFnZU1ldGFSZXNvbHZlcixcbiAgUGFnZSxcbiAgUm91dGluZ1NlcnZpY2UsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG4gIFRyYW5zbGF0aW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIGRlZmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBBQ0NPVU5UX1NVTU1BUllfTElTVF9UUkFOU0xBVElPTl9LRVkgPVxuICAnb3JnQWNjb3VudFN1bW1hcnlMaXN0LmJyZWFkY3J1bWJzLmxpc3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlQYWdlTWV0YVJlc29sdmVyIGV4dGVuZHMgT3JnYW5pemF0aW9uUGFnZU1ldGFSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb250ZW50UGFnZU1ldGFSZXNvbHZlcjogQ29udGVudFBhZ2VNZXRhUmVzb2x2ZXIsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aDogU2VtYW50aWNQYXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGNvbnRlbnRQYWdlTWV0YVJlc29sdmVyLCB0cmFuc2xhdGlvbiwgc2VtYW50aWNQYXRoLCByb3V0aW5nU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgQUNDT1VOVF9TVU1NQVJZX1NFTUFOVElDX1JPVVRFID0gJ29yZ0FjY291bnRTdW1tYXJ5JztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IEFDQ09VTlRfU1VNTUFSWV9MSVNUX0xBQkVMID0gJ0FjY291bnQgU3VtbWFyaWVzJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IEFDQ09VTlRfU1VNTUFSWV9MSVNUX1BBVEggPVxuICAgICcvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeSc7XG5cbiAgLyoqXG4gICAqIEJyZWFkY3J1bWJzIG9mIHRoZSBBY2NvdW50IFN1bW1hcnkgcGFnZS5cbiAgICovXG4gIHByb3RlY3RlZCBvcmdBY2NvdW50U3VtbWFyeUJyZWFkY3J1bWIkOiBPYnNlcnZhYmxlPEJyZWFkY3J1bWJNZXRhW10+ID0gZGVmZXIoXG4gICAgKCkgPT4gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRSb3V0ZXJTdGF0ZSgpXG4gICkucGlwZShcbiAgICBtYXAoKHJvdXRlclN0YXRlKSA9PiByb3V0ZXJTdGF0ZT8uc3RhdGU/LnNlbWFudGljUm91dGUpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgc3dpdGNoTWFwKChzZW1hbnRpY1JvdXRlKSA9PiB7XG4gICAgICByZXR1cm4gc2VtYW50aWNSb3V0ZSA9PT0gdGhpcy5BQ0NPVU5UX1NVTU1BUllfU0VNQU5USUNfUk9VVEVcbiAgICAgICAgPyB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSh0aGlzLk9SR0FOSVpBVElPTl9UUkFOU0xBVElPTl9LRVkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGxhYmVsKSA9PiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBsaW5rOiB0aGlzLnNlbWFudGljUGF0aC5nZXQodGhpcy5PUkdBTklaQVRJT05fU0VNQU5USUNfUk9VVEUpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIDogY29tYmluZUxhdGVzdChbXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSh0aGlzLk9SR0FOSVpBVElPTl9UUkFOU0xBVElPTl9LRVkpLFxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGlvbi50cmFuc2xhdGUoQUNDT1VOVF9TVU1NQVJZX0xJU1RfVFJBTlNMQVRJT05fS0VZKSxcbiAgICAgICAgICBdKS5waXBlKFxuICAgICAgICAgICAgbWFwKChbb3JnTGFiZWwsIF9sYWJlbF0pID0+IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBvcmdMYWJlbCxcbiAgICAgICAgICAgICAgICBsaW5rOiB0aGlzLnNlbWFudGljUGF0aC5nZXQodGhpcy5PUkdBTklaQVRJT05fU0VNQU5USUNfUk9VVEUpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuQUNDT1VOVF9TVU1NQVJZX0xJU1RfTEFCRUwsXG4gICAgICAgICAgICAgICAgbGluazogdGhpcy5zZW1hbnRpY1BhdGguZ2V0KFxuICAgICAgICAgICAgICAgICAgdGhpcy5BQ0NPVU5UX1NVTU1BUllfU0VNQU5USUNfUk9VVEVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApO1xuICAgIH0pXG4gICk7XG5cbiAgLyoqXG4gICAqIEJyZWFkY3J1bWJzIHJldHVybmVkIGluIHRoZSBtZXRob2QgI3Jlc29sdmVCcmVhZGNydW1icy5cbiAgICovXG4gIHByb3RlY3RlZCBicmVhZGNydW1icyQ6IE9ic2VydmFibGU8QnJlYWRjcnVtYk1ldGFbXT4gPSBjb21iaW5lTGF0ZXN0KFtcbiAgICB0aGlzLm9yZ0FjY291bnRTdW1tYXJ5QnJlYWRjcnVtYiQsXG4gICAgZGVmZXIoKCkgPT4gdGhpcy5jb250ZW50UGFnZU1ldGFSZXNvbHZlci5yZXNvbHZlQnJlYWRjcnVtYnMoKSksXG4gIF0pLnBpcGUoXG4gICAgbWFwKChbb3JnQWNjb3VudFN1bW1hcnlCcmVhZGNydW1iLCBicmVhZGNydW1icyA9IFtdXSkgPT4ge1xuICAgICAgY29uc3QgW2hvbWUsIC4uLnJlc3RCcmVhZGNydW1ic10gPSBicmVhZGNydW1icztcbiAgICAgIHJldHVybiBbaG9tZSwgLi4ub3JnQWNjb3VudFN1bW1hcnlCcmVhZGNydW1iLCAuLi5yZXN0QnJlYWRjcnVtYnNdO1xuICAgIH0pLFxuICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgKTtcblxuICBnZXRTY29yZShwYWdlOiBQYWdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgc3VwZXIuZ2V0U2NvcmUocGFnZSkgK1xuICAgICAgKHBhZ2UubGFiZWw/LnN0YXJ0c1dpdGgodGhpcy5BQ0NPVU5UX1NVTU1BUllfTElTVF9QQVRIKSA/IDEgOiAtMSlcbiAgICApO1xuICB9XG59XG4iXX0=