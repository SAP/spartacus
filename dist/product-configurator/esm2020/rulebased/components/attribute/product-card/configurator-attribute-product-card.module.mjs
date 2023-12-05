/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule, MediaModule, } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../price/configurator-price.module';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { ConfiguratorAttributeQuantityModule } from '../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeProductCardModule {
}
ConfiguratorAttributeProductCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeProductCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, declarations: [ConfiguratorAttributeProductCardComponent], imports: [CommonModule,
        ConfiguratorShowMoreModule,
        ConfiguratorAttributeQuantityModule,
        I18nModule,
        RouterModule,
        UrlModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorPriceModule,
        KeyboardFocusModule,
        IconModule], exports: [ConfiguratorAttributeProductCardComponent] });
ConfiguratorAttributeProductCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, imports: [CommonModule,
        ConfiguratorShowMoreModule,
        ConfiguratorAttributeQuantityModule,
        I18nModule,
        RouterModule,
        UrlModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorPriceModule,
        KeyboardFocusModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeProductCardComponent],
                    exports: [ConfiguratorAttributeProductCardComponent],
                    imports: [
                        CommonModule,
                        ConfiguratorShowMoreModule,
                        ConfiguratorAttributeQuantityModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MediaModule,
                        ConfiguratorPriceModule,
                        KeyboardFocusModule,
                        IconModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1wcm9kdWN0LWNhcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9wcm9kdWN0LWNhcmQvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1wcm9kdWN0LWNhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUNMLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsV0FBVyxHQUNaLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDM0YsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDekcsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0saURBQWlELENBQUM7O0FBb0I1RyxNQUFNLE9BQU8sc0NBQXNDOzttSUFBdEMsc0NBQXNDO29JQUF0QyxzQ0FBc0MsaUJBakJsQyx5Q0FBeUMsYUFHdEQsWUFBWTtRQUNaLDBCQUEwQjtRQUMxQixtQ0FBbUM7UUFDbkMsVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUNuQixVQUFVLGFBYkYseUNBQXlDO29JQWdCeEMsc0NBQXNDLFlBZC9DLFlBQVk7UUFDWiwwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixZQUFZO1FBQ1osU0FBUztRQUNULFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsV0FBVztRQUNYLHVCQUF1QjtRQUN2QixtQkFBbUI7UUFDbkIsVUFBVTsyRkFHRCxzQ0FBc0M7a0JBbEJsRCxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHlDQUF5QyxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztvQkFDcEQsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osMEJBQTBCO3dCQUMxQixtQ0FBbUM7d0JBQ25DLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixTQUFTO3dCQUNULFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQixVQUFVO3FCQUNYO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgTWVkaWFNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZU1vZHVsZSB9IGZyb20gJy4uLy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yU2hvd01vcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9zaG93LW1vcmUvY29uZmlndXJhdG9yLXNob3ctbW9yZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUgfSBmcm9tICcuLi9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVQcm9kdWN0Q2FyZENvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1wcm9kdWN0LWNhcmQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvclNob3dNb3JlTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1lZGlhTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvclByaWNlTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRNb2R1bGUge31cbiJdfQ==