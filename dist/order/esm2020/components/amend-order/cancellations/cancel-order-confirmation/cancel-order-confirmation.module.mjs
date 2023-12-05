/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard, provideDefaultConfig } from '@spartacus/core';
import { AmendOrderActionsModule } from '../../amend-order-actions/amend-order-actions.module';
import { AmendOrderItemsModule } from '../../amend-order-items/amend-order-items.module';
import { OrderAmendService } from '../../amend-order.service';
import { OrderCancellationGuard } from '../order-cancellation.guard';
import { OrderCancellationService } from '../order-cancellation.service';
import { CancelOrderConfirmationComponent } from './cancel-order-confirmation.component';
import * as i0 from "@angular/core";
export class CancelOrderConfirmationModule {
}
CancelOrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CancelOrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, declarations: [CancelOrderConfirmationComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule], exports: [CancelOrderConfirmationComponent] });
CancelOrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CancelOrderConfirmationComponent: {
                    component: CancelOrderConfirmationComponent,
                    guards: [AuthGuard, OrderCancellationGuard],
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
        ReactiveFormsModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CancelOrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CancelOrderConfirmationComponent: {
                                    component: CancelOrderConfirmationComponent,
                                    guards: [AuthGuard, OrderCancellationGuard],
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
                    declarations: [CancelOrderConfirmationComponent],
                    exports: [CancelOrderConfirmationComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLW9yZGVyLWNvbmZpcm1hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9hbWVuZC1vcmRlci9jYW5jZWxsYXRpb25zL2NhbmNlbC1vcmRlci1jb25maXJtYXRpb24vY2FuY2VsLW9yZGVyLWNvbmZpcm1hdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUE0QnpGLE1BQU0sT0FBTyw2QkFBNkI7OzBIQUE3Qiw2QkFBNkI7MkhBQTdCLDZCQUE2QixpQkFIekIsZ0NBQWdDLGFBckI3QyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQix1QkFBdUIsYUFtQmYsZ0NBQWdDOzJIQUUvQiw2QkFBNkIsYUFuQjdCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGdDQUFnQyxFQUFFO29CQUNoQyxTQUFTLEVBQUUsZ0NBQWdDO29CQUMzQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsc0JBQXNCLENBQUM7b0JBQzNDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsd0JBQXdCO3lCQUN0QztxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBcEJDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLHVCQUF1QjsyRkFxQmQsNkJBQTZCO2tCQTFCekMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsdUJBQXVCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixnQ0FBZ0MsRUFBRTtvQ0FDaEMsU0FBUyxFQUFFLGdDQUFnQztvQ0FDM0MsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDO29DQUMzQyxTQUFTLEVBQUU7d0NBQ1Q7NENBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0Q0FDMUIsV0FBVyxFQUFFLHdCQUF3Qjt5Q0FDdEM7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztvQkFDaEQsT0FBTyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7aUJBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXV0aEd1YXJkLCBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEFtZW5kT3JkZXJBY3Rpb25zTW9kdWxlIH0gZnJvbSAnLi4vLi4vYW1lbmQtb3JkZXItYWN0aW9ucy9hbWVuZC1vcmRlci1hY3Rpb25zLm1vZHVsZSc7XG5pbXBvcnQgeyBBbWVuZE9yZGVySXRlbXNNb2R1bGUgfSBmcm9tICcuLi8uLi9hbWVuZC1vcmRlci1pdGVtcy9hbWVuZC1vcmRlci1pdGVtcy5tb2R1bGUnO1xuaW1wb3J0IHsgT3JkZXJBbWVuZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hbWVuZC1vcmRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyQ2FuY2VsbGF0aW9uR3VhcmQgfSBmcm9tICcuLi9vcmRlci1jYW5jZWxsYXRpb24uZ3VhcmQnO1xuaW1wb3J0IHsgT3JkZXJDYW5jZWxsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vb3JkZXItY2FuY2VsbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FuY2VsT3JkZXJDb25maXJtYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NhbmNlbC1vcmRlci1jb25maXJtYXRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEFtZW5kT3JkZXJJdGVtc01vZHVsZSxcbiAgICBBbWVuZE9yZGVyQWN0aW9uc01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENhbmNlbE9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDYW5jZWxPcmRlckNvbmZpcm1hdGlvbkNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIE9yZGVyQ2FuY2VsbGF0aW9uR3VhcmRdLFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckFtZW5kU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyQ2FuY2VsbGF0aW9uU2VydmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NhbmNlbE9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NhbmNlbE9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FuY2VsT3JkZXJDb25maXJtYXRpb25Nb2R1bGUge31cbiJdfQ==