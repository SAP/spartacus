/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { filter, first, map } from 'rxjs/operators';
import { AmendOrderType } from '../amend-order.model';
import { OrderAmendService } from '../amend-order.service';
import * as i0 from "@angular/core";
import * as i1 from "../../order-details/order-details.service";
import * as i2 from "@spartacus/order/root";
import * as i3 from "@spartacus/core";
export class OrderReturnService extends OrderAmendService {
    constructor(orderDetailsService, returnRequestService, routing, globalMessageService) {
        super(orderDetailsService);
        this.orderDetailsService = orderDetailsService;
        this.returnRequestService = returnRequestService;
        this.routing = routing;
        this.globalMessageService = globalMessageService;
        this.amendType = AmendOrderType.RETURN;
    }
    getEntries() {
        return this.getOrder().pipe(filter((order) => !!order.entries), map((order) => order.entries?.filter((entry) => entry.entryNumber !== -1 &&
            entry.returnableQuantity &&
            entry.returnableQuantity > 0) ?? []));
    }
    save() {
        const orderCode = this.form.value.orderCode;
        const entries = this.form.value.entries;
        const inputs = Object.keys(entries)
            .filter((entryNumber) => entries[entryNumber] > 0)
            .map((entryNumber) => ({
            orderEntryNumber: Number(entryNumber),
            quantity: entries[entryNumber],
        }));
        this.form.reset();
        this.returnRequestService.createOrderReturnRequest({
            orderCode,
            returnRequestEntryInputs: inputs,
        });
        this.returnRequestService
            .getReturnRequestSuccess()
            .pipe(first(Boolean))
            .subscribe(() => this.afterSave());
    }
    afterSave() {
        this.returnRequestService
            .getOrderReturnRequest()
            .pipe(first((r) => !!r))
            .subscribe((returnRequest) => {
            const rma = returnRequest.rma;
            this.globalMessageService.add({
                key: 'orderDetails.cancellationAndReturn.returnSuccess',
                params: { rma },
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.routing.go({
                cxRoute: 'returnRequestDetails',
                params: { rma },
            });
        });
    }
}
OrderReturnService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnService, deps: [{ token: i1.OrderDetailsService }, { token: i2.OrderReturnRequestFacade }, { token: i3.RoutingService }, { token: i3.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }, { type: i2.OrderReturnRequestFacade }, { type: i3.RoutingService }, { type: i3.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmV0dXJuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9hbWVuZC1vcmRlci9yZXR1cm5zL29yZGVyLXJldHVybi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQztBQU16QixPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBSzNELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxpQkFBaUI7SUFHdkQsWUFDWSxtQkFBd0MsRUFDeEMsb0JBQThDLEVBQzlDLE9BQXVCLEVBQ3ZCLG9CQUEwQztRQUVwRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUxqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBMEI7UUFDOUMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU50RCxjQUFTLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQVNsQyxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FDekIsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNsQyxHQUFHLENBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNSLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUNuQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQ1IsS0FBSyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUM7WUFDeEIsS0FBSyxDQUFDLGtCQUFrQjtZQUN4QixLQUFLLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUMvQixJQUFJLEVBQUUsQ0FDVixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUM1QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQXNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ25FLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQVMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6RCxHQUFHLENBQ0YsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUNkLENBQUM7WUFDQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3JDLFFBQVEsRUFBVSxPQUFPLENBQUMsV0FBVyxDQUFDO1NBQ0gsQ0FBQSxDQUN4QyxDQUFDO1FBRUosSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUM7WUFDakQsU0FBUztZQUNULHdCQUF3QixFQUFFLE1BQU07U0FDakMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG9CQUFvQjthQUN0Qix1QkFBdUIsRUFBRTthQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxvQkFBb0I7YUFDdEIscUJBQXFCLEVBQUU7YUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQzNCLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7Z0JBQ0UsR0FBRyxFQUFFLGtEQUFrRDtnQkFDdkQsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFO2FBQ2hCLEVBQ0QsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDZCxPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzsrR0F2RVUsa0JBQWtCO21IQUFsQixrQkFBa0IsY0FGakIsTUFBTTsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJFbnRyeSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhbmNlbE9yUmV0dXJuUmVxdWVzdEVudHJ5SW5wdXQsXG4gIE9yZGVyUmV0dXJuUmVxdWVzdEZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBBbWVuZE9yZGVyVHlwZSB9IGZyb20gJy4uL2FtZW5kLW9yZGVyLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyQW1lbmRTZXJ2aWNlIH0gZnJvbSAnLi4vYW1lbmQtb3JkZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclJldHVyblNlcnZpY2UgZXh0ZW5kcyBPcmRlckFtZW5kU2VydmljZSB7XG4gIGFtZW5kVHlwZSA9IEFtZW5kT3JkZXJUeXBlLlJFVFVSTjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3JkZXJEZXRhaWxzU2VydmljZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcmV0dXJuUmVxdWVzdFNlcnZpY2U6IE9yZGVyUmV0dXJuUmVxdWVzdEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZzogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihvcmRlckRldGFpbHNTZXJ2aWNlKTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcmRlcigpLnBpcGUoXG4gICAgICBmaWx0ZXIoKG9yZGVyKSA9PiAhIW9yZGVyLmVudHJpZXMpLFxuICAgICAgbWFwKFxuICAgICAgICAob3JkZXIpID0+XG4gICAgICAgICAgb3JkZXIuZW50cmllcz8uZmlsdGVyKFxuICAgICAgICAgICAgKGVudHJ5KSA9PlxuICAgICAgICAgICAgICBlbnRyeS5lbnRyeU51bWJlciAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgZW50cnkucmV0dXJuYWJsZVF1YW50aXR5ICYmXG4gICAgICAgICAgICAgIGVudHJ5LnJldHVybmFibGVRdWFudGl0eSA+IDBcbiAgICAgICAgICApID8/IFtdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgY29uc3Qgb3JkZXJDb2RlID0gdGhpcy5mb3JtLnZhbHVlLm9yZGVyQ29kZTtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5mb3JtLnZhbHVlLmVudHJpZXM7XG4gICAgY29uc3QgaW5wdXRzOiBDYW5jZWxPclJldHVyblJlcXVlc3RFbnRyeUlucHV0W10gPSBPYmplY3Qua2V5cyhlbnRyaWVzKVxuICAgICAgLmZpbHRlcigoZW50cnlOdW1iZXIpID0+IDxudW1iZXI+ZW50cmllc1tlbnRyeU51bWJlcl0gPiAwKVxuICAgICAgLm1hcChcbiAgICAgICAgKGVudHJ5TnVtYmVyKSA9PlxuICAgICAgICAgICh7XG4gICAgICAgICAgICBvcmRlckVudHJ5TnVtYmVyOiBOdW1iZXIoZW50cnlOdW1iZXIpLFxuICAgICAgICAgICAgcXVhbnRpdHk6IDxudW1iZXI+ZW50cmllc1tlbnRyeU51bWJlcl0sXG4gICAgICAgICAgfSBhcyBDYW5jZWxPclJldHVyblJlcXVlc3RFbnRyeUlucHV0KVxuICAgICAgKTtcblxuICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuXG4gICAgdGhpcy5yZXR1cm5SZXF1ZXN0U2VydmljZS5jcmVhdGVPcmRlclJldHVyblJlcXVlc3Qoe1xuICAgICAgb3JkZXJDb2RlLFxuICAgICAgcmV0dXJuUmVxdWVzdEVudHJ5SW5wdXRzOiBpbnB1dHMsXG4gICAgfSk7XG5cbiAgICB0aGlzLnJldHVyblJlcXVlc3RTZXJ2aWNlXG4gICAgICAuZ2V0UmV0dXJuUmVxdWVzdFN1Y2Nlc3MoKVxuICAgICAgLnBpcGUoZmlyc3QoQm9vbGVhbikpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWZ0ZXJTYXZlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlclNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5yZXR1cm5SZXF1ZXN0U2VydmljZVxuICAgICAgLmdldE9yZGVyUmV0dXJuUmVxdWVzdCgpXG4gICAgICAucGlwZShmaXJzdCgocikgPT4gISFyKSlcbiAgICAgIC5zdWJzY3JpYmUoKHJldHVyblJlcXVlc3QpID0+IHtcbiAgICAgICAgY29uc3Qgcm1hID0gcmV0dXJuUmVxdWVzdC5ybWE7XG4gICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGtleTogJ29yZGVyRGV0YWlscy5jYW5jZWxsYXRpb25BbmRSZXR1cm4ucmV0dXJuU3VjY2VzcycsXG4gICAgICAgICAgICBwYXJhbXM6IHsgcm1hIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yb3V0aW5nLmdvKHtcbiAgICAgICAgICBjeFJvdXRlOiAncmV0dXJuUmVxdWVzdERldGFpbHMnLFxuICAgICAgICAgIHBhcmFtczogeyBybWEgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19