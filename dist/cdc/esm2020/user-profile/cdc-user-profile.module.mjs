/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CDCForgotPasswordModule } from './forgot-password/cdc-forgot-password.module';
import { CDCRegisterModule } from './register/cdc-register.module';
import { CDCUpdateEmailModule } from './update-email/cdc-update-email.module';
import { CDCUpdatePasswordModule } from './update-password/cdc-update-password.module';
import { CDCUpdateProfileModule } from './update-profile/cdc-update-profile.module';
import * as i0 from "@angular/core";
export class CDCUserProfileModule {
}
CDCUserProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUserProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule,
        CDCForgotPasswordModule,
        CDCUpdateProfileModule,
        CDCUpdatePasswordModule,
        CDCUpdateEmailModule] });
CDCUserProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule,
        CDCForgotPasswordModule,
        CDCUpdateProfileModule,
        CDCUpdatePasswordModule,
        CDCUpdateEmailModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CDCRegisterModule,
                        CDCForgotPasswordModule,
                        CDCUpdateProfileModule,
                        CDCUpdatePasswordModule,
                        CDCUpdateEmailModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItcHJvZmlsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy91c2VyLXByb2ZpbGUvY2RjLXVzZXItcHJvZmlsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7O0FBV3BGLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQVA3QixpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsb0JBQW9CO2tIQUdYLG9CQUFvQixZQVA3QixpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsb0JBQW9COzJGQUdYLG9CQUFvQjtrQkFUaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3dCQUN2QixvQkFBb0I7cUJBQ3JCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENEQ0ZvcmdvdFBhc3N3b3JkTW9kdWxlIH0gZnJvbSAnLi9mb3Jnb3QtcGFzc3dvcmQvY2RjLWZvcmdvdC1wYXNzd29yZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ0RDUmVnaXN0ZXJNb2R1bGUgfSBmcm9tICcuL3JlZ2lzdGVyL2NkYy1yZWdpc3Rlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ0RDVXBkYXRlRW1haWxNb2R1bGUgfSBmcm9tICcuL3VwZGF0ZS1lbWFpbC9jZGMtdXBkYXRlLWVtYWlsLm1vZHVsZSc7XG5pbXBvcnQgeyBDRENVcGRhdGVQYXNzd29yZE1vZHVsZSB9IGZyb20gJy4vdXBkYXRlLXBhc3N3b3JkL2NkYy11cGRhdGUtcGFzc3dvcmQubW9kdWxlJztcbmltcG9ydCB7IENEQ1VwZGF0ZVByb2ZpbGVNb2R1bGUgfSBmcm9tICcuL3VwZGF0ZS1wcm9maWxlL2NkYy11cGRhdGUtcHJvZmlsZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ0RDUmVnaXN0ZXJNb2R1bGUsXG4gICAgQ0RDRm9yZ290UGFzc3dvcmRNb2R1bGUsXG4gICAgQ0RDVXBkYXRlUHJvZmlsZU1vZHVsZSxcbiAgICBDRENVcGRhdGVQYXNzd29yZE1vZHVsZSxcbiAgICBDRENVcGRhdGVFbWFpbE1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ0RDVXNlclByb2ZpbGVNb2R1bGUge31cbiJdfQ==