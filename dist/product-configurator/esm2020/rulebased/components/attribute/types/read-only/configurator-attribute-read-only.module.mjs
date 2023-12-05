/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeReadOnlyModule {
}
ConfiguratorAttributeReadOnlyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeReadOnlyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, declarations: [ConfiguratorAttributeReadOnlyComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        CommonModule,
        I18nModule], exports: [ConfiguratorAttributeReadOnlyComponent] });
ConfiguratorAttributeReadOnlyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_readonly: ConfiguratorAttributeReadOnlyComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        CommonModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        CommonModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_readonly: ConfiguratorAttributeReadOnlyComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeReadOnlyComponent],
                    exports: [ConfiguratorAttributeReadOnlyComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1yZWFkLW9ubHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9yZWFkLW9ubHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1yZWFkLW9ubHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOztBQXdCdEcsTUFBTSxPQUFPLG1DQUFtQzs7Z0lBQW5DLG1DQUFtQztpSUFBbkMsbUNBQW1DLGlCQUgvQixzQ0FBc0MsYUFoQm5ELG1CQUFtQjtRQUNuQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2QixZQUFZO1FBQ1osVUFBVSxhQVlGLHNDQUFzQztpSUFFckMsbUNBQW1DLGFBWm5DO1FBQ1Qsb0JBQW9CLENBQXlDO1lBQzNELG1CQUFtQixFQUFFO2dCQUNuQixVQUFVLEVBQUU7b0JBQ1Ysc0JBQXNCLEVBQUUsc0NBQXNDO2lCQUMvRDthQUNGO1NBQ0YsQ0FBQztLQUNILFlBZkMsbUJBQW1CO1FBQ25CLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLFlBQVk7UUFDWixVQUFVOzJGQWNELG1DQUFtQztrQkFyQi9DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsWUFBWTt3QkFDWixVQUFVO3FCQUNYO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBeUM7NEJBQzNELG1CQUFtQixFQUFFO2dDQUNuQixVQUFVLEVBQUU7b0NBQ1Ysc0JBQXNCLEVBQUUsc0NBQXNDO2lDQUMvRDs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLHNDQUFzQyxDQUFDO29CQUN0RCxPQUFPLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEtleWJvYXJkRm9jdXNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUmVhZE9ubHlDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcmVhZC1vbmx5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24uY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb25maWd1cmF0b3JQcmljZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29uZmlnPntcbiAgICAgIHByb2R1Y3RDb25maWd1cmF0b3I6IHtcbiAgICAgICAgYXNzaWdubWVudDoge1xuICAgICAgICAgIEF0dHJpYnV0ZVR5cGVfcmVhZG9ubHk6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVJlYWRPbmx5Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlUmVhZE9ubHlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlUmVhZE9ubHlDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVSZWFkT25seU1vZHVsZSB7fVxuIl19