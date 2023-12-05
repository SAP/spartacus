/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { queueScheduler } from 'rxjs';
import { filter, map, observeOn, tap } from 'rxjs/operators';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../auth/user-auth/facade/user-id.service";
export class UserCostCenterService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    /**
     * Load all visible active cost centers for the currently login user
     */
    loadActiveCostCenters() {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new UserActions.LoadActiveCostCenters(userId));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    getCostCentersState() {
        return this.store.select(UsersSelectors.getCostCentersState);
    }
    /**
     * Get all visible active cost centers
     */
    getActiveCostCenters() {
        return this.getCostCentersState().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadActiveCostCenters();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value ?? []));
    }
    /**
     * Get the addresses of the cost center's unit based on cost center id
     * @param costCenterId cost center id
     */
    getCostCenterAddresses(costCenterId) {
        return this.getActiveCostCenters().pipe(map((costCenters) => {
            const costCenter = costCenters.find((cc) => cc.code === costCenterId);
            if (costCenter && costCenter.unit) {
                return costCenter.unit.addresses ?? [];
            }
            else {
                return [];
            }
        }));
    }
}
UserCostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserCostCenterService, deps: [{ token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
UserCostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserCostCenterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserCostCenterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb3N0LWNlbnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXNlci9mYWNhZGUvdXNlci1jb3N0LWNlbnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFNMUQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNZLEtBQTJCLEVBQzNCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQXNCO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ3JDLENBQUM7SUFFSjs7T0FFRztJQUNILHFCQUFxQjtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRSxDQUFDO1lBQ0QsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixpRUFBaUU7WUFDbkUsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQ3BDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFDekIsR0FBRyxDQUFDLENBQUMsT0FBa0MsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLENBQUMsT0FBa0MsRUFBRSxFQUFFLENBQzVDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDMUMsRUFDRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQ3BDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsc0JBQXNCLENBQUMsWUFBb0I7UUFDekMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQ3JDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUM7WUFDdEUsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDakMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7YUFDeEM7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOztrSEF6RFUscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBxdWV1ZVNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIG9ic2VydmVPbiwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXNlcklkU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGgvdXNlci1hdXRoL2ZhY2FkZS91c2VyLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4uLy4uL21vZGVsL2FkZHJlc3MubW9kZWwnO1xuaW1wb3J0IHsgQ29zdENlbnRlciB9IGZyb20gJy4uLy4uL21vZGVsL29yZy11bml0Lm1vZGVsJztcbmltcG9ydCB7IExvYWRlclN0YXRlIH0gZnJvbSAnLi4vLi4vc3RhdGUvdXRpbHMvbG9hZGVyL2xvYWRlci1zdGF0ZSc7XG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgVXNlcnNTZWxlY3RvcnMgfSBmcm9tICcuLi9zdG9yZS9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgU3RhdGVXaXRoVXNlciB9IGZyb20gJy4uL3N0b3JlL3VzZXItc3RhdGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckNvc3RDZW50ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxTdGF0ZVdpdGhVc2VyPixcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIExvYWQgYWxsIHZpc2libGUgYWN0aXZlIGNvc3QgY2VudGVycyBmb3IgdGhlIGN1cnJlbnRseSBsb2dpbiB1c2VyXG4gICAqL1xuICBsb2FkQWN0aXZlQ29zdENlbnRlcnMoKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh1c2VySWQpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgVXNlckFjdGlvbnMuTG9hZEFjdGl2ZUNvc3RDZW50ZXJzKHVzZXJJZCkpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb3N0Q2VudGVyc1N0YXRlKCk6IE9ic2VydmFibGU8TG9hZGVyU3RhdGU8Q29zdENlbnRlcltdPj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChVc2Vyc1NlbGVjdG9ycy5nZXRDb3N0Q2VudGVyc1N0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHZpc2libGUgYWN0aXZlIGNvc3QgY2VudGVyc1xuICAgKi9cbiAgZ2V0QWN0aXZlQ29zdENlbnRlcnMoKTogT2JzZXJ2YWJsZTxDb3N0Q2VudGVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb3N0Q2VudGVyc1N0YXRlKCkucGlwZShcbiAgICAgIG9ic2VydmVPbihxdWV1ZVNjaGVkdWxlciksXG4gICAgICB0YXAoKHByb2Nlc3M6IExvYWRlclN0YXRlPENvc3RDZW50ZXJbXT4pID0+IHtcbiAgICAgICAgaWYgKCEocHJvY2Vzcy5sb2FkaW5nIHx8IHByb2Nlc3Muc3VjY2VzcyB8fCBwcm9jZXNzLmVycm9yKSkge1xuICAgICAgICAgIHRoaXMubG9hZEFjdGl2ZUNvc3RDZW50ZXJzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKChwcm9jZXNzOiBMb2FkZXJTdGF0ZTxDb3N0Q2VudGVyW10+KSA9PlxuICAgICAgICBCb29sZWFuKHByb2Nlc3Muc3VjY2VzcyB8fCBwcm9jZXNzLmVycm9yKVxuICAgICAgKSxcbiAgICAgIG1hcCgocmVzdWx0KSA9PiByZXN1bHQudmFsdWUgPz8gW10pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFkZHJlc3NlcyBvZiB0aGUgY29zdCBjZW50ZXIncyB1bml0IGJhc2VkIG9uIGNvc3QgY2VudGVyIGlkXG4gICAqIEBwYXJhbSBjb3N0Q2VudGVySWQgY29zdCBjZW50ZXIgaWRcbiAgICovXG4gIGdldENvc3RDZW50ZXJBZGRyZXNzZXMoY29zdENlbnRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFkZHJlc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZUNvc3RDZW50ZXJzKCkucGlwZShcbiAgICAgIG1hcCgoY29zdENlbnRlcnMpID0+IHtcbiAgICAgICAgY29uc3QgY29zdENlbnRlciA9IGNvc3RDZW50ZXJzLmZpbmQoKGNjKSA9PiBjYy5jb2RlID09PSBjb3N0Q2VudGVySWQpO1xuICAgICAgICBpZiAoY29zdENlbnRlciAmJiBjb3N0Q2VudGVyLnVuaXQpIHtcbiAgICAgICAgICByZXR1cm4gY29zdENlbnRlci51bml0LmFkZHJlc3NlcyA/PyBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19