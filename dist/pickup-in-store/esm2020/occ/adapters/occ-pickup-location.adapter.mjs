import { inject, Injectable } from '@angular/core';
import { LoggerService, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccPickupLocationAdapter {
    constructor(http, occEndpointsService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.logger = inject(LoggerService);
        // Intentional empty constructor
    }
    getStoreDetails(storeName) {
        return this.http
            .get(this.occEndpointsService.buildUrl('storeDetails', {
            urlParams: { storeName },
            queryParams: { fields: 'FULL' },
        }))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
}
OccPickupLocationAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPickupLocationAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPickupLocationAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPickupLocationAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPickupLocationAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBpY2t1cC1sb2NhdGlvbi5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9vY2MvYWRhcHRlcnMvb2NjLXBpY2t1cC1sb2NhdGlvbi5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFDTCxhQUFhLEVBQ2Isa0JBQWtCLEdBR25CLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHNUMsTUFBTSxPQUFPLHdCQUF3QjtJQUduQyxZQUNZLElBQWdCLEVBQ2hCLG1CQUF3QztRQUR4QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKMUMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQU12QyxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ2hELFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRTtZQUN4QixXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO1NBQ2hDLENBQUMsQ0FDSDthQUNBLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUN4QixVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRCxDQUNGLENBQUM7SUFDTixDQUFDOztxSEF2QlUsd0JBQXdCO3lIQUF4Qix3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIExvZ2dlclNlcnZpY2UsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgUG9pbnRPZlNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQaWNrdXBMb2NhdGlvbkFkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL3BpY2t1cC1pbi1zdG9yZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NQaWNrdXBMb2NhdGlvbkFkYXB0ZXIgaW1wbGVtZW50cyBQaWNrdXBMb2NhdGlvbkFkYXB0ZXIge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHNTZXJ2aWNlOiBPY2NFbmRwb2ludHNTZXJ2aWNlXG4gICkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBnZXRTdG9yZURldGFpbHMoc3RvcmVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBvaW50T2ZTZXJ2aWNlPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxQb2ludE9mU2VydmljZT4oXG4gICAgICAgIHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybCgnc3RvcmVEZXRhaWxzJywge1xuICAgICAgICAgIHVybFBhcmFtczogeyBzdG9yZU5hbWUgfSxcbiAgICAgICAgICBxdWVyeVBhcmFtczogeyBmaWVsZHM6ICdGVUxMJyB9LFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+XG4gICAgICAgICAgdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IsIHRoaXMubG9nZ2VyKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxufVxuIl19