/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountV2NavigationComponent } from './my-account-v2-navigation.component';
import { AuthGuard, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { NavigationModule } from '../../../navigation/navigation/navigation.module';
import * as i0 from "@angular/core";
export class MyAccountV2NavigationModule {
}
MyAccountV2NavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2NavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2NavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2NavigationModule, declarations: [MyAccountV2NavigationComponent], imports: [CommonModule, NavigationModule, I18nModule], exports: [MyAccountV2NavigationComponent] });
MyAccountV2NavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2NavigationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyAccountSideNavigationComponent: {
                    component: MyAccountV2NavigationComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, NavigationModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2NavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyAccountSideNavigationComponent: {
                                    component: MyAccountV2NavigationComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [MyAccountV2NavigationComponent],
                    exports: [MyAccountV2NavigationComponent],
                    imports: [CommonModule, NavigationModule, I18nModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYWNjb3VudC12Mi1uYXZpZ2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L215LWFjY291bnQtdjIvbXktYWNjb3VudC12Mi1uYXZpZ2F0aW9uL215LWFjY291bnQtdjItbmF2aWdhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RGLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOztBQWlCcEYsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLGlCQUp2Qiw4QkFBOEIsYUFFbkMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsYUFEMUMsOEJBQThCO3lIQUc3QiwyQkFBMkIsYUFkM0I7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsZ0NBQWdDLEVBQUU7b0JBQ2hDLFNBQVMsRUFBRSw4QkFBOEI7b0JBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7YUFDRjtTQUNGLENBQUM7S0FDSCxZQUdTLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVOzJGQUV6QywyQkFBMkI7a0JBZnZDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsZ0NBQWdDLEVBQUU7b0NBQ2hDLFNBQVMsRUFBRSw4QkFBOEI7b0NBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDOUMsT0FBTyxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7aUJBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNeUFjY291bnRWMk5hdmlnYXRpb25Db21wb25lbnQgfSBmcm9tICcuL215LWFjY291bnQtdjItbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL25hdmlnYXRpb24vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBNeUFjY291bnRTaWRlTmF2aWdhdGlvbkNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogTXlBY2NvdW50VjJOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNeUFjY291bnRWMk5hdmlnYXRpb25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbTXlBY2NvdW50VjJOYXZpZ2F0aW9uQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmF2aWdhdGlvbk1vZHVsZSwgSTE4bk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE15QWNjb3VudFYyTmF2aWdhdGlvbk1vZHVsZSB7fVxuIl19