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
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule, KeyboardFocusModule, PasswordVisibilityToggleModule, } from '@spartacus/storefront';
import { CardModule } from '../../shared/card/card.module';
import { UserChangePasswordFormComponent } from './user-change-password-form.component';
import * as i0 from "@angular/core";
export class UserChangePasswordFormModule {
}
UserChangePasswordFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserChangePasswordFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, declarations: [UserChangePasswordFormComponent], imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        CardModule,
        KeyboardFocusModule,
        PasswordVisibilityToggleModule] });
UserChangePasswordFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        CardModule,
        KeyboardFocusModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        CardModule,
                        KeyboardFocusModule,
                        PasswordVisibilityToggleModule,
                    ],
                    declarations: [UserChangePasswordFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jaGFuZ2UtcGFzc3dvcmQtZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9jaGFuZ2UtcGFzc3dvcmQtZm9ybS91c2VyLWNoYW5nZS1wYXNzd29yZC1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLDhCQUE4QixHQUMvQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFpQnhGLE1BQU0sT0FBTyw0QkFBNEI7O3lIQUE1Qiw0QkFBNEI7MEhBQTVCLDRCQUE0QixpQkFGeEIsK0JBQStCLGFBWDVDLFlBQVk7UUFDWixZQUFZO1FBQ1osY0FBYztRQUNkLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLDhCQUE4QjswSEFJckIsNEJBQTRCLFlBYnJDLFlBQVk7UUFDWixZQUFZO1FBQ1osY0FBYztRQUNkLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLDhCQUE4QjsyRkFJckIsNEJBQTRCO2tCQWZ4QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxTQUFTO3dCQUNULFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQiw4QkFBOEI7cUJBQy9CO29CQUNELFlBQVksRUFBRSxDQUFDLCtCQUErQixDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlckNoYW5nZVBhc3N3b3JkRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vdXNlci1jaGFuZ2UtcGFzc3dvcmQtZm9ybS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVXNlckNoYW5nZVBhc3N3b3JkRm9ybUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJDaGFuZ2VQYXNzd29yZEZvcm1Nb2R1bGUge31cbiJdfQ==