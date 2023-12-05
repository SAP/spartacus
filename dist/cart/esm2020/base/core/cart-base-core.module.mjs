/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartConnector } from './connectors/cart/cart.connector';
import { CartEntryConnector } from './connectors/entry/cart-entry.connector';
import { CartValidationConnector } from './connectors/validation/cart-validation.connector';
import { CartVoucherConnector } from './connectors/voucher/cart-voucher.connector';
import { CartEventModule } from './event/cart-event.module';
import { CartPageEventModule } from './event/cart-page-event.module';
import { facadeProviders } from './facade/facade-providers';
import { BadCartRequestHandler } from './http-interceptors/handlers/bad-cart-request.handler';
import { BadVoucherRequestHandler } from './http-interceptors/handlers/bad-voucher-request.handler';
import { MultiCartStoreModule } from './store/multi-cart-store.module';
import * as i0 from "@angular/core";
export class CartBaseCoreModule {
}
CartBaseCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, imports: [CartEventModule,
        MultiCartStoreModule,
        CartPersistenceModule,
        CartPageEventModule] });
CartBaseCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, providers: [
        CartConnector,
        CartEntryConnector,
        CartVoucherConnector,
        CartValidationConnector,
        ...facadeProviders,
        {
            provide: HttpErrorHandler,
            useExisting: BadCartRequestHandler,
            multi: true,
        },
        {
            provide: HttpErrorHandler,
            useExisting: BadVoucherRequestHandler,
            multi: true,
        },
    ], imports: [CartEventModule,
        MultiCartStoreModule,
        CartPersistenceModule,
        CartPageEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CartEventModule,
                        MultiCartStoreModule,
                        CartPersistenceModule,
                        CartPageEventModule,
                    ],
                    providers: [
                        CartConnector,
                        CartEntryConnector,
                        CartVoucherConnector,
                        CartValidationConnector,
                        ...facadeProviders,
                        {
                            provide: HttpErrorHandler,
                            useExisting: BadCartRequestHandler,
                            multi: true,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: BadVoucherRequestHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1iYXNlLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL2NhcnQtYmFzZS1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUEyQnZFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixZQXZCM0IsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsbUJBQW1CO2dIQW9CVixrQkFBa0IsYUFsQmxCO1FBQ1QsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixvQkFBb0I7UUFDcEIsdUJBQXVCO1FBQ3ZCLEdBQUcsZUFBZTtRQUNsQjtZQUNFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBckJDLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLG1CQUFtQjsyRkFvQlYsa0JBQWtCO2tCQXpCOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3dCQUN2QixHQUFHLGVBQWU7d0JBQ2xCOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSxxQkFBcUI7NEJBQ2xDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSx3QkFBd0I7NEJBQ3JDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2FydFBlcnNpc3RlbmNlTW9kdWxlIH0gZnJvbSAnLi9jYXJ0LXBlcnNpc3RlbmNlLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJ0Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2NhcnQvY2FydC5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ2FydEVudHJ5Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2VudHJ5L2NhcnQtZW50cnkuY29ubmVjdG9yJztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL3ZhbGlkYXRpb24vY2FydC12YWxpZGF0aW9uLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBDYXJ0Vm91Y2hlckNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy92b3VjaGVyL2NhcnQtdm91Y2hlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ2FydEV2ZW50TW9kdWxlIH0gZnJvbSAnLi9ldmVudC9jYXJ0LWV2ZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJ0UGFnZUV2ZW50TW9kdWxlIH0gZnJvbSAnLi9ldmVudC9jYXJ0LXBhZ2UtZXZlbnQubW9kdWxlJztcbmltcG9ydCB7IGZhY2FkZVByb3ZpZGVycyB9IGZyb20gJy4vZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgQmFkQ2FydFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnLi9odHRwLWludGVyY2VwdG9ycy9oYW5kbGVycy9iYWQtY2FydC1yZXF1ZXN0LmhhbmRsZXInO1xuaW1wb3J0IHsgQmFkVm91Y2hlclJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnLi9odHRwLWludGVyY2VwdG9ycy9oYW5kbGVycy9iYWQtdm91Y2hlci1yZXF1ZXN0LmhhbmRsZXInO1xuaW1wb3J0IHsgTXVsdGlDYXJ0U3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL211bHRpLWNhcnQtc3RvcmUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENhcnRFdmVudE1vZHVsZSxcbiAgICBNdWx0aUNhcnRTdG9yZU1vZHVsZSxcbiAgICBDYXJ0UGVyc2lzdGVuY2VNb2R1bGUsXG4gICAgQ2FydFBhZ2VFdmVudE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ2FydENvbm5lY3RvcixcbiAgICBDYXJ0RW50cnlDb25uZWN0b3IsXG4gICAgQ2FydFZvdWNoZXJDb25uZWN0b3IsXG4gICAgQ2FydFZhbGlkYXRpb25Db25uZWN0b3IsXG4gICAgLi4uZmFjYWRlUHJvdmlkZXJzLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEh0dHBFcnJvckhhbmRsZXIsXG4gICAgICB1c2VFeGlzdGluZzogQmFkQ2FydFJlcXVlc3RIYW5kbGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBIdHRwRXJyb3JIYW5kbGVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IEJhZFZvdWNoZXJSZXF1ZXN0SGFuZGxlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhcnRCYXNlQ29yZU1vZHVsZSB7fVxuIl19