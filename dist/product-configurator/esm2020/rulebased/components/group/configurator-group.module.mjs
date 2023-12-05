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
import { ConfiguratorAttributeFooterModule } from '../attribute/footer/configurator-attribute-footer.module';
import { ConfiguratorAttributeHeaderModule } from '../attribute/header/configurator-attribute-header.module';
import { ConfiguratorAttributeCheckboxListModule } from '../attribute/types/checkbox-list/configurator-attribute-checkbox-list.module';
import { ConfiguratorAttributeCheckboxModule } from '../attribute/types/checkbox/configurator-attribute-checkbox.module';
import { ConfiguratorAttributeDropDownModule } from '../attribute/types/drop-down/configurator-attribute-drop-down.module';
import { ConfiguratorAttributeInputFieldModule } from '../attribute/types/input-field/configurator-attribute-input-field.module';
import { ConfiguratorAttributeMultiSelectionBundleModule } from '../attribute/types/multi-selection-bundle/configurator-attribute-multi-selection-bundle.module';
import { ConfiguratorAttributeMultiSelectionImageModule } from '../attribute/types/multi-selection-image/configurator-attribute-multi-selection-image.module';
import { ConfiguratorAttributeNumericInputFieldModule } from '../attribute/types/numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeNotSupportedModule } from '../attribute/types/not-supported/configurator-attribute-not-supported.module';
import { ConfiguratorAttributeRadioButtonModule } from '../attribute/types/radio-button/configurator-attribute-radio-button.module';
import { ConfiguratorAttributeReadOnlyModule } from '../attribute/types/read-only/configurator-attribute-read-only.module';
import { ConfiguratorAttributeSingleSelectionBundleDropdownModule } from '../attribute/types/single-selection-bundle-dropdown/configurator-attribute-single-selection-bundle-dropdown.module';
import { ConfiguratorAttributeSingleSelectionBundleModule } from '../attribute/types/single-selection-bundle/configurator-attribute-single-selection-bundle.module';
import { ConfiguratorAttributeSingleSelectionImageModule } from '../attribute/types/single-selection-image/configurator-attribute-single-selection-image.module';
import { ConfiguratorAttributeCompositionModule } from '../attribute/composition/configurator-attribute-composition.module';
import { ConfiguratorConflictDescriptionModule } from '../conflict-description/configurator-conflict-description.module';
import { ConfiguratorConflictSuggestionModule } from '../conflict-suggestion/configurator-conflict-suggestion.module';
import { ConfiguratorGroupComponent } from './configurator-group.component';
import * as i0 from "@angular/core";
export class ConfiguratorGroupModule {
}
ConfiguratorGroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, declarations: [ConfiguratorGroupComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeNotSupportedModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule,
        ConfiguratorAttributeCompositionModule], exports: [ConfiguratorGroupComponent] });
ConfiguratorGroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorForm: {
                    component: ConfiguratorGroupComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeNotSupportedModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule,
        ConfiguratorAttributeCompositionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        NgSelectModule,
                        ConfiguratorAttributeNotSupportedModule,
                        ConfiguratorAttributeInputFieldModule,
                        ConfiguratorAttributeFooterModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeHeaderModule,
                        ConfiguratorAttributeRadioButtonModule,
                        ConfiguratorAttributeSingleSelectionBundleModule,
                        ConfiguratorAttributeMultiSelectionBundleModule,
                        ConfiguratorAttributeReadOnlyModule,
                        ConfiguratorAttributeSingleSelectionImageModule,
                        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
                        ConfiguratorAttributeCheckboxModule,
                        ConfiguratorAttributeCheckboxListModule,
                        ConfiguratorAttributeDropDownModule,
                        ConfiguratorAttributeMultiSelectionImageModule,
                        ConfiguratorConflictDescriptionModule,
                        ConfiguratorConflictSuggestionModule,
                        ConfiguratorAttributeCompositionModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorForm: {
                                    component: ConfiguratorGroupComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupComponent],
                    exports: [ConfiguratorGroupComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9ncm91cC9jb25maWd1cmF0b3ItZ3JvdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBYSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUN6SCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUMzSCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsK0NBQStDLEVBQUUsTUFBTSxnR0FBZ0csQ0FBQztBQUNqSyxPQUFPLEVBQUUsOENBQThDLEVBQUUsTUFBTSw4RkFBOEYsQ0FBQztBQUM5SixPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSwwRkFBMEYsQ0FBQztBQUN4SixPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSw4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dFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVGb290ZXJNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvZm9vdGVyL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtZm9vdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVIZWFkZXJNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvaGVhZGVyL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtaGVhZGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDaGVja2JveExpc3RNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvY2hlY2tib3gtbGlzdC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNoZWNrYm94LWxpc3QubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL3R5cGVzL2NoZWNrYm94L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZURyb3BEb3duTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL3R5cGVzL2Ryb3AtZG93bi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWRyb3AtZG93bi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZE1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWlucHV0LWZpZWxkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJ1bmRsZU1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9tdWx0aS1zZWxlY3Rpb24tYnVuZGxlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25JbWFnZU1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9tdWx0aS1zZWxlY3Rpb24taW1hZ2UvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24taW1hZ2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL3R5cGVzL251bWVyaWMtaW5wdXQtZmllbGQvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVOb3RTdXBwb3J0ZWRNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvbm90LXN1cHBvcnRlZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW5vdC1zdXBwb3J0ZWQubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL3R5cGVzL3JhZGlvLWJ1dHRvbi9jb25maWd1cmF0b3ItYXR0cmlidXRlLXJhZGlvLWJ1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUmVhZE9ubHlNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvcmVhZC1vbmx5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcmVhZC1vbmx5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVEcm9wZG93bk1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS1kcm9wZG93bi9jb25maWd1cmF0b3ItYXR0cmlidXRlLXNpbmdsZS1zZWxlY3Rpb24tYnVuZGxlLWRyb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvc2luZ2xlLXNlbGVjdGlvbi1idW5kbGUvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uSW1hZ2VNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvc2luZ2xlLXNlbGVjdGlvbi1pbWFnZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXNpbmdsZS1zZWxlY3Rpb24taW1hZ2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbmZsaWN0RGVzY3JpcHRpb25Nb2R1bGUgfSBmcm9tICcuLi9jb25mbGljdC1kZXNjcmlwdGlvbi9jb25maWd1cmF0b3ItY29uZmxpY3QtZGVzY3JpcHRpb24ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbmZsaWN0U3VnZ2VzdGlvbk1vZHVsZSB9IGZyb20gJy4uL2NvbmZsaWN0LXN1Z2dlc3Rpb24vY29uZmlndXJhdG9yLWNvbmZsaWN0LXN1Z2dlc3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItZ3JvdXAuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlTm90U3VwcG9ydGVkTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlRm9vdGVyTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUhlYWRlck1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVSYWRpb0J1dHRvbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CdW5kbGVNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlUmVhZE9ubHlNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uSW1hZ2VNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uQnVuZGxlRHJvcGRvd25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tib3hNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tib3hMaXN0TW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZURyb3BEb3duTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uSW1hZ2VNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQ29uZmxpY3REZXNjcmlwdGlvbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JDb25mbGljdFN1Z2dlc3Rpb25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JGb3JtOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDb25maWd1cmF0b3JHcm91cENvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckdyb3VwQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckdyb3VwQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yR3JvdXBNb2R1bGUge31cbiJdfQ==