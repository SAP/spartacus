/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule, IconModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { MyPreferredStoreComponent } from './my-preferred-store.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class MyPreferredStoreModule {
}
MyPreferredStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyPreferredStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, declarations: [MyPreferredStoreComponent], imports: [CardModule,
        StoreModule,
        CommonModule,
        I18nModule,
        IconModule, i1.ConfigModule], exports: [MyPreferredStoreComponent] });
MyPreferredStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, imports: [CardModule,
        StoreModule,
        CommonModule,
        I18nModule,
        IconModule,
        ConfigModule.withConfig({
            cmsComponents: {
                MyPreferredStoreComponent: {
                    component: MyPreferredStoreComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyPreferredStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        StoreModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                MyPreferredStoreComponent: {
                                    component: MyPreferredStoreComponent,
                                },
                            },
                        }),
                    ],
                    exports: [MyPreferredStoreComponent],
                    declarations: [MyPreferredStoreComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktcHJlZmVycmVkLXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvY29tcG9uZW50cy9jb250YWluZXIvbXktcHJlZmVycmVkLXN0b3JlL215LXByZWZlcnJlZC1zdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7OztBQW1CM0UsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCLGlCQUZsQix5QkFBeUIsYUFkdEMsVUFBVTtRQUNWLFdBQVc7UUFDWCxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVUsOEJBU0YseUJBQXlCO29IQUd4QixzQkFBc0IsWUFoQi9CLFVBQVU7UUFDVixXQUFXO1FBQ1gsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUN0QixhQUFhLEVBQUU7Z0JBQ2IseUJBQXlCLEVBQUU7b0JBQ3pCLFNBQVMsRUFBRSx5QkFBeUI7aUJBQ3JDO2FBQ0Y7U0FDVyxDQUFDOzJGQUtOLHNCQUFzQjtrQkFsQmxDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixZQUFZLENBQUMsVUFBVSxDQUFDOzRCQUN0QixhQUFhLEVBQUU7Z0NBQ2IseUJBQXlCLEVBQUU7b0NBQ3pCLFNBQVMsRUFBRSx5QkFBeUI7aUNBQ3JDOzZCQUNGO3lCQUNXLENBQUM7cUJBQ2hCO29CQUNELE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUNwQyxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgQ29uZmlnTW9kdWxlLCBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcmRNb2R1bGUsIEljb25Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9wcmVzZW50YXRpb25hbC9zdG9yZSc7XG5pbXBvcnQgeyBNeVByZWZlcnJlZFN0b3JlQ29tcG9uZW50IH0gZnJvbSAnLi9teS1wcmVmZXJyZWQtc3RvcmUuY29tcG9uZW50JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYXJkTW9kdWxlLFxuICAgIFN0b3JlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoe1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBNeVByZWZlcnJlZFN0b3JlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBNeVByZWZlcnJlZFN0b3JlQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9IGFzIENtc0NvbmZpZyksXG4gIF0sXG4gIGV4cG9ydHM6IFtNeVByZWZlcnJlZFN0b3JlQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbTXlQcmVmZXJyZWRTdG9yZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE15UHJlZmVycmVkU3RvcmVNb2R1bGUge31cbiJdfQ==