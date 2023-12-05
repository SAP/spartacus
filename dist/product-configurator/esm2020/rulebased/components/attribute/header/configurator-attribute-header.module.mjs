/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeHeaderComponent } from './configurator-attribute-header.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeHeaderModule {
}
ConfiguratorAttributeHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, declarations: [ConfiguratorAttributeHeaderComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule], exports: [ConfiguratorAttributeHeaderComponent] });
ConfiguratorAttributeHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    Header: ConfiguratorAttributeHeaderComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        NgSelectModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    Header: ConfiguratorAttributeHeaderComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeHeaderComponent],
                    exports: [ConfiguratorAttributeHeaderComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9oZWFkZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBdUJqRyxNQUFNLE9BQU8saUNBQWlDOzs4SEFBakMsaUNBQWlDOytIQUFqQyxpQ0FBaUMsaUJBSDdCLG9DQUFvQyxhQWhCakQsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixjQUFjLGFBWU4sb0NBQW9DOytIQUVuQyxpQ0FBaUMsYUFaakM7UUFDVCxvQkFBb0IsQ0FBeUM7WUFDM0QsbUJBQW1CLEVBQUU7Z0JBQ25CLFVBQVUsRUFBRTtvQkFDVixNQUFNLEVBQUUsb0NBQW9DO2lCQUM3QzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBZkMsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixjQUFjOzJGQWNMLGlDQUFpQztrQkFyQjdDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixjQUFjO3FCQUNmO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBeUM7NEJBQzNELG1CQUFtQixFQUFFO2dDQUNuQixVQUFVLEVBQUU7b0NBQ1YsTUFBTSxFQUFFLG9DQUFvQztpQ0FDN0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztvQkFDcEQsT0FBTyxFQUFFLENBQUMsb0NBQW9DLENBQUM7aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnPntcbiAgICAgIHByb2R1Y3RDb25maWd1cmF0b3I6IHtcbiAgICAgICAgYXNzaWdubWVudDoge1xuICAgICAgICAgIEhlYWRlcjogQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZUhlYWRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUhlYWRlck1vZHVsZSB7fVxuIl19