/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import * as i0 from "@angular/core";
export class CategoryNavigationModule {
}
CategoryNavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CategoryNavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CategoryNavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CategoryNavigationModule, declarations: [CategoryNavigationComponent], imports: [CommonModule, NavigationModule, I18nModule], exports: [CategoryNavigationComponent] });
CategoryNavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CategoryNavigationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CategoryNavigationComponent: {
                    component: CategoryNavigationComponent,
                    data: {
                        resetMenuOnClose: true,
                    },
                },
            },
        }),
    ], imports: [CommonModule, NavigationModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CategoryNavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NavigationModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CategoryNavigationComponent: {
                                    component: CategoryNavigationComponent,
                                    data: {
                                        resetMenuOnClose: true,
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [CategoryNavigationComponent],
                    exports: [CategoryNavigationComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnktbmF2aWdhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vY2F0ZWdvcnktbmF2aWdhdGlvbi9jYXRlZ29yeS1uYXZpZ2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQW1COUUsTUFBTSxPQUFPLHdCQUF3Qjs7cUhBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGlCQUhwQiwyQkFBMkIsYUFiaEMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsYUFjMUMsMkJBQTJCO3NIQUUxQix3QkFBd0IsYUFmeEI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsMkJBQTJCLEVBQUU7b0JBQzNCLFNBQVMsRUFBRSwyQkFBMkI7b0JBQ3RDLElBQUksRUFBRTt3QkFDSixnQkFBZ0IsRUFBRSxJQUFJO3FCQUN2QjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBWlMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFVBQVU7MkZBZ0J6Qyx3QkFBd0I7a0JBakJwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7b0JBQ3JELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDJCQUEyQixFQUFFO29DQUMzQixTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxJQUFJLEVBQUU7d0NBQ0osZ0JBQWdCLEVBQUUsSUFBSTtxQ0FDdkI7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDM0MsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Nb2R1bGUgfSBmcm9tICcuLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IENhdGVnb3J5TmF2aWdhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY2F0ZWdvcnktbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOYXZpZ2F0aW9uTW9kdWxlLCBJMThuTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENhdGVnb3J5TmF2aWdhdGlvbkNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ2F0ZWdvcnlOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHJlc2V0TWVudU9uQ2xvc2U6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NhdGVnb3J5TmF2aWdhdGlvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDYXRlZ29yeU5hdmlnYXRpb25Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeU5hdmlnYXRpb25Nb2R1bGUge31cbiJdfQ==