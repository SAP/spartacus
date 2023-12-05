import { Injectable } from '@angular/core';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
import * as i4 from "../../services/occ-requests-optimizer.service";
export class OccProductAdapter {
    constructor(http, occEndpoints, converter, requestsOptimizer) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.requestsOptimizer = requestsOptimizer;
    }
    load(productCode, scope) {
        return this.http
            .get(this.getEndpoint(productCode, scope))
            .pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
    }
    loadMany(products) {
        const scopedDataWithUrls = products.map((model) => ({
            scopedData: model,
            url: this.getEndpoint(model.code, model.scope),
        }));
        return this.requestsOptimizer
            .scopedDataLoad(scopedDataWithUrls)
            .map((scopedProduct) => ({
            ...scopedProduct,
            data$: scopedProduct.data$?.pipe(this.converter.pipeable(PRODUCT_NORMALIZER)),
        }));
    }
    getEndpoint(code, scope) {
        return this.occEndpoints.buildUrl('product', {
            urlParams: { productCode: code },
            scope,
        });
    }
}
OccProductAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccProductAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }, { token: i4.OccRequestsOptimizerService }], target: i0.ɵɵFactoryTarget.Injectable });
OccProductAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccProductAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccProductAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }, { type: i4.OccRequestsOptimizerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXByb2R1Y3QuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy9wcm9kdWN0L29jYy1wcm9kdWN0LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7O0FBVXBGLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQixFQUMzQixpQkFBOEM7UUFIOUMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtJQUN2RCxDQUFDO0lBRUosSUFBSSxDQUFDLFdBQW1CLEVBQUUsS0FBYztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUE2QjtRQUNwQyxNQUFNLGtCQUFrQixHQUF3QixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVKLE9BQU8sSUFBSSxDQUFDLGlCQUFpQjthQUMxQixjQUFjLENBQWMsa0JBQWtCLENBQUM7YUFDL0MsR0FBRyxDQUNGLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FDaEIsQ0FBQztZQUNDLEdBQUcsYUFBYTtZQUNoQixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQzVDO1NBQ29CLENBQUEsQ0FDMUIsQ0FBQztJQUNOLENBQUM7SUFFUyxXQUFXLENBQUMsSUFBWSxFQUFFLEtBQWM7UUFDaEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDM0MsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtZQUNoQyxLQUFLO1NBQ04sQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OEdBdENVLGlCQUFpQjtrSEFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL21vZGVsL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgUFJPRFVDVF9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9jb25uZWN0b3JzL3Byb2R1Y3QvY29udmVydGVycyc7XG5pbXBvcnQgeyBQcm9kdWN0QWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvY29ubmVjdG9ycy9wcm9kdWN0L3Byb2R1Y3QuYWRhcHRlcic7XG5pbXBvcnQgeyBTY29wZWRQcm9kdWN0RGF0YSB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvY29ubmVjdG9ycy9wcm9kdWN0L3Njb3BlZC1wcm9kdWN0LWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vb2NjLW1vZGVscyc7XG5pbXBvcnQgeyBPY2NFbmRwb2ludHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2NjLWVuZHBvaW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjb3BlZERhdGFXaXRoVXJsIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvb2NjLWZpZWxkcy5zZXJ2aWNlJztcbmltcG9ydCB7IE9jY1JlcXVlc3RzT3B0aW1pemVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1yZXF1ZXN0cy1vcHRpbWl6ZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NQcm9kdWN0QWRhcHRlciBpbXBsZW1lbnRzIFByb2R1Y3RBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZXF1ZXN0c09wdGltaXplcjogT2NjUmVxdWVzdHNPcHRpbWl6ZXJTZXJ2aWNlXG4gICkge31cblxuICBsb2FkKHByb2R1Y3RDb2RlOiBzdHJpbmcsIHNjb3BlPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9kdWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldCh0aGlzLmdldEVuZHBvaW50KHByb2R1Y3RDb2RlLCBzY29wZSkpXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlci5waXBlYWJsZShQUk9EVUNUX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIGxvYWRNYW55KHByb2R1Y3RzOiBTY29wZWRQcm9kdWN0RGF0YVtdKTogU2NvcGVkUHJvZHVjdERhdGFbXSB7XG4gICAgY29uc3Qgc2NvcGVkRGF0YVdpdGhVcmxzOiBTY29wZWREYXRhV2l0aFVybFtdID0gcHJvZHVjdHMubWFwKChtb2RlbCkgPT4gKHtcbiAgICAgIHNjb3BlZERhdGE6IG1vZGVsLFxuICAgICAgdXJsOiB0aGlzLmdldEVuZHBvaW50KG1vZGVsLmNvZGUsIG1vZGVsLnNjb3BlKSxcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0c09wdGltaXplclxuICAgICAgLnNjb3BlZERhdGFMb2FkPE9jYy5Qcm9kdWN0PihzY29wZWREYXRhV2l0aFVybHMpXG4gICAgICAubWFwKFxuICAgICAgICAoc2NvcGVkUHJvZHVjdCkgPT5cbiAgICAgICAgICAoe1xuICAgICAgICAgICAgLi4uc2NvcGVkUHJvZHVjdCxcbiAgICAgICAgICAgIGRhdGEkOiBzY29wZWRQcm9kdWN0LmRhdGEkPy5waXBlKFxuICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZShQUk9EVUNUX05PUk1BTElaRVIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0gYXMgU2NvcGVkUHJvZHVjdERhdGEpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVuZHBvaW50KGNvZGU6IHN0cmluZywgc2NvcGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncHJvZHVjdCcsIHtcbiAgICAgIHVybFBhcmFtczogeyBwcm9kdWN0Q29kZTogY29kZSB9LFxuICAgICAgc2NvcGUsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==