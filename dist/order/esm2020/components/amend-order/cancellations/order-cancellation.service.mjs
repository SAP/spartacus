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
export class OrderCancellationService extends OrderAmendService {
    constructor(orderDetailsService, orderHistoryFacade, routing, globalMessageService) {
        super(orderDetailsService);
        this.orderDetailsService = orderDetailsService;
        this.orderHistoryFacade = orderHistoryFacade;
        this.routing = routing;
        this.globalMessageService = globalMessageService;
        this.amendType = AmendOrderType.CANCEL;
    }
    /**
     * Return cancellable order entries.
     */
    getEntries() {
        return this.getOrder().pipe(filter((order) => !!order?.entries), map((order) => order.entries?.filter((entry) => entry.entryNumber !== -1 &&
            entry.cancellableQuantity &&
            entry.cancellableQuantity > 0) ?? []));
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
        this.orderHistoryFacade.cancelOrder(orderCode, {
            cancellationRequestEntryInputs: inputs,
        });
        this.orderHistoryFacade
            .getCancelOrderSuccess()
            .pipe(first(Boolean))
            .subscribe(() => this.afterSave(orderCode));
    }
    afterSave(orderCode) {
        this.orderHistoryFacade.resetCancelOrderProcessState();
        this.globalMessageService.add({
            key: 'orderDetails.cancellationAndReturn.cancelSuccess',
            params: { orderCode },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.routing.go({
            cxRoute: 'orders',
        });
    }
}
OrderCancellationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationService, deps: [{ token: i1.OrderDetailsService }, { token: i2.OrderHistoryFacade }, { token: i3.RoutingService }, { token: i3.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderCancellationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCancellationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }, { type: i2.OrderHistoryFacade }, { type: i3.RoutingService }, { type: i3.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FuY2VsbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9hbWVuZC1vcmRlci9jYW5jZWxsYXRpb25zL29yZGVyLWNhbmNlbGxhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQztBQU16QixPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBSzNELE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxpQkFBaUI7SUFHN0QsWUFDWSxtQkFBd0MsRUFDeEMsa0JBQXNDLEVBQ3RDLE9BQXVCLEVBQ3ZCLG9CQUEwQztRQUVwRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUxqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU50RCxjQUFTLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQVNsQyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUN6QixNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQ25DLEdBQUcsQ0FDRCxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ1IsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQ25CLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDUixLQUFLLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsbUJBQW1CO1lBQ3pCLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQ2hDLElBQUksRUFBRSxDQUNWLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBc0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDbkUsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBUyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pELEdBQUcsQ0FDRixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQ2QsQ0FBQztZQUNDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDckMsUUFBUSxFQUFVLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDSCxDQUFBLENBQ3hDLENBQUM7UUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQzdDLDhCQUE4QixFQUFFLE1BQU07U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixxQkFBcUIsRUFBRTthQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLFNBQVMsQ0FBQyxTQUFpQjtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQjtZQUNFLEdBQUcsRUFBRSxrREFBa0Q7WUFDdkQsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFO1NBQ3RCLEVBQ0QsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNkLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7O3FIQWxFVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckVudHJ5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFJvdXRpbmdTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuY2VsT3JSZXR1cm5SZXF1ZXN0RW50cnlJbnB1dCxcbiAgT3JkZXJIaXN0b3J5RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uLy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5zZXJ2aWNlJztcbmltcG9ydCB7IEFtZW5kT3JkZXJUeXBlIH0gZnJvbSAnLi4vYW1lbmQtb3JkZXIubW9kZWwnO1xuaW1wb3J0IHsgT3JkZXJBbWVuZFNlcnZpY2UgfSBmcm9tICcuLi9hbWVuZC1vcmRlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ2FuY2VsbGF0aW9uU2VydmljZSBleHRlbmRzIE9yZGVyQW1lbmRTZXJ2aWNlIHtcbiAgYW1lbmRUeXBlID0gQW1lbmRPcmRlclR5cGUuQ0FOQ0VMO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvcmRlckRldGFpbHNTZXJ2aWNlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmRlckhpc3RvcnlGYWNhZGU6IE9yZGVySGlzdG9yeUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZzogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihvcmRlckRldGFpbHNTZXJ2aWNlKTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJuIGNhbmNlbGxhYmxlIG9yZGVyIGVudHJpZXMuXG4gICAqL1xuICBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3JkZXIoKS5waXBlKFxuICAgICAgZmlsdGVyKChvcmRlcikgPT4gISFvcmRlcj8uZW50cmllcyksXG4gICAgICBtYXAoXG4gICAgICAgIChvcmRlcikgPT5cbiAgICAgICAgICBvcmRlci5lbnRyaWVzPy5maWx0ZXIoXG4gICAgICAgICAgICAoZW50cnkpID0+XG4gICAgICAgICAgICAgIGVudHJ5LmVudHJ5TnVtYmVyICE9PSAtMSAmJlxuICAgICAgICAgICAgICBlbnRyeS5jYW5jZWxsYWJsZVF1YW50aXR5ICYmXG4gICAgICAgICAgICAgIGVudHJ5LmNhbmNlbGxhYmxlUXVhbnRpdHkgPiAwXG4gICAgICAgICAgKSA/PyBbXVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBzYXZlKCk6IHZvaWQge1xuICAgIGNvbnN0IG9yZGVyQ29kZSA9IHRoaXMuZm9ybS52YWx1ZS5vcmRlckNvZGU7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZm9ybS52YWx1ZS5lbnRyaWVzO1xuICAgIGNvbnN0IGlucHV0czogQ2FuY2VsT3JSZXR1cm5SZXF1ZXN0RW50cnlJbnB1dFtdID0gT2JqZWN0LmtleXMoZW50cmllcylcbiAgICAgIC5maWx0ZXIoKGVudHJ5TnVtYmVyKSA9PiA8bnVtYmVyPmVudHJpZXNbZW50cnlOdW1iZXJdID4gMClcbiAgICAgIC5tYXAoXG4gICAgICAgIChlbnRyeU51bWJlcikgPT5cbiAgICAgICAgICAoe1xuICAgICAgICAgICAgb3JkZXJFbnRyeU51bWJlcjogTnVtYmVyKGVudHJ5TnVtYmVyKSxcbiAgICAgICAgICAgIHF1YW50aXR5OiA8bnVtYmVyPmVudHJpZXNbZW50cnlOdW1iZXJdLFxuICAgICAgICAgIH0gYXMgQ2FuY2VsT3JSZXR1cm5SZXF1ZXN0RW50cnlJbnB1dClcbiAgICAgICk7XG5cbiAgICB0aGlzLmZvcm0ucmVzZXQoKTtcblxuICAgIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlLmNhbmNlbE9yZGVyKG9yZGVyQ29kZSwge1xuICAgICAgY2FuY2VsbGF0aW9uUmVxdWVzdEVudHJ5SW5wdXRzOiBpbnB1dHMsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9yZGVySGlzdG9yeUZhY2FkZVxuICAgICAgLmdldENhbmNlbE9yZGVyU3VjY2VzcygpXG4gICAgICAucGlwZShmaXJzdChCb29sZWFuKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hZnRlclNhdmUob3JkZXJDb2RlKSk7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyU2F2ZShvcmRlckNvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlLnJlc2V0Q2FuY2VsT3JkZXJQcm9jZXNzU3RhdGUoKTtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHtcbiAgICAgICAga2V5OiAnb3JkZXJEZXRhaWxzLmNhbmNlbGxhdGlvbkFuZFJldHVybi5jYW5jZWxTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1zOiB7IG9yZGVyQ29kZSB9LFxuICAgICAgfSxcbiAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICk7XG4gICAgdGhpcy5yb3V0aW5nLmdvKHtcbiAgICAgIGN4Um91dGU6ICdvcmRlcnMnLFxuICAgIH0pO1xuICB9XG59XG4iXX0=