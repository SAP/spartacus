/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeCheckboxListModule {
}
ConfiguratorAttributeCheckboxListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCheckboxListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, declarations: [ConfiguratorAttributeCheckBoxListComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeCheckBoxListComponent] });
ConfiguratorAttributeCheckboxListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_checkBoxList: ConfiguratorAttributeCheckBoxListComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_checkBoxList: ConfiguratorAttributeCheckBoxListComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeCheckBoxListComponent],
                    exports: [ConfiguratorAttributeCheckBoxListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jaGVja2JveC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvY2hlY2tib3gtbGlzdC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNoZWNrYm94LWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOztBQXlCOUcsTUFBTSxPQUFPLHVDQUF1Qzs7b0lBQXZDLHVDQUF1QztxSUFBdkMsdUNBQXVDLGlCQUhuQywwQ0FBMEMsYUFsQnZELG1CQUFtQjtRQUNuQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixVQUFVO1FBQ1YsbUNBQW1DO1FBQ25DLHVCQUF1QixhQWFmLDBDQUEwQztxSUFFekMsdUNBQXVDLGFBYnZDO1FBQ1Qsb0JBQW9CLENBQXlDO1lBQzNELG1CQUFtQixFQUFFO2dCQUNuQixVQUFVLEVBQUU7b0JBQ1YsMEJBQTBCLEVBQ3hCLDBDQUEwQztpQkFDN0M7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWpCQyxtQkFBbUI7UUFDbkIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLG1DQUFtQztRQUNuQyx1QkFBdUI7MkZBZWQsdUNBQXVDO2tCQXZCbkQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixVQUFVO3dCQUNWLG1DQUFtQzt3QkFDbkMsdUJBQXVCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQXlDOzRCQUMzRCxtQkFBbUIsRUFBRTtnQ0FDbkIsVUFBVSxFQUFFO29DQUNWLDBCQUEwQixFQUN4QiwwQ0FBMEM7aUNBQzdDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMENBQTBDLENBQUM7b0JBQzFELE9BQU8sRUFBRSxDQUFDLDBDQUEwQyxDQUFDO2lCQUN0RCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tcG9zaXRpb24vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jb21wb3NpdGlvbi5jb25maWcnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tCb3hMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNoZWNrYm94LWxpc3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JQcmljZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnPntcbiAgICAgIHByb2R1Y3RDb25maWd1cmF0b3I6IHtcbiAgICAgICAgYXNzaWdubWVudDoge1xuICAgICAgICAgIEF0dHJpYnV0ZVR5cGVfY2hlY2tCb3hMaXN0OlxuICAgICAgICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tCb3hMaXN0Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tCb3hMaXN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZUNoZWNrQm94TGlzdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNoZWNrYm94TGlzdE1vZHVsZSB7fVxuIl19