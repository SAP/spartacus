import { Injectable } from '@angular/core';
import { POINT_OF_SERVICE_NORMALIZER, } from '@spartacus/core';
import { STORE_COUNT_NORMALIZER, STORE_FINDER_SEARCH_PAGE_NORMALIZER, } from '@spartacus/storefinder/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccStoreFinderAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    search(query, searchConfig, longitudeLatitude, radius) {
        return this.callOccFindStores(query, searchConfig, longitudeLatitude, radius).pipe(this.converterService.pipeable(STORE_FINDER_SEARCH_PAGE_NORMALIZER));
    }
    loadCounts() {
        return this.http
            .get(this.occEndpointsService.buildUrl('storescounts'))
            .pipe(map(({ countriesAndRegionsStoreCount }) => countriesAndRegionsStoreCount), this.converterService.pipeableMany(STORE_COUNT_NORMALIZER));
    }
    load(storeId) {
        return this.http
            .get(this.occEndpointsService.buildUrl('store', { urlParams: { storeId } }))
            .pipe(this.converterService.pipeable(POINT_OF_SERVICE_NORMALIZER));
    }
    callOccFindStores(query, searchConfig, longitudeLatitude, radius) {
        const params = {};
        if (longitudeLatitude) {
            params['longitude'] = String(longitudeLatitude.longitude);
            params['latitude'] = String(longitudeLatitude.latitude);
        }
        else {
            params['query'] = query;
        }
        if (radius) {
            params['radius'] = String(radius);
        }
        if (searchConfig?.pageSize) {
            params['pageSize'] = String(searchConfig.pageSize);
        }
        if (searchConfig?.currentPage) {
            params['currentPage'] = String(searchConfig.currentPage);
        }
        if (searchConfig?.sort) {
            params['sort'] = searchConfig.sort;
        }
        return this.http.get(this.occEndpointsService.buildUrl('stores', { queryParams: params }));
    }
}
OccStoreFinderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStoreFinderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccStoreFinderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStoreFinderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStoreFinderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXN0b3JlLWZpbmRlci5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL29jYy9hZGFwdGVycy9vY2Mtc3RvcmUtZmluZGVyLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBTUwsMkJBQTJCLEdBRTVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUlMLHNCQUFzQixFQUN0QixtQ0FBbUMsR0FDcEMsTUFBTSw2QkFBNkIsQ0FBQztBQUVyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHckMsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNZLElBQWdCLEVBQ2hCLG1CQUF3QyxFQUN4QyxnQkFBa0M7UUFGbEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFDM0MsQ0FBQztJQUVKLE1BQU0sQ0FDSixLQUFhLEVBQ2IsWUFBMEIsRUFDMUIsaUJBQTRCLEVBQzVCLE1BQWU7UUFFZixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FDM0IsS0FBSyxFQUNMLFlBQVksRUFDWixpQkFBaUIsRUFDakIsTUFBTSxDQUNQLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUNsRDthQUNBLElBQUksQ0FDSCxHQUFHLENBQ0QsQ0FBQyxFQUFFLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxDQUFDLDZCQUE2QixDQUNyRSxFQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FDM0QsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBZTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUN2RTthQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRVMsaUJBQWlCLENBQ3pCLEtBQWEsRUFDYixZQUEyQixFQUMzQixpQkFBNEIsRUFDNUIsTUFBZTtRQUVmLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUV2QixJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN6QjtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUksWUFBWSxFQUFFLFFBQVEsRUFBRTtZQUMxQixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksWUFBWSxFQUFFLFdBQVcsRUFBRTtZQUM3QixNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksWUFBWSxFQUFFLElBQUksRUFBRTtZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztTQUNwQztRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQ3JFLENBQUM7SUFDSixDQUFDOztrSEExRVUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBHZW9Qb2ludCxcbiAgT2NjLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBQb2ludE9mU2VydmljZSxcbiAgUE9JTlRfT0ZfU0VSVklDRV9OT1JNQUxJWkVSLFxuICBTZWFyY2hDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBTdG9yZUNvdW50LFxuICBTdG9yZUZpbmRlckFkYXB0ZXIsXG4gIFN0b3JlRmluZGVyU2VhcmNoUGFnZSxcbiAgU1RPUkVfQ09VTlRfTk9STUFMSVpFUixcbiAgU1RPUkVfRklOREVSX1NFQVJDSF9QQUdFX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmaW5kZXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NTdG9yZUZpbmRlckFkYXB0ZXIgaW1wbGVtZW50cyBTdG9yZUZpbmRlckFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzU2VydmljZTogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgc2VhcmNoKFxuICAgIHF1ZXJ5OiBzdHJpbmcsXG4gICAgc2VhcmNoQ29uZmlnOiBTZWFyY2hDb25maWcsXG4gICAgbG9uZ2l0dWRlTGF0aXR1ZGU/OiBHZW9Qb2ludCxcbiAgICByYWRpdXM/OiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxTdG9yZUZpbmRlclNlYXJjaFBhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5jYWxsT2NjRmluZFN0b3JlcyhcbiAgICAgIHF1ZXJ5LFxuICAgICAgc2VhcmNoQ29uZmlnLFxuICAgICAgbG9uZ2l0dWRlTGF0aXR1ZGUsXG4gICAgICByYWRpdXNcbiAgICApLnBpcGUodGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKFNUT1JFX0ZJTkRFUl9TRUFSQ0hfUEFHRV9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBsb2FkQ291bnRzKCk6IE9ic2VydmFibGU8U3RvcmVDb3VudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxPY2MuU3RvcmVDb3VudExpc3Q+KFxuICAgICAgICB0aGlzLm9jY0VuZHBvaW50c1NlcnZpY2UuYnVpbGRVcmwoJ3N0b3Jlc2NvdW50cycpXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgICh7IGNvdW50cmllc0FuZFJlZ2lvbnNTdG9yZUNvdW50IH0pID0+IGNvdW50cmllc0FuZFJlZ2lvbnNTdG9yZUNvdW50XG4gICAgICAgICksXG4gICAgICAgIHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZU1hbnkoU1RPUkVfQ09VTlRfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBsb2FkKHN0b3JlSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2U+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE9jYy5Qb2ludE9mU2VydmljZT4oXG4gICAgICAgIHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybCgnc3RvcmUnLCB7IHVybFBhcmFtczogeyBzdG9yZUlkIH0gfSlcbiAgICAgIClcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShQT0lOVF9PRl9TRVJWSUNFX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsT2NjRmluZFN0b3JlcyhcbiAgICBxdWVyeTogc3RyaW5nLFxuICAgIHNlYXJjaENvbmZpZz86IFNlYXJjaENvbmZpZyxcbiAgICBsb25naXR1ZGVMYXRpdHVkZT86IEdlb1BvaW50LFxuICAgIHJhZGl1cz86IG51bWJlclxuICApOiBPYnNlcnZhYmxlPE9jYy5TdG9yZUZpbmRlclNlYXJjaFBhZ2U+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgaWYgKGxvbmdpdHVkZUxhdGl0dWRlKSB7XG4gICAgICBwYXJhbXNbJ2xvbmdpdHVkZSddID0gU3RyaW5nKGxvbmdpdHVkZUxhdGl0dWRlLmxvbmdpdHVkZSk7XG4gICAgICBwYXJhbXNbJ2xhdGl0dWRlJ10gPSBTdHJpbmcobG9uZ2l0dWRlTGF0aXR1ZGUubGF0aXR1ZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXNbJ3F1ZXJ5J10gPSBxdWVyeTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzKSB7XG4gICAgICBwYXJhbXNbJ3JhZGl1cyddID0gU3RyaW5nKHJhZGl1cyk7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaENvbmZpZz8ucGFnZVNpemUpIHtcbiAgICAgIHBhcmFtc1sncGFnZVNpemUnXSA9IFN0cmluZyhzZWFyY2hDb25maWcucGFnZVNpemUpO1xuICAgIH1cbiAgICBpZiAoc2VhcmNoQ29uZmlnPy5jdXJyZW50UGFnZSkge1xuICAgICAgcGFyYW1zWydjdXJyZW50UGFnZSddID0gU3RyaW5nKHNlYXJjaENvbmZpZy5jdXJyZW50UGFnZSk7XG4gICAgfVxuICAgIGlmIChzZWFyY2hDb25maWc/LnNvcnQpIHtcbiAgICAgIHBhcmFtc1snc29ydCddID0gc2VhcmNoQ29uZmlnLnNvcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8T2NjLlN0b3JlRmluZGVyU2VhcmNoUGFnZT4oXG4gICAgICB0aGlzLm9jY0VuZHBvaW50c1NlcnZpY2UuYnVpbGRVcmwoJ3N0b3JlcycsIHsgcXVlcnlQYXJhbXM6IHBhcmFtcyB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==