/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CartValidationStateService {
    constructor(routingService) {
        this.routingService = routingService;
        this.NAVIGATION_SKIPS = 2;
        this.navigationIdCount = 0;
        this.subscription = new Subscription();
        this.cartValidationResult$ = new ReplaySubject(1);
        this.checkForValidationResultClear$ = this.routingService
            .getRouterState()
            .pipe(withLatestFrom(this.cartValidationResult$), tap(([routerState, cartModifications]) => {
            if (this.navigationIdCount + this.NAVIGATION_SKIPS <=
                routerState.navigationId &&
                cartModifications.length) {
                this.cartValidationResult$.next([]);
                this.navigationIdCount = routerState.navigationId;
            }
        }));
        this.setInitialState();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setInitialState() {
        this.setNavigationIdStep();
        this.subscription.add(this.checkForValidationResultClear$.subscribe());
    }
    updateValidationResultAndRoutingId(cartModification) {
        this.cartValidationResult$.next(cartModification);
        this.setNavigationIdStep();
    }
    setNavigationIdStep() {
        this.routingService
            .getRouterState()
            .pipe(take(1))
            .subscribe((routerState) => (this.navigationIdCount = routerState.navigationId));
    }
}
CartValidationStateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationStateService, deps: [{ token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationStateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationStateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationStateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12YWxpZGF0aW9uLXN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvc2VydmljZXMvY2FydC12YWxpZGF0aW9uLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHdEQsT0FBTyxFQUFjLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUszRCxNQUFNLE9BQU8sMEJBQTBCO0lBU3JDLFlBQXNCLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVIxQyxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QywwQkFBcUIsR0FBbUMsSUFBSSxhQUFhLENBRXZFLENBQUMsQ0FBbUMsQ0FBQztRQU03QixtQ0FBOEIsR0FBRyxJQUFJLENBQUMsY0FBYzthQUMzRCxjQUFjLEVBQUU7YUFDaEIsSUFBSSxDQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFDMUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQzVDLFdBQVcsQ0FBQyxZQUFZO2dCQUMxQixpQkFBaUIsQ0FBQyxNQUFNLEVBQ3hCO2dCQUVFLElBQUksQ0FBQyxxQkFDTixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQzthQUNuRDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFuQkYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVTLGVBQWU7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGtDQUFrQyxDQUFDLGdCQUFvQztRQUNwRSxJQUFJLENBQUMscUJBQTJELENBQUMsSUFBSSxDQUNwRSxnQkFBZ0IsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFUyxtQkFBbUI7UUFDM0IsSUFBSSxDQUFDLGNBQWM7YUFDaEIsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQ1IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FDckUsQ0FBQztJQUNOLENBQUM7O3VIQXREVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRNb2RpZmljYXRpb24gfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENhcnRWYWxpZGF0aW9uU3RhdGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIE5BVklHQVRJT05fU0tJUFMgPSAyO1xuICBwcm90ZWN0ZWQgbmF2aWdhdGlvbklkQ291bnQgPSAwO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIGNhcnRWYWxpZGF0aW9uUmVzdWx0JDogT2JzZXJ2YWJsZTxDYXJ0TW9kaWZpY2F0aW9uW10+ID0gbmV3IFJlcGxheVN1YmplY3Q8XG4gICAgQ2FydE1vZGlmaWNhdGlvbltdXG4gID4oMSkgYXMgT2JzZXJ2YWJsZTxDYXJ0TW9kaWZpY2F0aW9uW10+O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UpIHtcbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrRm9yVmFsaWRhdGlvblJlc3VsdENsZWFyJCA9IHRoaXMucm91dGluZ1NlcnZpY2VcbiAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgIC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jYXJ0VmFsaWRhdGlvblJlc3VsdCQpLFxuICAgICAgdGFwKChbcm91dGVyU3RhdGUsIGNhcnRNb2RpZmljYXRpb25zXSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uSWRDb3VudCArIHRoaXMuTkFWSUdBVElPTl9TS0lQUyA8PVxuICAgICAgICAgICAgcm91dGVyU3RhdGUubmF2aWdhdGlvbklkICYmXG4gICAgICAgICAgY2FydE1vZGlmaWNhdGlvbnMubGVuZ3RoXG4gICAgICAgICkge1xuICAgICAgICAgIChcbiAgICAgICAgICAgIHRoaXMuY2FydFZhbGlkYXRpb25SZXN1bHQkIGFzIFJlcGxheVN1YmplY3Q8Q2FydE1vZGlmaWNhdGlvbltdPlxuICAgICAgICAgICkubmV4dChbXSk7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uSWRDb3VudCA9IHJvdXRlclN0YXRlLm5hdmlnYXRpb25JZDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHRoaXMuc2V0TmF2aWdhdGlvbklkU3RlcCgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmNoZWNrRm9yVmFsaWRhdGlvblJlc3VsdENsZWFyJC5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICB1cGRhdGVWYWxpZGF0aW9uUmVzdWx0QW5kUm91dGluZ0lkKGNhcnRNb2RpZmljYXRpb246IENhcnRNb2RpZmljYXRpb25bXSkge1xuICAgICh0aGlzLmNhcnRWYWxpZGF0aW9uUmVzdWx0JCBhcyBSZXBsYXlTdWJqZWN0PENhcnRNb2RpZmljYXRpb25bXT4pLm5leHQoXG4gICAgICBjYXJ0TW9kaWZpY2F0aW9uXG4gICAgKTtcbiAgICB0aGlzLnNldE5hdmlnYXRpb25JZFN0ZXAoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXROYXZpZ2F0aW9uSWRTdGVwKCkge1xuICAgIHRoaXMucm91dGluZ1NlcnZpY2VcbiAgICAgIC5nZXRSb3V0ZXJTdGF0ZSgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHJvdXRlclN0YXRlKSA9PiAodGhpcy5uYXZpZ2F0aW9uSWRDb3VudCA9IHJvdXRlclN0YXRlLm5hdmlnYXRpb25JZClcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==