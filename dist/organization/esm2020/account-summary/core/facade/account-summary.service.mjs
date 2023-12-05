/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors/account-summary.connector";
export class AccountSummaryService {
    constructor(routingService, userIdService, accountSummaryConnector) {
        this.routingService = routingService;
        this.userIdService = userIdService;
        this.accountSummaryConnector = accountSummaryConnector;
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.userIdService
            .takeUserId()
            .subscribe((userId) => (this.userId = userId)));
        this.subscriptions.add(this.getOrgUnitId().subscribe((orgUnitId) => (this.orgUnitId = orgUnitId)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    getAccountSummary(orgUnitId) {
        return this.accountSummaryConnector
            .getAccountSummary(this.userId, orgUnitId ?? this.orgUnitId)
            .pipe(shareReplay(1));
    }
    getDocumentList(params, orgUnitId) {
        return this.accountSummaryConnector
            .getDocumentList(this.userId, orgUnitId || this.orgUnitId, params)
            .pipe(shareReplay(1));
    }
    getDocumentAttachment(orgDocumentId, orgDocumentAttachmentId, orgUnitId) {
        return this.accountSummaryConnector
            .getDocumentAttachment(this.userId, orgUnitId || this.orgUnitId, orgDocumentId, orgDocumentAttachmentId)
            .pipe(shareReplay(1));
    }
    getOrgUnitId() {
        return this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params), distinctUntilChanged(), map((params) => params.orgUnit));
    }
}
AccountSummaryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryService, deps: [{ token: i1.RoutingService }, { token: i1.UserIdService }, { token: i2.AccountSummaryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.UserIdService }, { type: i2.AccountSummaryConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9jb3JlL2ZhY2FkZS9hY2NvdW50LXN1bW1hcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQVF0RCxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLeEUsTUFBTSxPQUFPLHFCQUFxQjtJQU1oQyxZQUNVLGNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLHVCQUFnRDtRQUZoRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQVJoRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFVM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxhQUFhO2FBQ2YsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FDakQsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FDM0UsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsU0FBa0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsdUJBQXVCO2FBQ2hDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxlQUFlLENBQ2IsTUFBMkIsRUFDM0IsU0FBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMsdUJBQXVCO2FBQ2hDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQzthQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELHFCQUFxQixDQUNuQixhQUFxQixFQUNyQix1QkFBK0IsRUFDL0IsU0FBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMsdUJBQXVCO2FBQ2hDLHFCQUFxQixDQUNwQixJQUFJLENBQUMsTUFBTSxFQUNYLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUMzQixhQUFhLEVBQ2IsdUJBQXVCLENBQ3hCO2FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyxZQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzlDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDOUMsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQ2hDLENBQUM7SUFDSixDQUFDOztrSEE3RFUscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSwgVXNlcklkU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBBY2NvdW50U3VtbWFyeURldGFpbHMsXG4gIEFjY291bnRTdW1tYXJ5RmFjYWRlLFxuICBBY2NvdW50U3VtbWFyeUxpc3QsXG4gIERvY3VtZW50UXVlcnlQYXJhbXMsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBY2NvdW50U3VtbWFyeUNvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMvYWNjb3VudC1zdW1tYXJ5LmNvbm5lY3Rvcic7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlTZXJ2aWNlIGltcGxlbWVudHMgQWNjb3VudFN1bW1hcnlGYWNhZGUsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIHVzZXJJZDogc3RyaW5nO1xuICBvcmdVbml0SWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcml2YXRlIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2NvdW50U3VtbWFyeUNvbm5lY3RvcjogQWNjb3VudFN1bW1hcnlDb25uZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICAudGFrZVVzZXJJZCgpXG4gICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4gKHRoaXMudXNlcklkID0gdXNlcklkKSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmdldE9yZ1VuaXRJZCgpLnN1YnNjcmliZSgob3JnVW5pdElkKSA9PiAodGhpcy5vcmdVbml0SWQgPSBvcmdVbml0SWQpKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdldEFjY291bnRTdW1tYXJ5KG9yZ1VuaXRJZD86IHN0cmluZyk6IE9ic2VydmFibGU8QWNjb3VudFN1bW1hcnlEZXRhaWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuYWNjb3VudFN1bW1hcnlDb25uZWN0b3JcbiAgICAgIC5nZXRBY2NvdW50U3VtbWFyeSh0aGlzLnVzZXJJZCwgb3JnVW5pdElkID8/IHRoaXMub3JnVW5pdElkKVxuICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICB9XG5cbiAgZ2V0RG9jdW1lbnRMaXN0KFxuICAgIHBhcmFtczogRG9jdW1lbnRRdWVyeVBhcmFtcyxcbiAgICBvcmdVbml0SWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxBY2NvdW50U3VtbWFyeUxpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5hY2NvdW50U3VtbWFyeUNvbm5lY3RvclxuICAgICAgLmdldERvY3VtZW50TGlzdCh0aGlzLnVzZXJJZCwgb3JnVW5pdElkIHx8IHRoaXMub3JnVW5pdElkLCBwYXJhbXMpXG4gICAgICAucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gIH1cblxuICBnZXREb2N1bWVudEF0dGFjaG1lbnQoXG4gICAgb3JnRG9jdW1lbnRJZDogc3RyaW5nLFxuICAgIG9yZ0RvY3VtZW50QXR0YWNobWVudElkOiBzdHJpbmcsXG4gICAgb3JnVW5pdElkPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8QmxvYj4ge1xuICAgIHJldHVybiB0aGlzLmFjY291bnRTdW1tYXJ5Q29ubmVjdG9yXG4gICAgICAuZ2V0RG9jdW1lbnRBdHRhY2htZW50KFxuICAgICAgICB0aGlzLnVzZXJJZCxcbiAgICAgICAgb3JnVW5pdElkIHx8IHRoaXMub3JnVW5pdElkLFxuICAgICAgICBvcmdEb2N1bWVudElkLFxuICAgICAgICBvcmdEb2N1bWVudEF0dGFjaG1lbnRJZFxuICAgICAgKVxuICAgICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldE9yZ1VuaXRJZCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFJvdXRlclN0YXRlKCkucGlwZShcbiAgICAgIG1hcCgocm91dGluZ0RhdGEpID0+IHJvdXRpbmdEYXRhLnN0YXRlLnBhcmFtcyksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgbWFwKChwYXJhbXMpID0+IHBhcmFtcy5vcmdVbml0KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==