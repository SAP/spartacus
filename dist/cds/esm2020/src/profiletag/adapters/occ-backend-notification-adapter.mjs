import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccBackendNotification {
    constructor(http, occEndpoints) {
        this.http = http;
        this.occEndpoints = occEndpoints;
    }
    notifySuccessfulLogin() {
        return this.http
            .post(`${this.occEndpoints.getBaseUrl()}/users/current/loginnotification`, {})
            .pipe(switchMap(() => EMPTY));
    }
}
OccBackendNotification.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBackendNotification, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccBackendNotification.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBackendNotification });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBackendNotification, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWJhY2tlbmQtbm90aWZpY2F0aW9uLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvcHJvZmlsZXRhZy9hZGFwdGVycy9vY2MtYmFja2VuZC1ub3RpZmljYXRpb24tYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSTNDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDVSxJQUFnQixFQUNoQixZQUFpQztRQURqQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUN4QyxDQUFDO0lBQ0oscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQ0gsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxrQ0FBa0MsRUFDbkUsRUFBRSxDQUNIO2FBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7O21IQVpVLHNCQUFzQjt1SEFBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2RzQmFja2VuZE5vdGlmaWNhdGlvbkFkYXB0ZXIgfSBmcm9tICcuL2Nkcy1iYWNrZW5kLW5vdGlmaWNhdGlvbi1hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY0JhY2tlbmROb3RpZmljYXRpb24gaW1wbGVtZW50cyBDZHNCYWNrZW5kTm90aWZpY2F0aW9uQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZVxuICApIHt9XG4gIG5vdGlmeVN1Y2Nlc3NmdWxMb2dpbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdDx7fT4oXG4gICAgICAgIGAke3RoaXMub2NjRW5kcG9pbnRzLmdldEJhc2VVcmwoKX0vdXNlcnMvY3VycmVudC9sb2dpbm5vdGlmaWNhdGlvbmAsXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKCkgPT4gRU1QVFkpKTtcbiAgfVxufVxuIl19