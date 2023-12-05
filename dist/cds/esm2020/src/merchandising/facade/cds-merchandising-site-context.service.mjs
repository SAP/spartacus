/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CdsMerchandisingSiteContextService {
    constructor(baseSiteService, languageService) {
        this.baseSiteService = baseSiteService;
        this.languageService = languageService;
    }
    getSiteContext() {
        return combineLatest([
            this.baseSiteService.getActive(),
            this.languageService.getActive(),
        ]).pipe(map(([site, language]) => {
            const siteContext = {
                site,
                language,
            };
            return siteContext;
        }));
    }
}
CdsMerchandisingSiteContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingSiteContextService, deps: [{ token: i1.BaseSiteService }, { token: i1.LanguageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingSiteContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingSiteContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingSiteContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.BaseSiteService }, { type: i1.LanguageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLW1lcmNoYW5kaXNpbmctc2l0ZS1jb250ZXh0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvbWVyY2hhbmRpc2luZy9mYWNhZGUvY2RzLW1lcmNoYW5kaXNpbmctc2l0ZS1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU1yQyxNQUFNLE9BQU8sa0NBQWtDO0lBQzdDLFlBQ1ksZUFBZ0MsRUFDaEMsZUFBZ0M7UUFEaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN6QyxDQUFDO0lBRUosY0FBYztRQUNaLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFtQixFQUFFLEVBQUU7WUFDekMsTUFBTSxXQUFXLEdBQTZCO2dCQUM1QyxJQUFJO2dCQUNKLFFBQVE7YUFDVCxDQUFDO1lBQ0YsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OytIQW5CVSxrQ0FBa0M7bUlBQWxDLGtDQUFrQyxjQUZqQyxNQUFNOzJGQUVQLGtDQUFrQztrQkFIOUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2l0ZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNZXJjaGFuZGlzaW5nU2l0ZUNvbnRleHQgfSBmcm9tICcuLi9tb2RlbC9tZXJjaGFuZGlzaW5nLXNpdGUtY29udGV4dC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDZHNNZXJjaGFuZGlzaW5nU2l0ZUNvbnRleHRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxuICApIHt9XG5cbiAgZ2V0U2l0ZUNvbnRleHQoKTogT2JzZXJ2YWJsZTxNZXJjaGFuZGlzaW5nU2l0ZUNvbnRleHQ+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmJhc2VTaXRlU2VydmljZS5nZXRBY3RpdmUoKSxcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtzaXRlLCBsYW5ndWFnZV06IFtzdHJpbmcsIHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3Qgc2l0ZUNvbnRleHQ6IE1lcmNoYW5kaXNpbmdTaXRlQ29udGV4dCA9IHtcbiAgICAgICAgICBzaXRlLFxuICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc2l0ZUNvbnRleHQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==