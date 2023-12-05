/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewSavedCartOrderEntriesContextToken, SavedCartOrderEntriesContextToken, } from '@spartacus/cart/saved-cart/root';
import { provideDefaultConfig } from '@spartacus/core';
import { AddToSavedCartModule } from './add-to-saved-cart/add-to-saved-cart.module';
import { SavedCartDetailsModule } from './details/saved-cart-details.module';
import { SavedCartListModule } from './list/saved-cart-list.module';
import { SavedCartOrderEntriesContext } from './page-context/saved-cart-details-page/saved-cart-order-entries.context';
import { NewSavedCartOrderEntriesContext } from './page-context/saved-carts-page/new-saved-cart-order-entries.context';
import { defaultSavedCartFormLayoutConfig } from './saved-cart-form-dialog/default-saved-cart-form-layout.config';
import { SavedCartFormDialogModule } from './saved-cart-form-dialog/saved-cart-form-dialog.module';
import * as i0 from "@angular/core";
export class SavedCartComponentsModule {
}
SavedCartComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, imports: [RouterModule,
        AddToSavedCartModule,
        SavedCartFormDialogModule,
        SavedCartListModule,
        SavedCartDetailsModule] });
SavedCartComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, providers: [
        {
            provide: SavedCartOrderEntriesContextToken,
            useExisting: SavedCartOrderEntriesContext,
        },
        {
            provide: NewSavedCartOrderEntriesContextToken,
            useExisting: NewSavedCartOrderEntriesContext,
        },
        provideDefaultConfig(defaultSavedCartFormLayoutConfig),
    ], imports: [RouterModule,
        AddToSavedCartModule,
        SavedCartFormDialogModule,
        SavedCartListModule,
        SavedCartDetailsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        AddToSavedCartModule,
                        SavedCartFormDialogModule,
                        SavedCartListModule,
                        SavedCartDetailsModule,
                    ],
                    providers: [
                        {
                            provide: SavedCartOrderEntriesContextToken,
                            useExisting: SavedCartOrderEntriesContext,
                        },
                        {
                            provide: NewSavedCartOrderEntriesContextToken,
                            useExisting: NewSavedCartOrderEntriesContext,
                        },
                        provideDefaultConfig(defaultSavedCartFormLayoutConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3NhdmVkLWNhcnQvY29tcG9uZW50cy9zYXZlZC1jYXJ0LWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsb0NBQW9DLEVBQ3BDLGlDQUFpQyxHQUNsQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQ2xILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDOztBQXNCbkcsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLFlBbEJsQyxZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLHlCQUF5QjtRQUN6QixtQkFBbUI7UUFDbkIsc0JBQXNCO3VIQWNiLHlCQUF5QixhQVp6QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlDQUFpQztZQUMxQyxXQUFXLEVBQUUsNEJBQTRCO1NBQzFDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLFdBQVcsRUFBRSwrQkFBK0I7U0FDN0M7UUFDRCxvQkFBb0IsQ0FBQyxnQ0FBZ0MsQ0FBQztLQUN2RCxZQWhCQyxZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLHlCQUF5QjtRQUN6QixtQkFBbUI7UUFDbkIsc0JBQXNCOzJGQWNiLHlCQUF5QjtrQkFwQnJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQix5QkFBeUI7d0JBQ3pCLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlDQUFpQzs0QkFDMUMsV0FBVyxFQUFFLDRCQUE0Qjt5QkFDMUM7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLG9DQUFvQzs0QkFDN0MsV0FBVyxFQUFFLCtCQUErQjt5QkFDN0M7d0JBQ0Qsb0JBQW9CLENBQUMsZ0NBQWdDLENBQUM7cUJBQ3ZEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBOZXdTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gIFNhdmVkQ2FydE9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3NhdmVkLWNhcnQvcm9vdCc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBZGRUb1NhdmVkQ2FydE1vZHVsZSB9IGZyb20gJy4vYWRkLXRvLXNhdmVkLWNhcnQvYWRkLXRvLXNhdmVkLWNhcnQubW9kdWxlJztcbmltcG9ydCB7IFNhdmVkQ2FydERldGFpbHNNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvc2F2ZWQtY2FydC1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBTYXZlZENhcnRMaXN0TW9kdWxlIH0gZnJvbSAnLi9saXN0L3NhdmVkLWNhcnQtbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0T3JkZXJFbnRyaWVzQ29udGV4dCB9IGZyb20gJy4vcGFnZS1jb250ZXh0L3NhdmVkLWNhcnQtZGV0YWlscy1wYWdlL3NhdmVkLWNhcnQtb3JkZXItZW50cmllcy5jb250ZXh0JztcbmltcG9ydCB7IE5ld1NhdmVkQ2FydE9yZGVyRW50cmllc0NvbnRleHQgfSBmcm9tICcuL3BhZ2UtY29udGV4dC9zYXZlZC1jYXJ0cy1wYWdlL25ldy1zYXZlZC1jYXJ0LW9yZGVyLWVudHJpZXMuY29udGV4dCc7XG5pbXBvcnQgeyBkZWZhdWx0U2F2ZWRDYXJ0Rm9ybUxheW91dENvbmZpZyB9IGZyb20gJy4vc2F2ZWQtY2FydC1mb3JtLWRpYWxvZy9kZWZhdWx0LXNhdmVkLWNhcnQtZm9ybS1sYXlvdXQuY29uZmlnJztcbmltcG9ydCB7IFNhdmVkQ2FydEZvcm1EaWFsb2dNb2R1bGUgfSBmcm9tICcuL3NhdmVkLWNhcnQtZm9ybS1kaWFsb2cvc2F2ZWQtY2FydC1mb3JtLWRpYWxvZy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEFkZFRvU2F2ZWRDYXJ0TW9kdWxlLFxuICAgIFNhdmVkQ2FydEZvcm1EaWFsb2dNb2R1bGUsXG4gICAgU2F2ZWRDYXJ0TGlzdE1vZHVsZSxcbiAgICBTYXZlZENhcnREZXRhaWxzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICB1c2VFeGlzdGluZzogU2F2ZWRDYXJ0T3JkZXJFbnRyaWVzQ29udGV4dCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5ld1NhdmVkQ2FydE9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgIHVzZUV4aXN0aW5nOiBOZXdTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0LFxuICAgIH0sXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFNhdmVkQ2FydEZvcm1MYXlvdXRDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTYXZlZENhcnRDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=