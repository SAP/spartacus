/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeSingleSelectionBundleModule {
}
ConfiguratorAttributeSingleSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, declarations: [ConfiguratorAttributeSingleSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionBundleComponent] });
ConfiguratorAttributeSingleSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_radioGroupProduct: ConfiguratorAttributeSingleSelectionBundleComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        ItemCounterModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_radioGroupProduct: ConfiguratorAttributeSingleSelectionBundleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL3NpbmdsZS1zZWxlY3Rpb24tYnVuZGxlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1idW5kbGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdkgsT0FBTyxFQUFFLG1EQUFtRCxFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDakksT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDNUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBOEJuRixNQUFNLE9BQU8sZ0RBQWdEOzs2SUFBaEQsZ0RBQWdEOzhJQUFoRCxnREFBZ0QsaUJBSDVDLG1EQUFtRCxhQXRCaEUsWUFBWTtRQUNaLHNDQUFzQztRQUN0QyxtQ0FBbUM7UUFDbkMsV0FBVztRQUNYLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULHVCQUF1QixhQWFmLG1EQUFtRDs4SUFFbEQsZ0RBQWdELGFBYmhEO1FBQ1Qsb0JBQW9CLENBQXlDO1lBQzNELG1CQUFtQixFQUFFO2dCQUNuQixVQUFVLEVBQUU7b0JBQ1YsK0JBQStCLEVBQzdCLG1EQUFtRDtpQkFDdEQ7YUFDRjtTQUNGLENBQUM7S0FDSCxZQXJCQyxZQUFZO1FBQ1osc0NBQXNDO1FBQ3RDLG1DQUFtQztRQUNuQyxXQUFXO1FBQ1gsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsdUJBQXVCOzJGQWVkLGdEQUFnRDtrQkEzQjVELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osc0NBQXNDO3dCQUN0QyxtQ0FBbUM7d0JBQ25DLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsdUJBQXVCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQXlDOzRCQUMzRCxtQkFBbUIsRUFBRTtnQ0FDbkIsVUFBVSxFQUFFO29DQUNWLCtCQUErQixFQUM3QixtREFBbUQ7aUNBQ3REOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsbURBQW1ELENBQUM7b0JBQ25FLE9BQU8sRUFBRSxDQUFDLG1EQUFtRCxDQUFDO2lCQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJdGVtQ291bnRlck1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVQcm9kdWN0Q2FyZE1vZHVsZSB9IGZyb20gJy4uLy4uL3Byb2R1Y3QtY2FyZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLXByb2R1Y3QtY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uQnVuZGxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLXNpbmdsZS1zZWxlY3Rpb24tYnVuZGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByaWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHJpY2UvY29uZmlndXJhdG9yLXByaWNlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVQcm9kdWN0Q2FyZE1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEl0ZW1Db3VudGVyTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvclByaWNlTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db25maWc+e1xuICAgICAgcHJvZHVjdENvbmZpZ3VyYXRvcjoge1xuICAgICAgICBhc3NpZ25tZW50OiB7XG4gICAgICAgICAgQXR0cmlidXRlVHlwZV9yYWRpb0dyb3VwUHJvZHVjdDpcbiAgICAgICAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJ1bmRsZUNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJ1bmRsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVNb2R1bGUge31cbiJdfQ==