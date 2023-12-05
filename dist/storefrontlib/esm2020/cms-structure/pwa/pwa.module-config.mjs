/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
export class PWAModuleConfig {
}
PWAModuleConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PWAModuleConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PWAModuleConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PWAModuleConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PWAModuleConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
export const defaultPWAModuleConfig = {
    pwa: {
        enabled: false,
        addToHomeScreen: false,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdhLm1vZHVsZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcHdhL3B3YS5tb2R1bGUtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFNekMsTUFBTSxPQUFnQixlQUFlOzs0R0FBZixlQUFlO2dIQUFmLGVBQWUsY0FIdkIsTUFBTSxlQUNMLE1BQU07MkZBRUMsZUFBZTtrQkFKcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsV0FBVyxFQUFFLE1BQU07aUJBQ3BCOztBQVFELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFvQjtJQUNyRCxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUNkLGVBQWUsRUFBRSxLQUFLO0tBQ3ZCO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VFeGlzdGluZzogQ29uZmlnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQV0FNb2R1bGVDb25maWcge1xuICBwd2E/OiB7XG4gICAgZW5hYmxlZD86IGJvb2xlYW47XG4gICAgYWRkVG9Ib21lU2NyZWVuPzogYm9vbGVhbjtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQV0FNb2R1bGVDb25maWc6IFBXQU1vZHVsZUNvbmZpZyA9IHtcbiAgcHdhOiB7XG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgYWRkVG9Ib21lU2NyZWVuOiBmYWxzZSxcbiAgfSxcbn07XG5cbmRlY2xhcmUgbW9kdWxlICdAc3BhcnRhY3VzL2NvcmUnIHtcbiAgaW50ZXJmYWNlIENvbmZpZyBleHRlbmRzIFBXQU1vZHVsZUNvbmZpZyB7fVxufVxuIl19