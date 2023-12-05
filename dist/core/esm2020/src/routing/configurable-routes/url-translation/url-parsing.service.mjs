/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';
import { isParam } from './path-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class UrlParsingService {
    constructor(router) {
        this.router = router;
    }
    getPrimarySegments(url) {
        const urlTree = this.router.parseUrl(url);
        return this._getPrimarySegmentsFromUrlTree(urlTree.root);
    }
    _getPrimarySegmentsFromUrlTree(tree) {
        const segments = tree.segments.map((s) => s.path);
        const childrenSegments = tree.children[PRIMARY_OUTLET]
            ? this._getPrimarySegmentsFromUrlTree(tree.children[PRIMARY_OUTLET])
            : [];
        return segments.concat(childrenSegments);
    }
    /**
     * Tells whether the given url matches the given path.
     *
     * @param urlSegments   string or array of url segments. When it's a string, the preceding
     *                      site-context params are ignored (i.e. '/electronics-spa/en/USD/...')
     *
     * @param pathSegments  string or array of path segments. Dynamic params are allowed in the
     *                      path shape, i.e. `/url/:param1/with/:param2`.
     */
    matchPath(urlSegments, pathSegments) {
        urlSegments = Array.isArray(urlSegments)
            ? urlSegments
            : this.getPrimarySegments(urlSegments);
        pathSegments = Array.isArray(pathSegments)
            ? pathSegments
            : this.getPrimarySegments(pathSegments);
        if (urlSegments.length !== pathSegments.length) {
            return false;
        }
        for (let i = 0; i < pathSegments.length; i++) {
            const pathSeg = pathSegments[i];
            const urlSeg = urlSegments[i];
            // compare only static segments:
            if (!isParam(pathSeg) && pathSeg !== urlSeg) {
                return false;
            }
        }
        return true;
    }
}
UrlParsingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlParsingService, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
UrlParsingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlParsingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UrlParsingService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLXBhcnNpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvY29uZmlndXJhYmxlLXJvdXRlcy91cmwtdHJhbnNsYXRpb24vdXJsLXBhcnNpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUEyQixNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUd2QyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV0QyxrQkFBa0IsQ0FBQyxHQUFXO1FBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sOEJBQThCLENBQUMsSUFBcUI7UUFDMUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsU0FBUyxDQUNQLFdBQThCLEVBQzlCLFlBQStCO1FBRS9CLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUN0QyxDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekMsWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxZQUFZO1lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUM5QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUMzQyxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OzhHQW5EVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQURKLE1BQU07MkZBQ25CLGlCQUFpQjtrQkFEN0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQUklNQVJZX09VVExFVCwgUm91dGVyLCBVcmxTZWdtZW50R3JvdXAgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgaXNQYXJhbSB9IGZyb20gJy4vcGF0aC11dGlscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVXJsUGFyc2luZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gIGdldFByaW1hcnlTZWdtZW50cyh1cmw6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCB1cmxUcmVlID0gdGhpcy5yb3V0ZXIucGFyc2VVcmwodXJsKTtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UHJpbWFyeVNlZ21lbnRzRnJvbVVybFRyZWUodXJsVHJlZS5yb290KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByaW1hcnlTZWdtZW50c0Zyb21VcmxUcmVlKHRyZWU6IFVybFNlZ21lbnRHcm91cCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IHRyZWUuc2VnbWVudHMubWFwKChzKSA9PiBzLnBhdGgpO1xuICAgIGNvbnN0IGNoaWxkcmVuU2VnbWVudHMgPSB0cmVlLmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXVxuICAgICAgPyB0aGlzLl9nZXRQcmltYXJ5U2VnbWVudHNGcm9tVXJsVHJlZSh0cmVlLmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSlcbiAgICAgIDogW107XG4gICAgcmV0dXJuIHNlZ21lbnRzLmNvbmNhdChjaGlsZHJlblNlZ21lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB3aGV0aGVyIHRoZSBnaXZlbiB1cmwgbWF0Y2hlcyB0aGUgZ2l2ZW4gcGF0aC5cbiAgICpcbiAgICogQHBhcmFtIHVybFNlZ21lbnRzICAgc3RyaW5nIG9yIGFycmF5IG9mIHVybCBzZWdtZW50cy4gV2hlbiBpdCdzIGEgc3RyaW5nLCB0aGUgcHJlY2VkaW5nXG4gICAqICAgICAgICAgICAgICAgICAgICAgIHNpdGUtY29udGV4dCBwYXJhbXMgYXJlIGlnbm9yZWQgKGkuZS4gJy9lbGVjdHJvbmljcy1zcGEvZW4vVVNELy4uLicpXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoU2VnbWVudHMgIHN0cmluZyBvciBhcnJheSBvZiBwYXRoIHNlZ21lbnRzLiBEeW5hbWljIHBhcmFtcyBhcmUgYWxsb3dlZCBpbiB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgcGF0aCBzaGFwZSwgaS5lLiBgL3VybC86cGFyYW0xL3dpdGgvOnBhcmFtMmAuXG4gICAqL1xuICBtYXRjaFBhdGgoXG4gICAgdXJsU2VnbWVudHM6IHN0cmluZyB8IHN0cmluZ1tdLFxuICAgIHBhdGhTZWdtZW50czogc3RyaW5nIHwgc3RyaW5nW11cbiAgKTogYm9vbGVhbiB7XG4gICAgdXJsU2VnbWVudHMgPSBBcnJheS5pc0FycmF5KHVybFNlZ21lbnRzKVxuICAgICAgPyB1cmxTZWdtZW50c1xuICAgICAgOiB0aGlzLmdldFByaW1hcnlTZWdtZW50cyh1cmxTZWdtZW50cyk7XG5cbiAgICBwYXRoU2VnbWVudHMgPSBBcnJheS5pc0FycmF5KHBhdGhTZWdtZW50cylcbiAgICAgID8gcGF0aFNlZ21lbnRzXG4gICAgICA6IHRoaXMuZ2V0UHJpbWFyeVNlZ21lbnRzKHBhdGhTZWdtZW50cyk7XG5cbiAgICBpZiAodXJsU2VnbWVudHMubGVuZ3RoICE9PSBwYXRoU2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoU2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBhdGhTZWcgPSBwYXRoU2VnbWVudHNbaV07XG4gICAgICBjb25zdCB1cmxTZWcgPSB1cmxTZWdtZW50c1tpXTtcblxuICAgICAgLy8gY29tcGFyZSBvbmx5IHN0YXRpYyBzZWdtZW50czpcbiAgICAgIGlmICghaXNQYXJhbShwYXRoU2VnKSAmJiBwYXRoU2VnICE9PSB1cmxTZWcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19