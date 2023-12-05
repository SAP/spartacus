import { inject, Injectable } from '@angular/core';
import { LoggerService, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
/**
 * Adapter for finding stock levels of a product in stores from the OCC APIs.
 */
export class OccStockAdapter {
    constructor(http, occEndpointsService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.logger = inject(LoggerService);
        // Intentional empty constructor
    }
    loadStockLevels(productCode, location) {
        return this.http
            .get(this.occEndpointsService.buildUrl('stock', {
            urlParams: { productCode },
            queryParams: { ...location, fields: 'FULL' },
        }))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    loadStockLevelAtStore(productCode, storeName) {
        return this.http
            .get(this.occEndpointsService.buildUrl('stockAtStore', {
            urlParams: { productCode, storeName },
        }))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
}
OccStockAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStockAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccStockAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStockAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStockAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXN0b2NrLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL29jYy9hZGFwdGVycy9vY2Mtc3RvY2suYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGtCQUFrQixHQUluQixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTVDOztHQUVHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFDWSxJQUFnQixFQUNoQixtQkFBd0M7UUFEeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSjFDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFNdkMsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxlQUFlLENBQ2IsV0FBbUIsRUFDbkIsUUFBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUN6QyxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUU7WUFDMUIsV0FBVyxFQUFFLEVBQUUsR0FBRyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUM3QyxDQUFDLENBQ0g7YUFDQSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDeEIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkQsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELHFCQUFxQixDQUNuQixXQUFtQixFQUNuQixTQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ2hELFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUU7U0FDdEMsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQ3hCLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ25ELENBQ0YsQ0FBQztJQUNOLENBQUM7OzRHQTNDVSxlQUFlO2dIQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIExvZ2dlclNlcnZpY2UsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgU3RvY2ssXG4gIFN0b3JlRmluZGVyU3RvY2tTZWFyY2hQYWdlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3RvY2tBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9waWNrdXAtaW4tc3RvcmUvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvblNlYXJjaFBhcmFtcyB9IGZyb20gJ0BzcGFydGFjdXMvcGlja3VwLWluLXN0b3JlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBBZGFwdGVyIGZvciBmaW5kaW5nIHN0b2NrIGxldmVscyBvZiBhIHByb2R1Y3QgaW4gc3RvcmVzIGZyb20gdGhlIE9DQyBBUElzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2NjU3RvY2tBZGFwdGVyIGltcGxlbWVudHMgU3RvY2tBZGFwdGVyIHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzU2VydmljZTogT2NjRW5kcG9pbnRzU2VydmljZVxuICApIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgbG9hZFN0b2NrTGV2ZWxzKFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgbG9jYXRpb246IExvY2F0aW9uU2VhcmNoUGFyYW1zXG4gICk6IE9ic2VydmFibGU8U3RvcmVGaW5kZXJTdG9ja1NlYXJjaFBhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PFN0b3JlRmluZGVyU3RvY2tTZWFyY2hQYWdlPihcbiAgICAgICAgdGhpcy5vY2NFbmRwb2ludHNTZXJ2aWNlLmJ1aWxkVXJsKCdzdG9jaycsIHtcbiAgICAgICAgICB1cmxQYXJhbXM6IHsgcHJvZHVjdENvZGUgfSxcbiAgICAgICAgICBxdWVyeVBhcmFtczogeyAuLi5sb2NhdGlvbiwgZmllbGRzOiAnRlVMTCcgfSxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogYW55KSA9PlxuICAgICAgICAgIHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yLCB0aGlzLmxvZ2dlcikpXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBsb2FkU3RvY2tMZXZlbEF0U3RvcmUoXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZyxcbiAgICBzdG9yZU5hbWU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFN0b2NrPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxTdG9jaz4oXG4gICAgICAgIHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybCgnc3RvY2tBdFN0b3JlJywge1xuICAgICAgICAgIHVybFBhcmFtczogeyBwcm9kdWN0Q29kZSwgc3RvcmVOYW1lIH0sXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IGFueSkgPT5cbiAgICAgICAgICB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG59XG4iXX0=