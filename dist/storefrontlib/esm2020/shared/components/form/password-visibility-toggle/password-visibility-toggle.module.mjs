/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { defaultFormConfig } from '../../../../shared/config/default-form-config';
import { PasswordVisibilityToggleDirective } from './password-visibility-toggle.directive';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';
import * as i0 from "@angular/core";
export class PasswordVisibilityToggleModule {
}
PasswordVisibilityToggleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PasswordVisibilityToggleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleModule, declarations: [PasswordVisibilityToggleDirective,
        PasswordVisibilityToggleComponent], imports: [CommonModule, IconModule, I18nModule], exports: [PasswordVisibilityToggleDirective,
        PasswordVisibilityToggleComponent] });
PasswordVisibilityToggleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleModule, providers: [provideDefaultConfig(defaultFormConfig)], imports: [CommonModule, IconModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule, I18nModule],
                    providers: [provideDefaultConfig(defaultFormConfig)],
                    declarations: [
                        PasswordVisibilityToggleDirective,
                        PasswordVisibilityToggleComponent,
                    ],
                    exports: [
                        PasswordVisibilityToggleDirective,
                        PasswordVisibilityToggleComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtdmlzaWJpbGl0eS10b2dnbGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUU5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFjM0YsTUFBTSxPQUFPLDhCQUE4Qjs7MkhBQTlCLDhCQUE4Qjs0SEFBOUIsOEJBQThCLGlCQVJ2QyxpQ0FBaUM7UUFDakMsaUNBQWlDLGFBSnpCLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxhQU81QyxpQ0FBaUM7UUFDakMsaUNBQWlDOzRIQUd4Qiw4QkFBOEIsYUFWOUIsQ0FBQyxvQkFBb0IsQ0FBYSxpQkFBaUIsQ0FBQyxDQUFDLFlBRHRELFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVTsyRkFXbkMsOEJBQThCO2tCQVoxQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUMvQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBYSxpQkFBaUIsQ0FBQyxDQUFDO29CQUNoRSxZQUFZLEVBQUU7d0JBQ1osaUNBQWlDO3dCQUNqQyxpQ0FBaUM7cUJBQ2xDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQ0FBaUM7d0JBQ2pDLGlDQUFpQztxQkFDbEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jbXMtY29tcG9uZW50cy9taXNjL2ljb24vaWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybUNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb25maWcvZm9ybS1jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdEZvcm1Db25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29uZmlnL2RlZmF1bHQtZm9ybS1jb25maWcnO1xuaW1wb3J0IHsgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9wYXNzd29yZC12aXNpYmlsaXR5LXRvZ2dsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi9wYXNzd29yZC12aXNpYmlsaXR5LXRvZ2dsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJY29uTW9kdWxlLCBJMThuTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoPEZvcm1Db25maWc+ZGVmYXVsdEZvcm1Db25maWcpXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlRGlyZWN0aXZlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZURpcmVjdGl2ZSxcbiAgICBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSB7fVxuIl19