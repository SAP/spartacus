/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { AuthGuard, ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, MediaModule, OutletModule, SpinnerModule, } from '@spartacus/storefront';
import { SavedCartDetailsActionComponent } from './saved-cart-details-action/saved-cart-details-action.component';
import { SavedCartDetailsItemsComponent } from './saved-cart-details-items/saved-cart-details-items.component';
import { SavedCartDetailsOverviewComponent } from './saved-cart-details-overview/saved-cart-details-overview.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class SavedCartDetailsModule {
}
SavedCartDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, declarations: [SavedCartDetailsOverviewComponent,
        SavedCartDetailsActionComponent,
        SavedCartDetailsItemsComponent], imports: [CommonModule,
        I18nModule,
        UrlModule,
        RouterModule,
        CardModule,
        MediaModule,
        IconModule,
        SpinnerModule,
        OutletModule,
        AddToCartModule, i1.ConfigModule], exports: [SavedCartDetailsOverviewComponent,
        SavedCartDetailsActionComponent,
        SavedCartDetailsItemsComponent] });
SavedCartDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, imports: [CommonModule,
        I18nModule,
        UrlModule,
        RouterModule,
        CardModule,
        MediaModule,
        IconModule,
        SpinnerModule,
        OutletModule,
        AddToCartModule,
        ConfigModule.withConfig({
            cmsComponents: {
                SavedCartDetailsOverviewComponent: {
                    component: SavedCartDetailsOverviewComponent,
                    guards: [AuthGuard],
                },
                SavedCartDetailsItemsComponent: {
                    component: SavedCartDetailsItemsComponent,
                    guards: [AuthGuard],
                },
                SavedCartDetailsActionComponent: {
                    component: SavedCartDetailsActionComponent,
                    guards: [AuthGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                        CardModule,
                        MediaModule,
                        IconModule,
                        SpinnerModule,
                        OutletModule,
                        AddToCartModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                SavedCartDetailsOverviewComponent: {
                                    component: SavedCartDetailsOverviewComponent,
                                    guards: [AuthGuard],
                                },
                                SavedCartDetailsItemsComponent: {
                                    component: SavedCartDetailsItemsComponent,
                                    guards: [AuthGuard],
                                },
                                SavedCartDetailsActionComponent: {
                                    component: SavedCartDetailsActionComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        SavedCartDetailsOverviewComponent,
                        SavedCartDetailsActionComponent,
                        SavedCartDetailsItemsComponent,
                    ],
                    exports: [
                        SavedCartDetailsOverviewComponent,
                        SavedCartDetailsActionComponent,
                        SavedCartDetailsItemsComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3NhdmVkLWNhcnQvY29tcG9uZW50cy9kZXRhaWxzL3NhdmVkLWNhcnQtZGV0YWlscy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDbEgsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDL0csT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUVBQXFFLENBQUM7OztBQTBDeEgsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCLGlCQVYvQixpQ0FBaUM7UUFDakMsK0JBQStCO1FBQy9CLDhCQUE4QixhQTlCOUIsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTO1FBQ1QsWUFBWTtRQUNaLFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLGFBQWE7UUFDYixZQUFZO1FBQ1osZUFBZSw4QkF3QmYsaUNBQWlDO1FBQ2pDLCtCQUErQjtRQUMvQiw4QkFBOEI7b0hBR3JCLHNCQUFzQixZQXRDL0IsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTO1FBQ1QsWUFBWTtRQUNaLFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLGFBQWE7UUFDYixZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVksQ0FBQyxVQUFVLENBQVk7WUFDakMsYUFBYSxFQUFFO2dCQUNiLGlDQUFpQyxFQUFFO29CQUNqQyxTQUFTLEVBQUUsaUNBQWlDO29CQUM1QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2dCQUNELDhCQUE4QixFQUFFO29CQUM5QixTQUFTLEVBQUUsOEJBQThCO29CQUN6QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2dCQUNELCtCQUErQixFQUFFO29CQUMvQixTQUFTLEVBQUUsK0JBQStCO29CQUMxQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDOzJGQWFPLHNCQUFzQjtrQkF4Q2xDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixTQUFTO3dCQUNULFlBQVk7d0JBQ1osVUFBVTt3QkFDVixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsWUFBWSxDQUFDLFVBQVUsQ0FBWTs0QkFDakMsYUFBYSxFQUFFO2dDQUNiLGlDQUFpQyxFQUFFO29DQUNqQyxTQUFTLEVBQUUsaUNBQWlDO29DQUM1QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCO2dDQUNELDhCQUE4QixFQUFFO29DQUM5QixTQUFTLEVBQUUsOEJBQThCO29DQUN6QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCO2dDQUNELCtCQUErQixFQUFFO29DQUMvQixTQUFTLEVBQUUsK0JBQStCO29DQUMxQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGlDQUFpQzt3QkFDakMsK0JBQStCO3dCQUMvQiw4QkFBOEI7cUJBQy9CO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQ0FBaUM7d0JBQ2pDLCtCQUErQjt3QkFDL0IsOEJBQThCO3FCQUMvQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFkZFRvQ2FydE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL2NvbXBvbmVudHMvYWRkLXRvLWNhcnQnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIENvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FyZE1vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgTWVkaWFNb2R1bGUsXG4gIE91dGxldE1vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFNhdmVkQ2FydERldGFpbHNBY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL3NhdmVkLWNhcnQtZGV0YWlscy1hY3Rpb24vc2F2ZWQtY2FydC1kZXRhaWxzLWFjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0RGV0YWlsc0l0ZW1zQ29tcG9uZW50IH0gZnJvbSAnLi9zYXZlZC1jYXJ0LWRldGFpbHMtaXRlbXMvc2F2ZWQtY2FydC1kZXRhaWxzLWl0ZW1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTYXZlZENhcnREZXRhaWxzT3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tICcuL3NhdmVkLWNhcnQtZGV0YWlscy1vdmVydmlldy9zYXZlZC1jYXJ0LWRldGFpbHMtb3ZlcnZpZXcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICAgIEFkZFRvQ2FydE1vZHVsZSxcbiAgICBDb25maWdNb2R1bGUud2l0aENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgU2F2ZWRDYXJ0RGV0YWlsc092ZXJ2aWV3Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBTYXZlZENhcnREZXRhaWxzT3ZlcnZpZXdDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgU2F2ZWRDYXJ0RGV0YWlsc0l0ZW1zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBTYXZlZENhcnREZXRhaWxzSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgU2F2ZWRDYXJ0RGV0YWlsc0FjdGlvbkNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogU2F2ZWRDYXJ0RGV0YWlsc0FjdGlvbkNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2F2ZWRDYXJ0RGV0YWlsc092ZXJ2aWV3Q29tcG9uZW50LFxuICAgIFNhdmVkQ2FydERldGFpbHNBY3Rpb25Db21wb25lbnQsXG4gICAgU2F2ZWRDYXJ0RGV0YWlsc0l0ZW1zQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU2F2ZWRDYXJ0RGV0YWlsc092ZXJ2aWV3Q29tcG9uZW50LFxuICAgIFNhdmVkQ2FydERldGFpbHNBY3Rpb25Db21wb25lbnQsXG4gICAgU2F2ZWRDYXJ0RGV0YWlsc0l0ZW1zQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTYXZlZENhcnREZXRhaWxzTW9kdWxlIHt9XG4iXX0=