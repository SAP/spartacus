/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
export class SkipLinkConfig {
}
SkipLinkConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SkipLinkConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
export class SkipLink {
}
export var SkipLinkScrollPosition;
(function (SkipLinkScrollPosition) {
    SkipLinkScrollPosition["BEFORE"] = "BEFORE";
    SkipLinkScrollPosition["AFTER"] = "AFTER";
})(SkipLinkScrollPosition || (SkipLinkScrollPosition = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC1saW5rLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkvc2tpcC1saW5rL2NvbmZpZy9za2lwLWxpbmsuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFNekMsTUFBTSxPQUFnQixjQUFjOzsyR0FBZCxjQUFjOytHQUFkLGNBQWMsY0FIdEIsTUFBTSxlQUNMLE1BQU07MkZBRUMsY0FBYztrQkFKbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsV0FBVyxFQUFFLE1BQU07aUJBQ3BCOztBQUtELE1BQU0sT0FBZ0IsUUFBUTtDQUs3QjtBQUVELE1BQU0sQ0FBTixJQUFZLHNCQUdYO0FBSEQsV0FBWSxzQkFBc0I7SUFDaEMsMkNBQWlCLENBQUE7SUFDakIseUNBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsc0JBQXNCLEtBQXRCLHNCQUFzQixRQUdqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VFeGlzdGluZzogQ29uZmlnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTa2lwTGlua0NvbmZpZyB7XG4gIHNraXBMaW5rcz86IFNraXBMaW5rW107XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTa2lwTGluayB7XG4gIGtleTogc3RyaW5nO1xuICBpMThuS2V5OiBzdHJpbmc7XG4gIHRhcmdldD86IEhUTUxFbGVtZW50O1xuICBwb3NpdGlvbj86IFNraXBMaW5rU2Nyb2xsUG9zaXRpb247XG59XG5cbmV4cG9ydCBlbnVtIFNraXBMaW5rU2Nyb2xsUG9zaXRpb24ge1xuICBCRUZPUkUgPSAnQkVGT1JFJyxcbiAgQUZURVIgPSAnQUZURVInLFxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHNwYXJ0YWN1cy9jb3JlJyB7XG4gIGludGVyZmFjZSBDb25maWcgZXh0ZW5kcyBTa2lwTGlua0NvbmZpZyB7fVxufVxuIl19