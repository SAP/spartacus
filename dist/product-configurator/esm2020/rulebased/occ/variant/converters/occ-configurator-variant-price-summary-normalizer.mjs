/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccConfiguratorVariantPriceSummaryNormalizer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            ...source.priceSummary,
        };
        return resultTarget;
    }
}
OccConfiguratorVariantPriceSummaryNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantPriceSummaryNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXByaWNlLXN1bW1hcnktbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvb2NjL3ZhcmlhbnQvY29udmVydGVycy9vY2MtY29uZmlndXJhdG9yLXZhcmlhbnQtcHJpY2Utc3VtbWFyeS1ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sNENBQTRDO0lBR3ZELE9BQU8sQ0FDTCxNQUE4QixFQUM5QixNQUFrQztRQUVsQyxNQUFNLFlBQVksR0FBOEI7WUFDOUMsR0FBRyxNQUFNO1lBQ1QsR0FBRyxNQUFNLENBQUMsWUFBWTtTQUN2QixDQUFDO1FBRUYsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7eUlBYlUsNENBQTRDOzZJQUE1Qyw0Q0FBNEMsY0FEL0IsTUFBTTsyRkFDbkIsNENBQTRDO2tCQUR4RCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3IgfSBmcm9tICcuLi92YXJpYW50LWNvbmZpZ3VyYXRvci1vY2MubW9kZWxzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRQcmljZVN1bW1hcnlOb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPE9jY0NvbmZpZ3VyYXRvci5QcmljZXMsIENvbmZpZ3VyYXRvci5QcmljZVN1bW1hcnk+XG57XG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBPY2NDb25maWd1cmF0b3IuUHJpY2VzLFxuICAgIHRhcmdldD86IENvbmZpZ3VyYXRvci5QcmljZVN1bW1hcnlcbiAgKTogQ29uZmlndXJhdG9yLlByaWNlU3VtbWFyeSB7XG4gICAgY29uc3QgcmVzdWx0VGFyZ2V0OiBDb25maWd1cmF0b3IuUHJpY2VTdW1tYXJ5ID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgLi4uc291cmNlLnByaWNlU3VtbWFyeSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdFRhcmdldDtcbiAgfVxufVxuIl19