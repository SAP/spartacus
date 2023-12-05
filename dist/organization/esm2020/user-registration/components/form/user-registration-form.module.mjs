/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigModule, I18nModule, UrlModule, NotAuthGuard, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule, NgSelectA11yModule, } from '@spartacus/storefront';
import { UserRegistrationFormComponent } from './user-registration-form.component';
import { UserRegistrationFormService } from './user-registration-form.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class UserRegistrationFormModule {
}
UserRegistrationFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, declarations: [UserRegistrationFormComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule, i1.ConfigModule], exports: [UserRegistrationFormComponent] });
UserRegistrationFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, providers: [UserRegistrationFormService], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule,
        ConfigModule.withConfig({
            cmsComponents: {
                OrganizationUserRegistrationComponent: {
                    component: UserRegistrationFormComponent,
                    guards: [NotAuthGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        FormErrorsModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                OrganizationUserRegistrationComponent: {
                                    component: UserRegistrationFormComponent,
                                    guards: [NotAuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [UserRegistrationFormComponent],
                    exports: [UserRegistrationFormComponent],
                    providers: [UserRegistrationFormService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24tZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvZm9ybS91c2VyLXJlZ2lzdHJhdGlvbi1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsWUFBWSxFQUVaLFVBQVUsRUFDVixTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixhQUFhLEVBQ2Isa0JBQWtCLEdBQ25CLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQTBCL0UsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLGlCQUp0Qiw2QkFBNkIsYUFsQjFDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsa0JBQWtCLDhCQVdWLDZCQUE2Qjt3SEFHNUIsMEJBQTBCLGFBRjFCLENBQUMsMkJBQTJCLENBQUMsWUFwQnRDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsa0JBQWtCO1FBQ2xCLFlBQVksQ0FBQyxVQUFVLENBQVk7WUFDakMsYUFBYSxFQUFFO2dCQUNiLHFDQUFxQyxFQUFFO29CQUNyQyxTQUFTLEVBQUUsNkJBQTZCO29CQUN4QyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDOzJGQU1PLDBCQUEwQjtrQkF4QnRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLFlBQVksQ0FBQyxVQUFVLENBQVk7NEJBQ2pDLGFBQWEsRUFBRTtnQ0FDYixxQ0FBcUMsRUFBRTtvQ0FDckMsU0FBUyxFQUFFLDZCQUE2QjtvQ0FDeEMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO2lDQUN2Qjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLDZCQUE2QixDQUFDO29CQUM3QyxPQUFPLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztvQkFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHtcbiAgQ29uZmlnTW9kdWxlLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIFVybE1vZHVsZSxcbiAgTm90QXV0aEd1YXJkLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbiAgTmdTZWxlY3RBMTF5TW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlclJlZ2lzdHJhdGlvbkZvcm1Db21wb25lbnQgfSBmcm9tICcuL3VzZXItcmVnaXN0cmF0aW9uLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJSZWdpc3RyYXRpb25Gb3JtU2VydmljZSB9IGZyb20gJy4vdXNlci1yZWdpc3RyYXRpb24tZm9ybS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgTmdTZWxlY3RBMTF5TW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBVc2VyUmVnaXN0cmF0aW9uRm9ybUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtOb3RBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVXNlclJlZ2lzdHJhdGlvbkZvcm1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbVXNlclJlZ2lzdHJhdGlvbkZvcm1Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtVc2VyUmVnaXN0cmF0aW9uRm9ybVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUmVnaXN0cmF0aW9uRm9ybU1vZHVsZSB7fVxuIl19