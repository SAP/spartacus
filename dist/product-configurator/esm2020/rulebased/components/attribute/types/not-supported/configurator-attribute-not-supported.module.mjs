/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeNotSupportedComponent } from './configurator-attribute-not-supported.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeNotSupportedModule {
}
ConfiguratorAttributeNotSupportedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeNotSupportedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, declarations: [ConfiguratorAttributeNotSupportedComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorAttributeNotSupportedComponent] });
ConfiguratorAttributeNotSupportedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_not_implemented: ConfiguratorAttributeNotSupportedComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_not_implemented: ConfiguratorAttributeNotSupportedComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeNotSupportedComponent],
                    exports: [ConfiguratorAttributeNotSupportedComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1ub3Qtc3VwcG9ydGVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbm90LXN1cHBvcnRlZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW5vdC1zdXBwb3J0ZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkUsT0FBTyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7O0FBaUI5RyxNQUFNLE9BQU8sdUNBQXVDOztvSUFBdkMsdUNBQXVDO3FJQUF2Qyx1Q0FBdUMsaUJBSG5DLDBDQUEwQyxhQVgvQyxZQUFZLEVBQUUsVUFBVSxhQVl4QiwwQ0FBMEM7cUlBRXpDLHVDQUF1QyxhQWJ2QztRQUNULG9CQUFvQixDQUF5QztZQUMzRCxtQkFBbUIsRUFBRTtnQkFDbkIsVUFBVSxFQUFFO29CQUNWLDZCQUE2QixFQUMzQiwwQ0FBMEM7aUJBQzdDO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFWUyxZQUFZLEVBQUUsVUFBVTsyRkFjdkIsdUNBQXVDO2tCQWZuRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7b0JBQ25DLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBeUM7NEJBQzNELG1CQUFtQixFQUFFO2dDQUNuQixVQUFVLEVBQUU7b0NBQ1YsNkJBQTZCLEVBQzNCLDBDQUEwQztpQ0FDN0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztvQkFDMUQsT0FBTyxFQUFFLENBQUMsMENBQTBDLENBQUM7aUJBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU5vdFN1cHBvcnRlZENvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1ub3Qtc3VwcG9ydGVkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db25maWc+e1xuICAgICAgcHJvZHVjdENvbmZpZ3VyYXRvcjoge1xuICAgICAgICBhc3NpZ25tZW50OiB7XG4gICAgICAgICAgQXR0cmlidXRlVHlwZV9ub3RfaW1wbGVtZW50ZWQ6XG4gICAgICAgICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVOb3RTdXBwb3J0ZWRDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVOb3RTdXBwb3J0ZWRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlTm90U3VwcG9ydGVkQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlTm90U3VwcG9ydGVkTW9kdWxlIHt9XG4iXX0=