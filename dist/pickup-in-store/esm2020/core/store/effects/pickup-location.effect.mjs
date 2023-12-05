/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PickupLocationActions from '../actions/pickup-location.action';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors";
export class PickupLocationEffect {
    constructor(actions$, pickupLocationConnector) {
        this.actions$ = actions$;
        this.pickupLocationConnector = pickupLocationConnector;
        this.logger = inject(LoggerService);
        this.storeDetails$ = createEffect(() => this.actions$.pipe(ofType(PickupLocationActions.GET_STORE_DETAILS), map((action) => action.payload), mergeMap((storeName) => this.pickupLocationConnector.getStoreDetails(storeName).pipe(map((storeDetails) => PickupLocationActions.SetStoreDetailsSuccess({
            payload: storeDetails,
        })), catchError((error) => of(PickupLocationActions.SetStoreDetailsFailure({
            payload: normalizeHttpError(error, this.logger),
        })))))));
        // Intentional empty constructor
    }
}
PickupLocationEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationEffect, deps: [{ token: i1.Actions }, { token: i2.PickupLocationConnector }], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.PickupLocationConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWxvY2F0aW9uLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvY29yZS9zdG9yZS9lZmZlY3RzL3BpY2t1cC1sb2NhdGlvbi5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNELE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQUczRSxNQUFNLE9BQU8sb0JBQW9CO0lBRy9CLFlBQ1UsUUFBaUIsRUFDakIsdUJBQWdEO1FBRGhELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUpoRCxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBU3pDLGtCQUFhLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLEVBQy9DLEdBQUcsQ0FDRCxDQUNFLE1BQW9FLEVBQ3BFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNwQixFQUNELFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ3JCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUMxRCxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUNuQixxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzQyxPQUFPLEVBQUUsWUFBWTtTQUN0QixDQUFDLENBQ0gsRUFDRCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixFQUFFLENBQ0EscUJBQXFCLENBQUMsc0JBQXNCLENBQUM7WUFDM0MsT0FBTyxFQUFFLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2hELENBQUMsQ0FDSCxDQUNGLENBQ0YsQ0FDRixDQUNGLENBQ0YsQ0FBQztRQTVCQSxnQ0FBZ0M7SUFDbEMsQ0FBQzs7aUhBUlUsb0JBQW9CO3FIQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UsIG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBpY2t1cExvY2F0aW9uQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycyc7XG5pbXBvcnQgKiBhcyBQaWNrdXBMb2NhdGlvbkFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy9waWNrdXAtbG9jYXRpb24uYWN0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBpY2t1cExvY2F0aW9uRWZmZWN0IHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgcGlja3VwTG9jYXRpb25Db25uZWN0b3I6IFBpY2t1cExvY2F0aW9uQ29ubmVjdG9yXG4gICkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBzdG9yZURldGFpbHMkID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKFBpY2t1cExvY2F0aW9uQWN0aW9ucy5HRVRfU1RPUkVfREVUQUlMUyksXG4gICAgICBtYXAoXG4gICAgICAgIChcbiAgICAgICAgICBhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIFBpY2t1cExvY2F0aW9uQWN0aW9ucy5HZXRTdG9yZURldGFpbHNCeUlkPlxuICAgICAgICApID0+IGFjdGlvbi5wYXlsb2FkXG4gICAgICApLFxuICAgICAgbWVyZ2VNYXAoKHN0b3JlTmFtZSkgPT5cbiAgICAgICAgdGhpcy5waWNrdXBMb2NhdGlvbkNvbm5lY3Rvci5nZXRTdG9yZURldGFpbHMoc3RvcmVOYW1lKS5waXBlKFxuICAgICAgICAgIG1hcCgoc3RvcmVEZXRhaWxzKSA9PlxuICAgICAgICAgICAgUGlja3VwTG9jYXRpb25BY3Rpb25zLlNldFN0b3JlRGV0YWlsc1N1Y2Nlc3Moe1xuICAgICAgICAgICAgICBwYXlsb2FkOiBzdG9yZURldGFpbHMsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgUGlja3VwTG9jYXRpb25BY3Rpb25zLlNldFN0b3JlRGV0YWlsc0ZhaWx1cmUoe1xuICAgICAgICAgICAgICAgIHBheWxvYWQ6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcbn1cbiJdfQ==