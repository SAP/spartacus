import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export class OrderByIdEffect {
    constructor() {
        this.actions$ = inject(Actions);
        this.orderConnector = inject(OrderHistoryConnector);
        this.loadOrderById$ = createEffect(() => this.actions$.pipe(ofType(OrderActions.LOAD_ORDER_BY_ID), map((action) => action.payload), concatMap(({ userId, code }) => {
            return this.orderConnector.get(userId, code).pipe(map((order) => {
                return new OrderActions.LoadOrderByIdSuccess(order);
            }), catchError((error) => {
                return of(new OrderActions.LoadOrderByIdFail({
                    code,
                    error: normalizeHttpError(error),
                }));
            }));
        })));
    }
}
OrderByIdEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderByIdEffect, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderByIdEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderByIdEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderByIdEffect, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYnktaWQuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvcmUvc3RvcmUvZWZmZWN0cy9vcmRlci1ieS1pZC5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXJELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQUdoRCxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVZLGFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsbUJBQWMsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxtQkFBYyxHQUVWLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFDckMsR0FBRyxDQUFDLENBQUMsTUFBa0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUMzRCxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0MsR0FBRyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxZQUFZLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsS0FBd0IsRUFBRSxFQUFFO2dCQUN0QyxPQUFPLEVBQUUsQ0FDUCxJQUFJLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDakMsSUFBSTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDO2lCQUNqQyxDQUFDLENBQ0gsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7S0FDSDs7NEdBMUJZLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIGNyZWF0ZUVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBub3JtYWxpemVIdHRwRXJyb3IgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGNvbmNhdE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JkZXJIaXN0b3J5Q29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycy9vcmRlci1oaXN0b3J5LmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBPcmRlckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZGVyQnlJZEVmZmVjdCB7XG4gIHByb3RlY3RlZCBhY3Rpb25zJCA9IGluamVjdChBY3Rpb25zKTtcbiAgcHJvdGVjdGVkIG9yZGVyQ29ubmVjdG9yID0gaW5qZWN0KE9yZGVySGlzdG9yeUNvbm5lY3Rvcik7XG4gIGxvYWRPcmRlckJ5SWQkOiBPYnNlcnZhYmxlPFxuICAgIE9yZGVyQWN0aW9ucy5Mb2FkT3JkZXJCeUlkU3VjY2VzcyB8IE9yZGVyQWN0aW9ucy5Mb2FkT3JkZXJCeUlkRmFpbFxuICA+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKE9yZGVyQWN0aW9ucy5MT0FEX09SREVSX0JZX0lEKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBPcmRlckFjdGlvbnMuTG9hZE9yZGVyQnlJZCkgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgICAgY29uY2F0TWFwKCh7IHVzZXJJZCwgY29kZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yZGVyQ29ubmVjdG9yLmdldCh1c2VySWQsIGNvZGUpLnBpcGUoXG4gICAgICAgICAgbWFwKChvcmRlcjogT3JkZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3JkZXJBY3Rpb25zLkxvYWRPcmRlckJ5SWRTdWNjZXNzKG9yZGVyKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5Mb2FkT3JkZXJCeUlkRmFpbCh7XG4gICAgICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogbm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xufVxuIl19