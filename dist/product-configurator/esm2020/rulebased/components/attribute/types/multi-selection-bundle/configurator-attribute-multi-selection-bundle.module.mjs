/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeMultiSelectionBundleModule {
}
ConfiguratorAttributeMultiSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeMultiSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, declarations: [ConfiguratorAttributeMultiSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeMultiSelectionBundleComponent] });
ConfiguratorAttributeMultiSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_checkBoxListProduct: ConfiguratorAttributeMultiSelectionBundleComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_checkBoxListProduct: ConfiguratorAttributeMultiSelectionBundleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
                    exports: [ConfiguratorAttributeMultiSelectionBundleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYnVuZGxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdkgsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDNUcsT0FBTyxFQUFFLGtEQUFrRCxFQUFFLE1BQU0sMkRBQTJELENBQUM7O0FBNkIvSCxNQUFNLE9BQU8sK0NBQStDOzs0SUFBL0MsK0NBQStDOzZJQUEvQywrQ0FBK0MsaUJBSDNDLGtEQUFrRCxhQXJCL0QsWUFBWTtRQUNaLHNDQUFzQztRQUN0QyxXQUFXO1FBQ1gsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxtQ0FBbUM7UUFDbkMsdUJBQXVCLGFBYWYsa0RBQWtEOzZJQUVqRCwrQ0FBK0MsYUFiL0M7UUFDVCxvQkFBb0IsQ0FBeUM7WUFDM0QsbUJBQW1CLEVBQUU7Z0JBQ25CLFVBQVUsRUFBRTtvQkFDVixpQ0FBaUMsRUFDL0Isa0RBQWtEO2lCQUNyRDthQUNGO1NBQ0YsQ0FBQztLQUNILFlBcEJDLFlBQVk7UUFDWixzQ0FBc0M7UUFDdEMsV0FBVztRQUNYLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsbUNBQW1DO1FBQ25DLHVCQUF1QjsyRkFlZCwrQ0FBK0M7a0JBMUIzRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHNDQUFzQzt3QkFDdEMsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsbUNBQW1DO3dCQUNuQyx1QkFBdUI7cUJBQ3hCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBeUM7NEJBQzNELG1CQUFtQixFQUFFO2dDQUNuQixVQUFVLEVBQUU7b0NBQ1YsaUNBQWlDLEVBQy9CLGtEQUFrRDtpQ0FDckQ7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxrREFBa0QsQ0FBQztvQkFDbEUsT0FBTyxFQUFFLENBQUMsa0RBQWtELENBQUM7aUJBQzlEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEtleWJvYXJkRm9jdXNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVByb2R1Y3RDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJvZHVjdC1jYXJkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uQnVuZGxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tcG9zaXRpb24vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jb21wb3NpdGlvbi5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVByb2R1Y3RDYXJkTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZz57XG4gICAgICBwcm9kdWN0Q29uZmlndXJhdG9yOiB7XG4gICAgICAgIGFzc2lnbm1lbnQ6IHtcbiAgICAgICAgICBBdHRyaWJ1dGVUeXBlX2NoZWNrQm94TGlzdFByb2R1Y3Q6XG4gICAgICAgICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJ1bmRsZUNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uQnVuZGxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uQnVuZGxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CdW5kbGVNb2R1bGUge31cbiJdfQ==