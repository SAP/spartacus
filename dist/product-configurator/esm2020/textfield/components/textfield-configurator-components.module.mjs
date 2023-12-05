/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ConfiguratorTextfieldAddToCartButtonComponent } from './add-to-cart-button/configurator-textfield-add-to-cart-button.component';
import { ConfiguratorTextfieldFormComponent } from './form/configurator-textfield-form.component';
import { ConfiguratorTextfieldInputFieldComponent } from './input-field/configurator-textfield-input-field.component';
import { ConfiguratorTextfieldInputFieldReadonlyComponent } from './input-field-readonly/configurator-textfield-input-field-readonly.component';
import * as i0 from "@angular/core";
export class TextfieldConfiguratorComponentsModule {
}
TextfieldConfiguratorComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, declarations: [ConfiguratorTextfieldFormComponent,
        ConfiguratorTextfieldInputFieldComponent,
        ConfiguratorTextfieldInputFieldReadonlyComponent,
        ConfiguratorTextfieldAddToCartButtonComponent], imports: [RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule], exports: [ConfiguratorTextfieldFormComponent,
        ConfiguratorTextfieldInputFieldComponent,
        ConfiguratorTextfieldInputFieldReadonlyComponent,
        ConfiguratorTextfieldAddToCartButtonComponent] });
TextfieldConfiguratorComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                TextfieldConfigurationForm: {
                    component: ConfiguratorTextfieldFormComponent,
                },
            },
        }),
    ], imports: [RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                TextfieldConfigurationForm: {
                                    component: ConfiguratorTextfieldFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ConfiguratorTextfieldFormComponent,
                        ConfiguratorTextfieldInputFieldComponent,
                        ConfiguratorTextfieldInputFieldReadonlyComponent,
                        ConfiguratorTextfieldAddToCartButtonComponent,
                    ],
                    exports: [
                        ConfiguratorTextfieldFormComponent,
                        ConfiguratorTextfieldInputFieldComponent,
                        ConfiguratorTextfieldInputFieldReadonlyComponent,
                        ConfiguratorTextfieldAddToCartButtonComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvY29tcG9uZW50cy90ZXh0ZmllbGQtY29uZmlndXJhdG9yLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBRUwsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsNkNBQTZDLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRyxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN0SCxPQUFPLEVBQUUsZ0RBQWdELEVBQUUsTUFBTSw4RUFBOEUsQ0FBQzs7QUFrQ2hKLE1BQU0sT0FBTyxxQ0FBcUM7O2tJQUFyQyxxQ0FBcUM7bUlBQXJDLHFDQUFxQyxpQkFaOUMsa0NBQWtDO1FBQ2xDLHdDQUF3QztRQUN4QyxnREFBZ0Q7UUFDaEQsNkNBQTZDLGFBckI3QyxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixjQUFjO1FBQ2QsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTLGFBa0JULGtDQUFrQztRQUNsQyx3Q0FBd0M7UUFDeEMsZ0RBQWdEO1FBQ2hELDZDQUE2QzttSUFHcEMscUNBQXFDLGFBdEJyQztRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiwwQkFBMEIsRUFBRTtvQkFDMUIsU0FBUyxFQUFFLGtDQUFrQztpQkFDOUM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWhCQyxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixjQUFjO1FBQ2QsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTOzJGQXdCQSxxQ0FBcUM7a0JBaENqRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixTQUFTO3FCQUNWO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDBCQUEwQixFQUFFO29DQUMxQixTQUFTLEVBQUUsa0NBQWtDO2lDQUM5Qzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWixrQ0FBa0M7d0JBQ2xDLHdDQUF3Qzt3QkFDeEMsZ0RBQWdEO3dCQUNoRCw2Q0FBNkM7cUJBQzlDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQ0FBa0M7d0JBQ2xDLHdDQUF3Qzt3QkFDeEMsZ0RBQWdEO3dCQUNoRCw2Q0FBNkM7cUJBQzlDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclRleHRmaWVsZEFkZFRvQ2FydEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYWRkLXRvLWNhcnQtYnV0dG9uL2NvbmZpZ3VyYXRvci10ZXh0ZmllbGQtYWRkLXRvLWNhcnQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2NvbmZpZ3VyYXRvci10ZXh0ZmllbGQtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVGV4dGZpZWxkSW5wdXRGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtZmllbGQvY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVGV4dGZpZWxkSW5wdXRGaWVsZFJlYWRvbmx5Q29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC1maWVsZC1yZWFkb25seS9jb25maWd1cmF0b3ItdGV4dGZpZWxkLWlucHV0LWZpZWxkLXJlYWRvbmx5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBUZXh0ZmllbGRDb25maWd1cmF0aW9uRm9ybToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yVGV4dGZpZWxkRm9ybUNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENvbmZpZ3VyYXRvclRleHRmaWVsZEZvcm1Db21wb25lbnQsXG4gICAgQ29uZmlndXJhdG9yVGV4dGZpZWxkSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBDb25maWd1cmF0b3JUZXh0ZmllbGRJbnB1dEZpZWxkUmVhZG9ubHlDb21wb25lbnQsXG4gICAgQ29uZmlndXJhdG9yVGV4dGZpZWxkQWRkVG9DYXJ0QnV0dG9uQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29uZmlndXJhdG9yVGV4dGZpZWxkRm9ybUNvbXBvbmVudCxcbiAgICBDb25maWd1cmF0b3JUZXh0ZmllbGRJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgIENvbmZpZ3VyYXRvclRleHRmaWVsZElucHV0RmllbGRSZWFkb25seUNvbXBvbmVudCxcbiAgICBDb25maWd1cmF0b3JUZXh0ZmllbGRBZGRUb0NhcnRCdXR0b25Db21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRmaWVsZENvbmZpZ3VyYXRvckNvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==