/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, I18nModule, provideDefaultConfig, UserAddressService, } from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { AddressBookComponent } from './address-book.component';
import { AddressFormModule } from './address-form/address-form.module';
import { defaultSuggestedAddressesDialogLayoutConfig } from './address-form/suggested-addresses-dialog/default-suggested-addresses-dialog-layout.config';
import * as i0 from "@angular/core";
export class AddressBookModule {
}
AddressBookModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddressBookModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddressBookModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddressBookModule, declarations: [AddressBookComponent], imports: [CommonModule,
        CardModule,
        AddressFormModule,
        SpinnerModule,
        I18nModule], exports: [AddressBookComponent] });
AddressBookModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddressBookModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountAddressBookComponent: {
                    component: AddressBookComponent,
                    guards: [AuthGuard],
                },
            },
        }),
        provideDefaultConfig(defaultSuggestedAddressesDialogLayoutConfig),
        UserAddressService,
    ], imports: [CommonModule,
        CardModule,
        AddressFormModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddressBookModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        AddressFormModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    declarations: [AddressBookComponent],
                    exports: [AddressBookComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountAddressBookComponent: {
                                    component: AddressBookComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                        provideDefaultConfig(defaultSuggestedAddressesDialogLayoutConfig),
                        UserAddressService,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1ib29rLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L2FkZHJlc3MtYm9vay9hZGRyZXNzLWJvb2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsa0JBQWtCLEdBQ25CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSw0RkFBNEYsQ0FBQzs7QUF5QnpKLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFmYixvQkFBb0IsYUFOakMsWUFBWTtRQUNaLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLFVBQVUsYUFHRixvQkFBb0I7K0dBY25CLGlCQUFpQixhQWJqQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiwyQkFBMkIsRUFBRTtvQkFDM0IsU0FBUyxFQUFFLG9CQUFvQjtvQkFDL0IsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztRQUNGLG9CQUFvQixDQUFDLDJDQUEyQyxDQUFDO1FBQ2pFLGtCQUFrQjtLQUNuQixZQW5CQyxZQUFZO1FBQ1osVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2IsVUFBVTsyRkFpQkQsaUJBQWlCO2tCQXZCN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixVQUFVO3FCQUNYO29CQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUNwQyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsMkJBQTJCLEVBQUU7b0NBQzNCLFNBQVMsRUFBRSxvQkFBb0I7b0NBQy9CLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQzt3QkFDRixvQkFBb0IsQ0FBQywyQ0FBMkMsQ0FBQzt3QkFDakUsa0JBQWtCO3FCQUNuQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVc2VyQWRkcmVzc1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBBZGRyZXNzQm9va0NvbXBvbmVudCB9IGZyb20gJy4vYWRkcmVzcy1ib29rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZGRyZXNzRm9ybU1vZHVsZSB9IGZyb20gJy4vYWRkcmVzcy1mb3JtL2FkZHJlc3MtZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdFN1Z2dlc3RlZEFkZHJlc3Nlc0RpYWxvZ0xheW91dENvbmZpZyB9IGZyb20gJy4vYWRkcmVzcy1mb3JtL3N1Z2dlc3RlZC1hZGRyZXNzZXMtZGlhbG9nL2RlZmF1bHQtc3VnZ2VzdGVkLWFkZHJlc3Nlcy1kaWFsb2ctbGF5b3V0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBBZGRyZXNzRm9ybU1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0FkZHJlc3NCb29rQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FkZHJlc3NCb29rQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEFjY291bnRBZGRyZXNzQm9va0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQWRkcmVzc0Jvb2tDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFN1Z2dlc3RlZEFkZHJlc3Nlc0RpYWxvZ0xheW91dENvbmZpZyksXG4gICAgVXNlckFkZHJlc3NTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRyZXNzQm9va01vZHVsZSB7fVxuIl19