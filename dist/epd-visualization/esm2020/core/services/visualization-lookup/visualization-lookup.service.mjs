/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ContentType, } from '@spartacus/epd-visualization/root';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/epd-visualization/root";
import * as i2 from "../../connectors/visualization/visualization.connector";
export class VisualizationLookupService {
    constructor(epdVisualizationConfig, visualizationConnector) {
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.visualizationConnector = visualizationConnector;
    }
    /**
     * Finds visualizations by usage id containing product code values.
     * The search space is limited to folders with a configured usage id value.
     * @param productCode The product code value to search for.
     * @returns An Observable producing an VisualizationInfo array containing the set of matching visualizations.
     */
    findMatchingVisualizations(productCode) {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const usageIdConfig = epdVisualization.usageIds;
        const productUsageId = usageIdConfig.productUsageId;
        const folderUsageId = usageIdConfig.folderUsageId;
        const usage = {
            name: productUsageId.name,
            keys: [
                {
                    name: productUsageId.keyName,
                    value: productCode,
                },
            ],
        };
        return this.visualizationConnector
            .lookupVisualization(usage, folderUsageId)
            .pipe(map((data) => data.visualizations.filter((item) => item.contentType === ContentType.Model3D ||
            item.contentType === ContentType.Drawing2D)));
    }
}
VisualizationLookupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationLookupService, deps: [{ token: i1.EpdVisualizationConfig }, { token: i2.VisualizationConnector }], target: i0.ɵɵFactoryTarget.Injectable });
VisualizationLookupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationLookupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationLookupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EpdVisualizationConfig }, { type: i2.VisualizationConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1sb29rdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vY29yZS9zZXJ2aWNlcy92aXN1YWxpemF0aW9uLWxvb2t1cC92aXN1YWxpemF0aW9uLWxvb2t1cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxXQUFXLEdBTVosTUFBTSxtQ0FBbUMsQ0FBQztBQUUzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFPckMsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNZLHNCQUE4QyxFQUM5QyxzQkFBOEM7UUFEOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBQ3ZELENBQUM7SUFFSjs7Ozs7T0FLRztJQUNJLDBCQUEwQixDQUMvQixXQUFtQjtRQUVuQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0I7YUFDakQsZ0JBQStDLENBQUM7UUFDbkQsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsUUFBeUIsQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDO1FBQ3BELE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFFbEQsTUFBTSxLQUFLLEdBQVk7WUFDckIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFjO1lBQ25DLElBQUksRUFBRTtnQkFDSjtvQkFDRSxJQUFJLEVBQUUsY0FBYyxDQUFDLE9BQWlCO29CQUN0QyxLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxzQkFBc0I7YUFDL0IsbUJBQW1CLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQzthQUN6QyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsSUFBa0MsRUFBRSxFQUFFLENBQ3hDLElBQUksQ0FBQyxjQUFzQyxDQUFDLE1BQU0sQ0FDakQsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUNaLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLE9BQU87WUFDeEMsSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsU0FBUyxDQUM3QyxDQUNGLENBQ0YsQ0FBQztJQUNOLENBQUM7O3VIQTFDVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250ZW50VHlwZSxcbiAgRXBkVmlzdWFsaXphdGlvbkNvbmZpZyxcbiAgRXBkVmlzdWFsaXphdGlvbklubmVyQ29uZmlnLFxuICBVc2FnZUlkLFxuICBVc2FnZUlkQ29uZmlnLFxuICBWaXN1YWxpemF0aW9uSW5mbyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvb2t1cFZpc3VhbGl6YXRpb25zUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL3Zpc3VhbGl6YXRpb24vbG9va3VwLXZpc3VhbGl6YXRpb25zLXJlc3BvbnNlJztcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL3Zpc3VhbGl6YXRpb24vdmlzdWFsaXphdGlvbi5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvbkxvb2t1cFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXBkVmlzdWFsaXphdGlvbkNvbmZpZzogRXBkVmlzdWFsaXphdGlvbkNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgdmlzdWFsaXphdGlvbkNvbm5lY3RvcjogVmlzdWFsaXphdGlvbkNvbm5lY3RvclxuICApIHt9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHZpc3VhbGl6YXRpb25zIGJ5IHVzYWdlIGlkIGNvbnRhaW5pbmcgcHJvZHVjdCBjb2RlIHZhbHVlcy5cbiAgICogVGhlIHNlYXJjaCBzcGFjZSBpcyBsaW1pdGVkIHRvIGZvbGRlcnMgd2l0aCBhIGNvbmZpZ3VyZWQgdXNhZ2UgaWQgdmFsdWUuXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZSBUaGUgcHJvZHVjdCBjb2RlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAqIEByZXR1cm5zIEFuIE9ic2VydmFibGUgcHJvZHVjaW5nIGFuIFZpc3VhbGl6YXRpb25JbmZvIGFycmF5IGNvbnRhaW5pbmcgdGhlIHNldCBvZiBtYXRjaGluZyB2aXN1YWxpemF0aW9ucy5cbiAgICovXG4gIHB1YmxpYyBmaW5kTWF0Y2hpbmdWaXN1YWxpemF0aW9ucyhcbiAgICBwcm9kdWN0Q29kZTogU3RyaW5nXG4gICk6IE9ic2VydmFibGU8VmlzdWFsaXphdGlvbkluZm9bXT4ge1xuICAgIGNvbnN0IGVwZFZpc3VhbGl6YXRpb24gPSB0aGlzLmVwZFZpc3VhbGl6YXRpb25Db25maWdcbiAgICAgIC5lcGRWaXN1YWxpemF0aW9uIGFzIEVwZFZpc3VhbGl6YXRpb25Jbm5lckNvbmZpZztcbiAgICBjb25zdCB1c2FnZUlkQ29uZmlnID0gZXBkVmlzdWFsaXphdGlvbi51c2FnZUlkcyBhcyBVc2FnZUlkQ29uZmlnO1xuICAgIGNvbnN0IHByb2R1Y3RVc2FnZUlkID0gdXNhZ2VJZENvbmZpZy5wcm9kdWN0VXNhZ2VJZDtcbiAgICBjb25zdCBmb2xkZXJVc2FnZUlkID0gdXNhZ2VJZENvbmZpZy5mb2xkZXJVc2FnZUlkO1xuXG4gICAgY29uc3QgdXNhZ2U6IFVzYWdlSWQgPSB7XG4gICAgICBuYW1lOiBwcm9kdWN0VXNhZ2VJZC5uYW1lIGFzIHN0cmluZyxcbiAgICAgIGtleXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHByb2R1Y3RVc2FnZUlkLmtleU5hbWUgYXMgc3RyaW5nLFxuICAgICAgICAgIHZhbHVlOiBwcm9kdWN0Q29kZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnZpc3VhbGl6YXRpb25Db25uZWN0b3JcbiAgICAgIC5sb29rdXBWaXN1YWxpemF0aW9uKHVzYWdlLCBmb2xkZXJVc2FnZUlkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZGF0YTogTG9va3VwVmlzdWFsaXphdGlvbnNSZXNwb25zZSkgPT5cbiAgICAgICAgICAoZGF0YS52aXN1YWxpemF0aW9ucyBhcyBWaXN1YWxpemF0aW9uSW5mb1tdKS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAgICBpdGVtLmNvbnRlbnRUeXBlID09PSBDb250ZW50VHlwZS5Nb2RlbDNEIHx8XG4gICAgICAgICAgICAgIGl0ZW0uY29udGVudFR5cGUgPT09IENvbnRlbnRUeXBlLkRyYXdpbmcyRFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxufVxuIl19