/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { COST_CENTER_NORMALIZER } from '../../../../cost-center/connectors/cost-center/converters';
import * as i0 from "@angular/core";
import * as i1 from "../../../../util/converter.service";
export class OccCostCenterListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values = source.costCenters.map((costCenter) => ({
            ...this.converter.convert(costCenter, COST_CENTER_NORMALIZER),
        }));
        return target;
    }
}
OccCostCenterListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterListNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCostCenterListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCostCenterListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvc3QtY2VudGVyLWxpc3Qtbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy9jb3N0LWNlbnRlci9jb252ZXJ0ZXJzL29jYy1jb3N0LWNlbnRlci1saXN0LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkRBQTJELENBQUM7OztBQVluRyxNQUFNLE9BQU8sMkJBQTJCO0lBR3RDLFlBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUcsQ0FBQztJQUVuRCxPQUFPLENBQ0wsTUFBMkIsRUFDM0IsTUFBa0M7UUFFbEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxFQUFFLEdBQUksTUFBYyxFQUErQixDQUFDO1NBQzlEO1FBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0RCxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQztTQUM5RCxDQUFDLENBQUMsQ0FBQztRQUVKLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O3dIQWpCVSwyQkFBMkI7NEhBQTNCLDJCQUEyQixjQUYxQixNQUFNOzJGQUVQLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT1NUX0NFTlRFUl9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29zdC1jZW50ZXIvY29ubmVjdG9ycy9jb3N0LWNlbnRlci9jb252ZXJ0ZXJzJztcbmltcG9ydCB7IEVudGl0aWVzTW9kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2RlbC9taXNjLm1vZGVsJztcbmltcG9ydCB7IENvc3RDZW50ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2RlbC9vcmctdW5pdC5tb2RlbCc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXIsXG4gIENvbnZlcnRlclNlcnZpY2UsXG59IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9jY0Nvc3RDZW50ZXJMaXN0Tm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuQ29zdENlbnRlcnNMaXN0LCBFbnRpdGllc01vZGVsPENvc3RDZW50ZXI+Plxue1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZSkge31cblxuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogT2NjLkNvc3RDZW50ZXJzTGlzdCxcbiAgICB0YXJnZXQ/OiBFbnRpdGllc01vZGVsPENvc3RDZW50ZXI+XG4gICk6IEVudGl0aWVzTW9kZWw8Q29zdENlbnRlcj4ge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBFbnRpdGllc01vZGVsPENvc3RDZW50ZXI+O1xuICAgIH1cbiAgICB0YXJnZXQudmFsdWVzID0gc291cmNlLmNvc3RDZW50ZXJzLm1hcCgoY29zdENlbnRlcikgPT4gKHtcbiAgICAgIC4uLnRoaXMuY29udmVydGVyLmNvbnZlcnQoY29zdENlbnRlciwgQ09TVF9DRU5URVJfTk9STUFMSVpFUiksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIl19