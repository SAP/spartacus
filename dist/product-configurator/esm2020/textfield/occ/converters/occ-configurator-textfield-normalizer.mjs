/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccConfiguratorTextfieldNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    /**
     * Converts addToCart parameters into the generic format
     * @param source Add to cart parameters in OCC format
     * @param target Optional result, can be provided in case converters should be chained
     * @returns Add to cart parameters in generic format
     */
    convert(source, target) {
        const resultTarget = {
            ...target,
            ...source,
        };
        return resultTarget;
    }
}
OccConfiguratorTextfieldNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvb2NjL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLGtDQUFrQztJQU83QztRQUNFLGdDQUFnQztJQUNsQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxPQUFPLENBQ0wsTUFBOEMsRUFDOUMsTUFBNEM7UUFFNUMsTUFBTSxZQUFZLEdBQXdDO1lBQ3hELEdBQUcsTUFBTTtZQUNULEdBQUksTUFBYztTQUNuQixDQUFDO1FBRUYsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7K0hBMUJVLGtDQUFrQzttSUFBbEMsa0NBQWtDLGNBRHJCLE1BQU07MkZBQ25CLGtDQUFrQztrQkFEOUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVGV4dGZpZWxkIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3ItdGV4dGZpZWxkLm1vZGVsJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZCB9IGZyb20gJy4uL29jYy1jb25maWd1cmF0b3ItdGV4dGZpZWxkLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkTm9ybWFsaXplclxuICBpbXBsZW1lbnRzXG4gICAgQ29udmVydGVyPFxuICAgICAgT2NjQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb24sXG4gICAgICBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvblxuICAgID5cbntcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuICAvKipcbiAgICogQ29udmVydHMgYWRkVG9DYXJ0IHBhcmFtZXRlcnMgaW50byB0aGUgZ2VuZXJpYyBmb3JtYXRcbiAgICogQHBhcmFtIHNvdXJjZSBBZGQgdG8gY2FydCBwYXJhbWV0ZXJzIGluIE9DQyBmb3JtYXRcbiAgICogQHBhcmFtIHRhcmdldCBPcHRpb25hbCByZXN1bHQsIGNhbiBiZSBwcm92aWRlZCBpbiBjYXNlIGNvbnZlcnRlcnMgc2hvdWxkIGJlIGNoYWluZWRcbiAgICogQHJldHVybnMgQWRkIHRvIGNhcnQgcGFyYW1ldGVycyBpbiBnZW5lcmljIGZvcm1hdFxuICAgKi9cbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jY0NvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uLFxuICAgIHRhcmdldD86IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICk6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uIHtcbiAgICBjb25zdCByZXN1bHRUYXJnZXQ6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgLi4uKHNvdXJjZSBhcyBhbnkpLFxuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0VGFyZ2V0O1xuICB9XG59XG4iXX0=