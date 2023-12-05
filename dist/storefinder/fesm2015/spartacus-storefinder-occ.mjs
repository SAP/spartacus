import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { POINT_OF_SERVICE_NORMALIZER, provideDefaultConfig } from '@spartacus/core';
import { STORE_FINDER_SEARCH_PAGE_NORMALIZER, STORE_COUNT_NORMALIZER, StoreFinderAdapter } from '@spartacus/storefinder/core';
import { map } from 'rxjs/operators';
import * as i1 from '@angular/common/http';

class OccStoreFinderAdapter {
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
        if (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.pageSize) {
            params['pageSize'] = String(searchConfig.pageSize);
        }
        if (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.currentPage) {
            params['currentPage'] = String(searchConfig.currentPage);
        }
        if (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.sort) {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccStoreFinderConfig = {
    backend: {
        occ: {
            endpoints: {
                store: 'stores/${storeId}?fields=FULL',
                stores: 'stores?fields=stores(name,displayName,formattedDistance,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email), features),pagination(DEFAULT),sorts(DEFAULT)',
                storescounts: 'stores/storescounts',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderOccModule {
}
StoreFinderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule });
StoreFinderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule, providers: [
        provideDefaultConfig(defaultOccStoreFinderConfig),
        { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccStoreFinderConfig),
                        { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OccStoreFinderAdapter, StoreFinderOccModule };
//# sourceMappingURL=spartacus-storefinder-occ.mjs.map
