/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ImportProductsFromCsvService {
    constructor() {
        // Intentional empty constructor
    }
    csvDataToProduct(csvData) {
        return csvData.map((row) => ({
            productCode: row[0],
            quantity: Number(row[1]),
        }));
    }
    isDataParsableToProducts(data) {
        const patternRegex = new RegExp(/(?:\s|^)\d+(?=\s|$)/);
        return data.length > 0 && data.every((row) => patternRegex.test(row[1]));
    }
}
ImportProductsFromCsvService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportProductsFromCsvService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ImportProductsFromCsvService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportProductsFromCsvService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportProductsFromCsvService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXByb2R1Y3RzLWZyb20tY3N2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9pbXBvcnQtZXhwb3J0L2NvbXBvbmVudHMvaW1wb3J0LXRvLWNhcnQvaW1wb3J0LXByb2R1Y3RzLWZyb20tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyw0QkFBNEI7SUFDdkM7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQW1CO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxJQUFnQjtRQUN2QyxNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O3lIQWZVLDRCQUE0Qjs2SEFBNUIsNEJBQTRCLGNBRjNCLE1BQU07MkZBRVAsNEJBQTRCO2tCQUh4QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y3REYXRhIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbXBvcnRQcm9kdWN0c0Zyb21Dc3ZTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIGNzdkRhdGFUb1Byb2R1Y3QoY3N2RGF0YTogc3RyaW5nW11bXSk6IFByb2R1Y3REYXRhW10ge1xuICAgIHJldHVybiBjc3ZEYXRhLm1hcCgocm93OiBzdHJpbmdbXSkgPT4gKHtcbiAgICAgIHByb2R1Y3RDb2RlOiByb3dbMF0sXG4gICAgICBxdWFudGl0eTogTnVtYmVyKHJvd1sxXSksXG4gICAgfSkpO1xuICB9XG5cbiAgaXNEYXRhUGFyc2FibGVUb1Byb2R1Y3RzKGRhdGE6IHN0cmluZ1tdW10pOiBib29sZWFuIHtcbiAgICBjb25zdCBwYXR0ZXJuUmVnZXggPSBuZXcgUmVnRXhwKC8oPzpcXHN8XilcXGQrKD89XFxzfCQpLyk7XG4gICAgcmV0dXJuIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhLmV2ZXJ5KChyb3cpID0+IHBhdHRlcm5SZWdleC50ZXN0KHJvd1sxXSkpO1xuICB9XG59XG4iXX0=