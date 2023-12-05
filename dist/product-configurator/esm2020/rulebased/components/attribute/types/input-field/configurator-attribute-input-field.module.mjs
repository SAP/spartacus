/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeInputFieldComponent } from './configurator-attribute-input-field.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeInputFieldModule {
}
ConfiguratorAttributeInputFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeInputFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, declarations: [ConfiguratorAttributeInputFieldComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeInputFieldComponent] });
ConfiguratorAttributeInputFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_string: ConfiguratorAttributeInputFieldComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_string: ConfiguratorAttributeInputFieldComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeInputFieldComponent],
                    exports: [ConfiguratorAttributeInputFieldComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1pbnB1dC1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL2lucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtaW5wdXQtZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixVQUFVLEVBQ1Ysb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFNUQsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7O0FBdUIxRyxNQUFNLE9BQU8scUNBQXFDOztrSUFBckMscUNBQXFDO21JQUFyQyxxQ0FBcUMsaUJBSGpDLHdDQUF3QyxhQWhCckQsbUJBQW1CO1FBQ25CLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFVBQVU7UUFDVixvQkFBb0IsYUFZWix3Q0FBd0M7bUlBRXZDLHFDQUFxQyxhQVpyQztRQUNULG9CQUFvQixDQUF5QztZQUMzRCxtQkFBbUIsRUFBRTtnQkFDbkIsVUFBVSxFQUFFO29CQUNWLG9CQUFvQixFQUFFLHdDQUF3QztpQkFDL0Q7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWZDLG1CQUFtQjtRQUNuQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixVQUFVO1FBQ1Ysb0JBQW9COzJGQWNYLHFDQUFxQztrQkFyQmpELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBeUM7NEJBQzNELG1CQUFtQixFQUFFO2dDQUNuQixVQUFVLEVBQUU7b0NBQ1Ysb0JBQW9CLEVBQUUsd0NBQXdDO2lDQUMvRDs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLHdDQUF3QyxDQUFDO29CQUN4RCxPQUFPLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQztpQkFDcEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtaW5wdXQtZmllbGQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnPntcbiAgICAgIHByb2R1Y3RDb25maWd1cmF0b3I6IHtcbiAgICAgICAgYXNzaWdubWVudDoge1xuICAgICAgICAgIEF0dHJpYnV0ZVR5cGVfc3RyaW5nOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVJbnB1dEZpZWxkQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZE1vZHVsZSB7fVxuIl19