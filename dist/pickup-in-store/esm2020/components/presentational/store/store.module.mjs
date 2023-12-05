/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { SetPreferredStoreModule } from '../../container/set-preferred-store/set-preferred-store.module';
import { StoreAddressComponent } from './store-address/index';
import { StoreScheduleComponent } from './store-schedule/index';
import { StoreComponent } from './store.component';
import * as i0 from "@angular/core";
export class StoreModule {
}
StoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, declarations: [StoreComponent, StoreScheduleComponent, StoreAddressComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        SetPreferredStoreModule], exports: [StoreComponent, StoreScheduleComponent, StoreAddressComponent] });
StoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        SetPreferredStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        SpinnerModule,
                        SetPreferredStoreModule,
                    ],
                    exports: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
                    declarations: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL3ByZXNlbnRhdGlvbmFsL3N0b3JlL3N0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDekcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQWFuRCxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXLGlCQUZQLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsYUFQMUUsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsYUFBYTtRQUNiLHVCQUF1QixhQUVmLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUI7eUdBRzVELFdBQVcsWUFUcEIsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsYUFBYTtRQUNiLHVCQUF1QjsyRkFLZCxXQUFXO2tCQVh2QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixhQUFhO3dCQUNiLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO29CQUN4RSxZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLENBQUM7aUJBQzlFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUsIFNwaW5uZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgU2V0UHJlZmVycmVkU3RvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb250YWluZXIvc2V0LXByZWZlcnJlZC1zdG9yZS9zZXQtcHJlZmVycmVkLXN0b3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBTdG9yZUFkZHJlc3NDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWFkZHJlc3MvaW5kZXgnO1xuaW1wb3J0IHsgU3RvcmVTY2hlZHVsZUNvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtc2NoZWR1bGUvaW5kZXgnO1xuaW1wb3J0IHsgU3RvcmVDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgU2V0UHJlZmVycmVkU3RvcmVNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtTdG9yZUNvbXBvbmVudCwgU3RvcmVTY2hlZHVsZUNvbXBvbmVudCwgU3RvcmVBZGRyZXNzQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbU3RvcmVDb21wb25lbnQsIFN0b3JlU2NoZWR1bGVDb21wb25lbnQsIFN0b3JlQWRkcmVzc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlTW9kdWxlIHt9XG4iXX0=