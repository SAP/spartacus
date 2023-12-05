/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { PDFInvoicesConnector } from '../connectors/pdf-invoices.connector';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors/pdf-invoices.connector";
export class PDFInvoicesService {
    constructor(routingService, userIdService, pdfInvoicesConnector) {
        this.routingService = routingService;
        this.userIdService = userIdService;
        this.pdfInvoicesConnector = pdfInvoicesConnector;
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.userIdService
            .takeUserId()
            .subscribe((userId) => (this.userId = userId)));
        this.subscriptions.add(this.getOrderId().subscribe((orderId) => (this.orderId = orderId)));
    }
    getInvoicesForOrder(queryParams, userId, orderId) {
        return this.pdfInvoicesConnector
            .getInvoicesForOrder(userId || this.userId, orderId || this.orderId, queryParams)
            .pipe(shareReplay(1));
    }
    getInvoicePDF(invoiceId, externalSystemId, userId, orderId) {
        return this.pdfInvoicesConnector
            .getInvoicePDF(userId || this.userId, orderId || this.orderId, invoiceId, externalSystemId)
            .pipe(shareReplay(1));
    }
    getOrderId() {
        return this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params), distinctUntilChanged(), map((params) => params.orderCode));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
PDFInvoicesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesService, deps: [{ token: i1.RoutingService }, { token: i1.UserIdService }, { token: i2.PDFInvoicesConnector }], target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.UserIdService }, { type: i2.PDFInvoicesConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGRmLWludm9pY2VzL2NvcmUvc2VydmljZXMvcGRmLWludm9pY2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU1oRSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFHNUUsTUFBTSxPQUFPLGtCQUFrQjtJQU03QixZQUNVLGNBQThCLEVBQzlCLGFBQTRCLEVBQzFCLG9CQUEwQztRQUY1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDMUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVI1QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFVM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxhQUFhO2FBQ2YsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FDakQsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FDbkUsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsV0FBK0IsRUFDL0IsTUFBZSxFQUNmLE9BQWdCO1FBRWhCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQjthQUM3QixtQkFBbUIsQ0FDbEIsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQ3JCLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUN2QixXQUFXLENBQ1o7YUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWEsQ0FDWCxTQUFpQixFQUNqQixnQkFBeUIsRUFDekIsTUFBZSxFQUNmLE9BQWdCO1FBRWhCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQjthQUM3QixhQUFhLENBQ1osTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQ3JCLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUN2QixTQUFTLEVBQ1QsZ0JBQWdCLENBQ2pCO2FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyxVQUFVO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzlDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDOUMsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQ2xDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7K0dBN0RVLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlLCBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEludm9pY2VRdWVyeVBhcmFtcyxcbiAgT3JkZXJJbnZvaWNlTGlzdCxcbiAgUERGSW52b2ljZXNGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBERkludm9pY2VzQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy9wZGYtaW52b2ljZXMuY29ubmVjdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBERkludm9pY2VzU2VydmljZSBpbXBsZW1lbnRzIFBERkludm9pY2VzRmFjYWRlLCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICB1c2VySWQ6IHN0cmluZztcbiAgb3JkZXJJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcGRmSW52b2ljZXNDb25uZWN0b3I6IFBERkludm9pY2VzQ29ubmVjdG9yXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgLnRha2VVc2VySWQoKVxuICAgICAgICAuc3Vic2NyaWJlKCh1c2VySWQpID0+ICh0aGlzLnVzZXJJZCA9IHVzZXJJZCkpXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5nZXRPcmRlcklkKCkuc3Vic2NyaWJlKChvcmRlcklkKSA9PiAodGhpcy5vcmRlcklkID0gb3JkZXJJZCkpXG4gICAgKTtcbiAgfVxuXG4gIGdldEludm9pY2VzRm9yT3JkZXIoXG4gICAgcXVlcnlQYXJhbXM6IEludm9pY2VRdWVyeVBhcmFtcyxcbiAgICB1c2VySWQ/OiBzdHJpbmcsXG4gICAgb3JkZXJJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZGVySW52b2ljZUxpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5wZGZJbnZvaWNlc0Nvbm5lY3RvclxuICAgICAgLmdldEludm9pY2VzRm9yT3JkZXIoXG4gICAgICAgIHVzZXJJZCB8fCB0aGlzLnVzZXJJZCxcbiAgICAgICAgb3JkZXJJZCB8fCB0aGlzLm9yZGVySWQsXG4gICAgICAgIHF1ZXJ5UGFyYW1zXG4gICAgICApXG4gICAgICAucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gIH1cblxuICBnZXRJbnZvaWNlUERGKFxuICAgIGludm9pY2VJZDogc3RyaW5nLFxuICAgIGV4dGVybmFsU3lzdGVtSWQ/OiBzdHJpbmcsXG4gICAgdXNlcklkPzogc3RyaW5nLFxuICAgIG9yZGVySWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxCbG9iPiB7XG4gICAgcmV0dXJuIHRoaXMucGRmSW52b2ljZXNDb25uZWN0b3JcbiAgICAgIC5nZXRJbnZvaWNlUERGKFxuICAgICAgICB1c2VySWQgfHwgdGhpcy51c2VySWQsXG4gICAgICAgIG9yZGVySWQgfHwgdGhpcy5vcmRlcklkLFxuICAgICAgICBpbnZvaWNlSWQsXG4gICAgICAgIGV4dGVybmFsU3lzdGVtSWRcbiAgICAgIClcbiAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRPcmRlcklkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0Um91dGVyU3RhdGUoKS5waXBlKFxuICAgICAgbWFwKChyb3V0aW5nRGF0YSkgPT4gcm91dGluZ0RhdGEuc3RhdGUucGFyYW1zKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBtYXAoKHBhcmFtcykgPT4gcGFyYW1zLm9yZGVyQ29kZSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==