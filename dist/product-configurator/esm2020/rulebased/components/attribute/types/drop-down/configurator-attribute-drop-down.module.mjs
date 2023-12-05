/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';
import { ConfiguratorAttributeNumericInputFieldModule } from '../numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeInputFieldModule } from '../input-field/configurator-attribute-input-field.module';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeDropDownModule {
}
ConfiguratorAttributeDropDownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeDropDownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, declarations: [ConfiguratorAttributeDropDownComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeDropDownComponent] });
ConfiguratorAttributeDropDownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_dropdown: ConfiguratorAttributeDropDownComponent,
                    AttributeType_dropdown_add: ConfiguratorAttributeDropDownComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_dropdown: ConfiguratorAttributeDropDownComponent,
                                    AttributeType_dropdown_add: ConfiguratorAttributeDropDownComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeDropDownComponent],
                    exports: [ConfiguratorAttributeDropDownComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1kcm9wLWRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9kcm9wLWRvd24vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1kcm9wLWRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLDBEQUEwRCxDQUFDOztBQTZCakgsTUFBTSxPQUFPLG1DQUFtQzs7Z0lBQW5DLG1DQUFtQztpSUFBbkMsbUNBQW1DLGlCQUgvQixzQ0FBc0MsYUF0Qm5ELFlBQVk7UUFDWixtQ0FBbUM7UUFDbkMsV0FBVztRQUNYLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsNENBQTRDO1FBQzVDLHFDQUFxQztRQUNyQyxvQkFBb0IsYUFhWixzQ0FBc0M7aUlBRXJDLG1DQUFtQyxhQWJuQztRQUNULG9CQUFvQixDQUF5QztZQUMzRCxtQkFBbUIsRUFBRTtnQkFDbkIsVUFBVSxFQUFFO29CQUNWLHNCQUFzQixFQUFFLHNDQUFzQztvQkFDOUQsMEJBQTBCLEVBQUUsc0NBQXNDO2lCQUNuRTthQUNGO1NBQ0YsQ0FBQztLQUNILFlBckJDLFlBQVk7UUFDWixtQ0FBbUM7UUFDbkMsV0FBVztRQUNYLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsNENBQTRDO1FBQzVDLHFDQUFxQztRQUNyQyxvQkFBb0I7MkZBZVgsbUNBQW1DO2tCQTNCL0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQ0FBbUM7d0JBQ25DLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLDRDQUE0Qzt3QkFDNUMscUNBQXFDO3dCQUNyQyxvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBeUM7NEJBQzNELG1CQUFtQixFQUFFO2dDQUNuQixVQUFVLEVBQUU7b0NBQ1Ysc0JBQXNCLEVBQUUsc0NBQXNDO29DQUM5RCwwQkFBMEIsRUFBRSxzQ0FBc0M7aUNBQ25FOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsc0NBQXNDLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLHNDQUFzQyxDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7XG4gIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEtleWJvYXJkRm9jdXNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db25maWcgfSBmcm9tICcuLi8uLi9jb21wb3NpdGlvbi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNvbXBvc2l0aW9uLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUgfSBmcm9tICcuLi8uLi9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVEcm9wRG93bkNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1kcm9wLWRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vbnVtZXJpYy1pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRNb2R1bGUgfSBmcm9tICcuLi9pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWlucHV0LWZpZWxkLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZE1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnPntcbiAgICAgIHByb2R1Y3RDb25maWd1cmF0b3I6IHtcbiAgICAgICAgYXNzaWdubWVudDoge1xuICAgICAgICAgIEF0dHJpYnV0ZVR5cGVfZHJvcGRvd246IENvbmZpZ3VyYXRvckF0dHJpYnV0ZURyb3BEb3duQ29tcG9uZW50LFxuICAgICAgICAgIEF0dHJpYnV0ZVR5cGVfZHJvcGRvd25fYWRkOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVEcm9wRG93bkNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZURyb3BEb3duQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZURyb3BEb3duQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlRHJvcERvd25Nb2R1bGUge31cbiJdfQ==