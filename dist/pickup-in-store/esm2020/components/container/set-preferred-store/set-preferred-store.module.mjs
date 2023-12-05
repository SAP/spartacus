/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import { IconModule, OutletPosition, provideOutlet, } from '@spartacus/storefront';
import { SetPreferredStoreComponent } from './set-preferred-store.component';
import * as i0 from "@angular/core";
export class SetPreferredStoreModule {
}
SetPreferredStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SetPreferredStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, declarations: [SetPreferredStoreComponent], imports: [CommonModule, IconModule, I18nModule], exports: [SetPreferredStoreComponent] });
SetPreferredStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, providers: [
        provideOutlet({
            id: StoreFinderOutlets.PREFERRED_STORE,
            position: OutletPosition.REPLACE,
            component: SetPreferredStoreComponent,
        }),
    ], imports: [CommonModule, IconModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SetPreferredStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule, I18nModule],
                    exports: [SetPreferredStoreComponent],
                    declarations: [SetPreferredStoreComponent],
                    providers: [
                        provideOutlet({
                            id: StoreFinderOutlets.PREFERRED_STORE,
                            position: OutletPosition.REPLACE,
                            component: SetPreferredStoreComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LXByZWZlcnJlZC1zdG9yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvbXBvbmVudHMvY29udGFpbmVyL3NldC1wcmVmZXJyZWQtc3RvcmUvc2V0LXByZWZlcnJlZC1zdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLGNBQWMsRUFDZCxhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFjN0UsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGlCQVRuQiwwQkFBMEIsYUFGL0IsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLGFBQ3BDLDBCQUEwQjtxSEFVekIsdUJBQXVCLGFBUnZCO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLGtCQUFrQixDQUFDLGVBQWU7WUFDdEMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1lBQ2hDLFNBQVMsRUFBRSwwQkFBMEI7U0FDdEMsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVOzJGQVduQyx1QkFBdUI7a0JBWm5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQy9DLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUNyQyxZQUFZLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDMUMsU0FBUyxFQUFFO3dCQUNULGFBQWEsQ0FBQzs0QkFDWixFQUFFLEVBQUUsa0JBQWtCLENBQUMsZUFBZTs0QkFDdEMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxPQUFPOzRCQUNoQyxTQUFTLEVBQUUsMEJBQTBCO3lCQUN0QyxDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN0b3JlRmluZGVyT3V0bGV0cyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmaW5kZXIvcm9vdCc7XG5pbXBvcnQge1xuICBJY29uTW9kdWxlLFxuICBPdXRsZXRQb3NpdGlvbixcbiAgcHJvdmlkZU91dGxldCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFNldFByZWZlcnJlZFN0b3JlQ29tcG9uZW50IH0gZnJvbSAnLi9zZXQtcHJlZmVycmVkLXN0b3JlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEljb25Nb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBleHBvcnRzOiBbU2V0UHJlZmVycmVkU3RvcmVDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtTZXRQcmVmZXJyZWRTdG9yZUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVPdXRsZXQoe1xuICAgICAgaWQ6IFN0b3JlRmluZGVyT3V0bGV0cy5QUkVGRVJSRURfU1RPUkUsXG4gICAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24uUkVQTEFDRSxcbiAgICAgIGNvbXBvbmVudDogU2V0UHJlZmVycmVkU3RvcmVDb21wb25lbnQsXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNldFByZWZlcnJlZFN0b3JlTW9kdWxlIHt9XG4iXX0=