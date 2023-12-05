/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import * as i0 from "@angular/core";
export var StorageSyncType;
(function (StorageSyncType) {
    StorageSyncType["NO_STORAGE"] = "NO_STORAGE";
    StorageSyncType["LOCAL_STORAGE"] = "LOCAL_STORAGE";
    StorageSyncType["SESSION_STORAGE"] = "SESSION_STORAGE";
})(StorageSyncType || (StorageSyncType = {}));
export var StateTransferType;
(function (StateTransferType) {
    StateTransferType["TRANSFER_STATE"] = "SSR";
})(StateTransferType || (StateTransferType = {}));
export class StateConfig {
}
StateConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StateConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
StateConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StateConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StateConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc3RhdGUvY29uZmlnL3N0YXRlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBRXBELE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDekIsNENBQXlCLENBQUE7SUFDekIsa0RBQStCLENBQUE7SUFDL0Isc0RBQW1DLENBQUE7QUFDckMsQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRUQsTUFBTSxDQUFOLElBQVksaUJBRVg7QUFGRCxXQUFZLGlCQUFpQjtJQUMzQiwyQ0FBc0IsQ0FBQTtBQUN4QixDQUFDLEVBRlcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQUU1QjtBQU1ELE1BQU0sT0FBZ0IsV0FBVzs7d0dBQVgsV0FBVzs0R0FBWCxXQUFXLGNBSG5CLE1BQU0sZUFDTCxNQUFNOzJGQUVDLFdBQVc7a0JBSmhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFdBQVcsRUFBRSxNQUFNO2lCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWctdG9rZW5zJztcblxuZXhwb3J0IGVudW0gU3RvcmFnZVN5bmNUeXBlIHtcbiAgTk9fU1RPUkFHRSA9ICdOT19TVE9SQUdFJyxcbiAgTE9DQUxfU1RPUkFHRSA9ICdMT0NBTF9TVE9SQUdFJyxcbiAgU0VTU0lPTl9TVE9SQUdFID0gJ1NFU1NJT05fU1RPUkFHRScsXG59XG5cbmV4cG9ydCBlbnVtIFN0YXRlVHJhbnNmZXJUeXBlIHtcbiAgVFJBTlNGRVJfU1RBVEUgPSAnU1NSJyxcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUV4aXN0aW5nOiBDb25maWcsXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlQ29uZmlnIHtcbiAgc3RhdGU/OiB7XG4gICAgc3NyVHJhbnNmZXI/OiB7XG4gICAgICBrZXlzPzoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBzZXQgb2Ygc3RhdGUga2V5cyB0aGF0IHNob3VsZCBiZSB0cmFuc2ZlcnJlZCBmcm9tIHNlcnZlci5cbiAgICAgICAgICovXG4gICAgICAgIFtrZXk6IHN0cmluZ106IFN0YXRlVHJhbnNmZXJUeXBlO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG5kZWNsYXJlIG1vZHVsZSAnLi4vLi4vY29uZmlnL2NvbmZpZy10b2tlbnMnIHtcbiAgaW50ZXJmYWNlIENvbmZpZyBleHRlbmRzIFN0YXRlQ29uZmlnIHt9XG59XG4iXX0=