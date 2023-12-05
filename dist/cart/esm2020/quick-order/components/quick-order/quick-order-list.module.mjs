/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { AtMessageModule, FormErrorsModule, IconModule, ItemCounterModule, MediaModule, MessageComponentModule, ProgressButtonModule, } from '@spartacus/storefront';
import { QuickOrderComponent } from './quick-order.component';
import { QuickOrderFormComponent } from './form/quick-order-form.component';
import { QuickOrderItemComponent } from './table/item/quick-order-item.component';
import { QuickOrderTableComponent } from './table/quick-order-table.component';
import * as i0 from "@angular/core";
export class QuickOrderListModule {
}
QuickOrderListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, declarations: [QuickOrderComponent,
        QuickOrderFormComponent,
        QuickOrderItemComponent,
        QuickOrderTableComponent], imports: [AtMessageModule,
        CommonModule,
        FormErrorsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        MessageComponentModule,
        ProgressButtonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule], exports: [QuickOrderComponent,
        QuickOrderFormComponent,
        QuickOrderItemComponent,
        QuickOrderTableComponent] });
QuickOrderListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                QuickOrderComponent: {
                    component: QuickOrderComponent,
                    data: {
                        quickOrderListLimit: 10,
                    },
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        FormErrorsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        MessageComponentModule,
        ProgressButtonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        FormErrorsModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        MediaModule,
                        MessageComponentModule,
                        ProgressButtonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                QuickOrderComponent: {
                                    component: QuickOrderComponent,
                                    data: {
                                        quickOrderListLimit: 10,
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [
                        QuickOrderComponent,
                        QuickOrderFormComponent,
                        QuickOrderItemComponent,
                        QuickOrderTableComponent,
                    ],
                    exports: [
                        QuickOrderComponent,
                        QuickOrderFormComponent,
                        QuickOrderItemComponent,
                        QuickOrderTableComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb21wb25lbnRzL3F1aWNrLW9yZGVyL3F1aWNrLW9yZGVyLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsc0JBQXNCLEVBQ3RCLG9CQUFvQixHQUNyQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQTBDL0UsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGlCQVo3QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix3QkFBd0IsYUE3QnhCLGVBQWU7UUFDZixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUyxhQXFCVCxtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qix3QkFBd0I7a0hBR2Ysb0JBQW9CLGFBekJwQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixtQkFBbUIsRUFBRTtvQkFDbkIsU0FBUyxFQUFFLG1CQUFtQjtvQkFDOUIsSUFBSSxFQUFFO3dCQUNKLG1CQUFtQixFQUFFLEVBQUU7cUJBQ3hCO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUF4QkMsZUFBZTtRQUNmLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsV0FBVztRQUNYLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTOzJGQTJCQSxvQkFBb0I7a0JBeENoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLHNCQUFzQjt3QkFDdEIsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osU0FBUztxQkFDVjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixtQkFBbUIsRUFBRTtvQ0FDbkIsU0FBUyxFQUFFLG1CQUFtQjtvQ0FDOUIsSUFBSSxFQUFFO3dDQUNKLG1CQUFtQixFQUFFLEVBQUU7cUNBQ3hCO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3QjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7d0JBQ3ZCLHdCQUF3QjtxQkFDekI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXRNZXNzYWdlTW9kdWxlLFxuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBJY29uTW9kdWxlLFxuICBJdGVtQ291bnRlck1vZHVsZSxcbiAgTWVkaWFNb2R1bGUsXG4gIE1lc3NhZ2VDb21wb25lbnRNb2R1bGUsXG4gIFByb2dyZXNzQnV0dG9uTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgUXVpY2tPcmRlckNvbXBvbmVudCB9IGZyb20gJy4vcXVpY2stb3JkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFF1aWNrT3JkZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL3F1aWNrLW9yZGVyLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFF1aWNrT3JkZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS9pdGVtL3F1aWNrLW9yZGVyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFF1aWNrT3JkZXJUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvcXVpY2stb3JkZXItdGFibGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEF0TWVzc2FnZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgTWVzc2FnZUNvbXBvbmVudE1vZHVsZSxcbiAgICBQcm9ncmVzc0J1dHRvbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBRdWlja09yZGVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBRdWlja09yZGVyQ29tcG9uZW50LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHF1aWNrT3JkZXJMaXN0TGltaXQ6IDEwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBRdWlja09yZGVyQ29tcG9uZW50LFxuICAgIFF1aWNrT3JkZXJGb3JtQ29tcG9uZW50LFxuICAgIFF1aWNrT3JkZXJJdGVtQ29tcG9uZW50LFxuICAgIFF1aWNrT3JkZXJUYWJsZUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFF1aWNrT3JkZXJDb21wb25lbnQsXG4gICAgUXVpY2tPcmRlckZvcm1Db21wb25lbnQsXG4gICAgUXVpY2tPcmRlckl0ZW1Db21wb25lbnQsXG4gICAgUXVpY2tPcmRlclRhYmxlQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWlja09yZGVyTGlzdE1vZHVsZSB7fVxuIl19