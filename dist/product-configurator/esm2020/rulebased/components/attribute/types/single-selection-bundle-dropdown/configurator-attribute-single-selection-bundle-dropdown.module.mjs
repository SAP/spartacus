/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeSingleSelectionBundleDropdownComponent } from './configurator-attribute-single-selection-bundle-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeSingleSelectionBundleDropdownModule {
}
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent] });
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_dropdownProduct: ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_dropdownProduct: ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS1kcm9wZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL3NpbmdsZS1zZWxlY3Rpb24tYnVuZGxlLWRyb3Bkb3duL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1idW5kbGUtZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDJEQUEyRCxFQUFFLE1BQU0scUVBQXFFLENBQUM7QUFDbEosT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQTZCbkYsTUFBTSxPQUFPLHdEQUF3RDs7cUpBQXhELHdEQUF3RDtzSkFBeEQsd0RBQXdELGlCQUhwRCwyREFBMkQsYUFyQnhFLFlBQVk7UUFDWixzQ0FBc0M7UUFDdEMsV0FBVztRQUNYLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLG1CQUFtQjtRQUNuQixtQ0FBbUM7UUFDbkMsdUJBQXVCO1FBQ3ZCLG9CQUFvQixhQWFaLDJEQUEyRDtzSkFFMUQsd0RBQXdELGFBYnhEO1FBQ1Qsb0JBQW9CLENBQXlDO1lBQzNELG1CQUFtQixFQUFFO2dCQUNuQixVQUFVLEVBQUU7b0JBQ1YsNkJBQTZCLEVBQzNCLDJEQUEyRDtpQkFDOUQ7YUFDRjtTQUNGLENBQUM7S0FDSCxZQXBCQyxZQUFZO1FBQ1osc0NBQXNDO1FBQ3RDLFdBQVc7UUFDWCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsbUNBQW1DO1FBQ25DLHVCQUF1QjtRQUN2QixvQkFBb0I7MkZBZVgsd0RBQXdEO2tCQTFCcEUsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixzQ0FBc0M7d0JBQ3RDLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsbUJBQW1CO3dCQUNuQixtQ0FBbUM7d0JBQ25DLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQXlDOzRCQUMzRCxtQkFBbUIsRUFBRTtnQ0FDbkIsVUFBVSxFQUFFO29DQUNWLDZCQUE2QixFQUMzQiwyREFBMkQ7aUNBQzlEOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkRBQTJELENBQUM7b0JBQzNFLE9BQU8sRUFBRSxDQUFDLDJEQUEyRCxDQUFDO2lCQUN2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS1kcm9wZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVByb2R1Y3RDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJvZHVjdC1jYXJkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByaWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHJpY2UvY29uZmlndXJhdG9yLXByaWNlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVQcm9kdWN0Q2FyZE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JQcmljZU1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnPntcbiAgICAgIHByb2R1Y3RDb25maWd1cmF0b3I6IHtcbiAgICAgICAgYXNzaWdubWVudDoge1xuICAgICAgICAgIEF0dHJpYnV0ZVR5cGVfZHJvcGRvd25Qcm9kdWN0OlxuICAgICAgICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uQnVuZGxlRHJvcGRvd25Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVEcm9wZG93bkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVEcm9wZG93bkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJ1bmRsZURyb3Bkb3duTW9kdWxlIHt9XG4iXX0=