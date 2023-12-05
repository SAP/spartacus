/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, provideDefaultConfig, I18nModule, } from '@spartacus/core';
import { FormErrorsModule, MessageComponentModule, } from '@spartacus/storefront';
import { AmendOrderActionsModule } from '../../amend-order-actions/amend-order-actions.module';
import { AmendOrderItemsModule } from '../../amend-order-items/amend-order-items.module';
import { OrderAmendService } from '../../amend-order.service';
import { OrderCancellationService } from '../order-cancellation.service';
import { CancelOrderComponent } from './cancel-order.component';
import * as i0 from "@angular/core";
export class CancelOrderModule {
}
CancelOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CancelOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, declarations: [CancelOrderComponent], imports: [CommonModule,
        I18nModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule,
        MessageComponentModule], exports: [CancelOrderComponent] });
CancelOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CancelOrderComponent: {
                    component: CancelOrderComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderCancellationService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule,
        MessageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                        FormErrorsModule,
                        MessageComponentModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CancelOrderComponent: {
                                    component: CancelOrderComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderCancellationService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [CancelOrderComponent],
                    exports: [CancelOrderComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLW9yZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL2FtZW5kLW9yZGVyL2NhbmNlbGxhdGlvbnMvY2FuY2VsLW9yZGVyL2NhbmNlbC1vcmRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxTQUFTLEVBRVQsb0JBQW9CLEVBQ3BCLFVBQVUsR0FDWCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsc0JBQXNCLEdBQ3ZCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDL0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDekYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBOEJoRSxNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsaUJBSGIsb0JBQW9CLGFBdkJqQyxZQUFZO1FBQ1osVUFBVTtRQUNWLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsZ0JBQWdCO1FBQ2hCLHNCQUFzQixhQW1CZCxvQkFBb0I7K0dBRW5CLGlCQUFpQixhQW5CakI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isb0JBQW9CLEVBQUU7b0JBQ3BCLFNBQVMsRUFBRSxvQkFBb0I7b0JBQy9CLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDbkIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSx3QkFBd0I7eUJBQ3RDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUF0QkMsWUFBWTtRQUNaLFVBQVU7UUFDVixxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQixzQkFBc0I7MkZBcUJiLGlCQUFpQjtrQkE1QjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixxQkFBcUI7d0JBQ3JCLHVCQUF1Qjt3QkFDdkIsZ0JBQWdCO3dCQUNoQixzQkFBc0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLG9CQUFvQixFQUFFO29DQUNwQixTQUFTLEVBQUUsb0JBQW9CO29DQUMvQixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0NBQ25CLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsaUJBQWlCOzRDQUMxQixXQUFXLEVBQUUsd0JBQXdCO3lDQUN0QztxQ0FDRjtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIE1lc3NhZ2VDb21wb25lbnRNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBBbWVuZE9yZGVyQWN0aW9uc01vZHVsZSB9IGZyb20gJy4uLy4uL2FtZW5kLW9yZGVyLWFjdGlvbnMvYW1lbmQtb3JkZXItYWN0aW9ucy5tb2R1bGUnO1xuaW1wb3J0IHsgQW1lbmRPcmRlckl0ZW1zTW9kdWxlIH0gZnJvbSAnLi4vLi4vYW1lbmQtb3JkZXItaXRlbXMvYW1lbmQtb3JkZXItaXRlbXMubW9kdWxlJztcbmltcG9ydCB7IE9yZGVyQW1lbmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYW1lbmQtb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlckNhbmNlbGxhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9vcmRlci1jYW5jZWxsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDYW5jZWxPcmRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FuY2VsLW9yZGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBBbWVuZE9yZGVySXRlbXNNb2R1bGUsXG4gICAgQW1lbmRPcmRlckFjdGlvbnNNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBNZXNzYWdlQ29tcG9uZW50TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2FuY2VsT3JkZXJDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENhbmNlbE9yZGVyQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyQW1lbmRTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogT3JkZXJDYW5jZWxsYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2FuY2VsT3JkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2FuY2VsT3JkZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDYW5jZWxPcmRlck1vZHVsZSB7fVxuIl19