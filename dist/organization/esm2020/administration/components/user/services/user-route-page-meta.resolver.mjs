/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultRoutePageMetaResolver, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./current-user.service";
export class UserRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UserRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRoutePageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.CurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.CurrentUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9zZXJ2aWNlcy91c2VyLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsNEJBQTRCLEdBRTdCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekIsTUFBTSxPQUFPLHlCQUEwQixTQUFRLDRCQUE0QjtJQUN6RSxZQUNFLFdBQStCLEVBQ3JCLGtCQUFzQztRQUVoRCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFGVCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBR2xELENBQUM7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDOztzSEFWVSx5QkFBeUI7MEhBQXpCLHlCQUF5QixjQURaLE1BQU07MkZBQ25CLHlCQUF5QjtrQkFEckMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVc2VyLFxuICBEZWZhdWx0Um91dGVQYWdlTWV0YVJlc29sdmVyLFxuICBUcmFuc2xhdGlvblNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBVc2VyUm91dGVQYWdlTWV0YVJlc29sdmVyIGV4dGVuZHMgRGVmYXVsdFJvdXRlUGFnZU1ldGFSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRJdGVtU2VydmljZTogQ3VycmVudFVzZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXJhbXMoKTogT2JzZXJ2YWJsZTxCMkJVc2VyIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLml0ZW0kO1xuICB9XG59XG4iXX0=