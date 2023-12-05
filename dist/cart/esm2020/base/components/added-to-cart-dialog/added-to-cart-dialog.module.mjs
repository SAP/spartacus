/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { IconModule, ItemCounterModule, KeyboardFocusModule, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';
import { defaultAddedToCartLayoutConfig } from './default-added-to-cart-layout.config';
import * as i0 from "@angular/core";
import * as i1 from "./added-to-cart-dialog-event.listener";
export class AddedToCartDialogModule {
    constructor(_addToCartDialogEventListener) {
        // Intentional empty constructor
    }
}
AddedToCartDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, deps: [{ token: i1.AddedToCartDialogEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
AddedToCartDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, declarations: [AddedToCartDialogComponent], imports: [CommonModule,
        ReactiveFormsModule,
        CartSharedModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule], exports: [AddedToCartDialogComponent] });
AddedToCartDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, providers: [provideDefaultConfig(defaultAddedToCartLayoutConfig)], imports: [CommonModule,
        ReactiveFormsModule,
        CartSharedModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CartSharedModule,
                        RouterModule,
                        SpinnerModule,
                        PromotionsModule,
                        UrlModule,
                        IconModule,
                        I18nModule,
                        ItemCounterModule,
                        KeyboardFocusModule,
                    ],
                    providers: [provideDefaultConfig(defaultAddedToCartLayoutConfig)],
                    declarations: [AddedToCartDialogComponent],
                    exports: [AddedToCartDialogComponent],
                }]
        }], ctorParameters: function () { return [{ type: i1.AddedToCartDialogEventListener }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkZWQtdG8tY2FydC1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2FkZGVkLXRvLWNhcnQtZGlhbG9nL2FkZGVkLXRvLWNhcnQtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUNMLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7O0FBb0J2RixNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQVksNkJBQTZEO1FBQ3ZFLGdDQUFnQztJQUNsQyxDQUFDOztvSEFIVSx1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFIbkIsMEJBQTBCLGFBYnZDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixtQkFBbUIsYUFJWCwwQkFBMEI7cUhBRXpCLHVCQUF1QixhQUp2QixDQUFDLG9CQUFvQixDQUFDLDhCQUE4QixDQUFDLENBQUMsWUFaL0QsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLG1CQUFtQjsyRkFNVix1QkFBdUI7a0JBbEJuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixpQkFBaUI7d0JBQ2pCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsOEJBQThCLENBQUMsQ0FBQztvQkFDakUsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZywgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEljb25Nb2R1bGUsXG4gIEl0ZW1Db3VudGVyTW9kdWxlLFxuICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL2NhcnQtc2hhcmVkL2NhcnQtc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBZGRlZFRvQ2FydERpYWxvZ0V2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2FkZGVkLXRvLWNhcnQtZGlhbG9nLWV2ZW50Lmxpc3RlbmVyJztcbmltcG9ydCB7IEFkZGVkVG9DYXJ0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9hZGRlZC10by1jYXJ0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdEFkZGVkVG9DYXJ0TGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWFkZGVkLXRvLWNhcnQtbGF5b3V0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDYXJ0U2hhcmVkTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFByb21vdGlvbnNNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJdGVtQ291bnRlck1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QWRkZWRUb0NhcnRMYXlvdXRDb25maWcpXSxcbiAgZGVjbGFyYXRpb25zOiBbQWRkZWRUb0NhcnREaWFsb2dDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQWRkZWRUb0NhcnREaWFsb2dDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRlZFRvQ2FydERpYWxvZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKF9hZGRUb0NhcnREaWFsb2dFdmVudExpc3RlbmVyOiBBZGRlZFRvQ2FydERpYWxvZ0V2ZW50TGlzdGVuZXIpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG59XG4iXX0=