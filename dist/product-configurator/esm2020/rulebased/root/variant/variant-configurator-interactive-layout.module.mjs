/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 *  Contains the layout configuration for the interactive configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorInteractiveModule is active
 */
export class VariantConfiguratorInteractiveLayoutModule {
}
VariantConfiguratorInteractiveLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorInteractiveLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule });
VariantConfiguratorInteractiveLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                VariantConfigurationTemplate: {
                    header: {
                        lg: {
                            slots: [
                                'PreHeader',
                                'SiteLogo',
                                'VariantConfigExitButton',
                                'MiniCart',
                            ],
                        },
                        xs: {
                            slots: [
                                'PreHeader',
                                'SiteLogo',
                                'VariantConfigExitButton',
                                'MiniCart',
                            ],
                        },
                    },
                    navigation: {
                        lg: { slots: [] },
                        slots: ['VariantConfigMenu'],
                    },
                    lg: {
                        slots: [
                            'VariantConfigHeader',
                            'VariantConfigMenu',
                            'VariantConfigContent',
                            'VariantConfigBottombar',
                            'VariantConfigVariantCarousel',
                        ],
                    },
                    slots: [
                        'VariantConfigHeader',
                        'VariantConfigContent',
                        'VariantConfigBottombar',
                        'VariantConfigVariantCarousel',
                    ],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                VariantConfigurationTemplate: {
                                    header: {
                                        lg: {
                                            slots: [
                                                'PreHeader',
                                                'SiteLogo',
                                                'VariantConfigExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                        xs: {
                                            slots: [
                                                'PreHeader',
                                                'SiteLogo',
                                                'VariantConfigExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                    },
                                    navigation: {
                                        lg: { slots: [] },
                                        slots: ['VariantConfigMenu'],
                                    },
                                    lg: {
                                        slots: [
                                            'VariantConfigHeader',
                                            'VariantConfigMenu',
                                            'VariantConfigContent',
                                            'VariantConfigBottombar',
                                            'VariantConfigVariantCarousel',
                                        ],
                                    },
                                    slots: [
                                        'VariantConfigHeader',
                                        'VariantConfigContent',
                                        'VariantConfigBottombar',
                                        'VariantConfigVariantCarousel',
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3ItaW50ZXJhY3RpdmUtbGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLWludGVyYWN0aXZlLWxheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBR3ZEOzs7OztHQUtHO0FBbURILE1BQU0sT0FBTywwQ0FBMEM7O3VJQUExQywwQ0FBMEM7d0lBQTFDLDBDQUEwQzt3SUFBMUMsMENBQTBDLGFBakQxQztRQUNULG9CQUFvQixDQUFlO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCw0QkFBNEIsRUFBRTtvQkFDNUIsTUFBTSxFQUFFO3dCQUNOLEVBQUUsRUFBRTs0QkFDRixLQUFLLEVBQUU7Z0NBQ0wsV0FBVztnQ0FDWCxVQUFVO2dDQUNWLHlCQUF5QjtnQ0FDekIsVUFBVTs2QkFDWDt5QkFDRjt3QkFDRCxFQUFFLEVBQUU7NEJBQ0YsS0FBSyxFQUFFO2dDQUNMLFdBQVc7Z0NBQ1gsVUFBVTtnQ0FDVix5QkFBeUI7Z0NBQ3pCLFVBQVU7NkJBQ1g7eUJBQ0Y7cUJBQ0Y7b0JBRUQsVUFBVSxFQUFFO3dCQUNWLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0JBQ2pCLEtBQUssRUFBRSxDQUFDLG1CQUFtQixDQUFDO3FCQUM3QjtvQkFFRCxFQUFFLEVBQUU7d0JBQ0YsS0FBSyxFQUFFOzRCQUNMLHFCQUFxQjs0QkFDckIsbUJBQW1COzRCQUNuQixzQkFBc0I7NEJBQ3RCLHdCQUF3Qjs0QkFDeEIsOEJBQThCO3lCQUMvQjtxQkFDRjtvQkFFRCxLQUFLLEVBQUU7d0JBQ0wscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsOEJBQThCO3FCQUMvQjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNIOzJGQUVVLDBDQUEwQztrQkFsRHRELFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFlOzRCQUNqQyxXQUFXLEVBQUU7Z0NBQ1gsNEJBQTRCLEVBQUU7b0NBQzVCLE1BQU0sRUFBRTt3Q0FDTixFQUFFLEVBQUU7NENBQ0YsS0FBSyxFQUFFO2dEQUNMLFdBQVc7Z0RBQ1gsVUFBVTtnREFDVix5QkFBeUI7Z0RBQ3pCLFVBQVU7NkNBQ1g7eUNBQ0Y7d0NBQ0QsRUFBRSxFQUFFOzRDQUNGLEtBQUssRUFBRTtnREFDTCxXQUFXO2dEQUNYLFVBQVU7Z0RBQ1YseUJBQXlCO2dEQUN6QixVQUFVOzZDQUNYO3lDQUNGO3FDQUNGO29DQUVELFVBQVUsRUFBRTt3Q0FDVixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO3dDQUNqQixLQUFLLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztxQ0FDN0I7b0NBRUQsRUFBRSxFQUFFO3dDQUNGLEtBQUssRUFBRTs0Q0FDTCxxQkFBcUI7NENBQ3JCLG1CQUFtQjs0Q0FDbkIsc0JBQXNCOzRDQUN0Qix3QkFBd0I7NENBQ3hCLDhCQUE4Qjt5Q0FDL0I7cUNBQ0Y7b0NBRUQsS0FBSyxFQUFFO3dDQUNMLHFCQUFxQjt3Q0FDckIsc0JBQXNCO3dDQUN0Qix3QkFBd0I7d0NBQ3hCLDhCQUE4QjtxQ0FDL0I7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMYXlvdXRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuXG4vKipcbiAqICBDb250YWlucyB0aGUgbGF5b3V0IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBpbnRlcmFjdGl2ZSBjb25maWd1cmF0aW9uIHBhZ2UuIFRoaXMgY29uZmlndXJhdGlvbiBpc1xuICogIG9wdGlvbmFsIGFzIG9mIHZlcnNpb24gNC4yLCBhbmQgcmVkdWNlcyB0aGUgY29tcG9uZW50cyB0aGF0IGFyZSByZW5kZXJlZCBpbiB0aGUgaGVhZGVyIHNlY3Rpb24uXG4gKiAgSXQgbmVlZHMgdG8gYmUgZXhwbGljaXRseSBpbXBvcnRlZCwgb3RoZXJ3aXNlIHRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cbiAqICBmcm9tIFZhcmlhbnRDb25maWd1cmF0b3JJbnRlcmFjdGl2ZU1vZHVsZSBpcyBhY3RpdmVcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPExheW91dENvbmZpZz57XG4gICAgICBsYXlvdXRTbG90czoge1xuICAgICAgICBWYXJpYW50Q29uZmlndXJhdGlvblRlbXBsYXRlOiB7XG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBsZzoge1xuICAgICAgICAgICAgICBzbG90czogW1xuICAgICAgICAgICAgICAgICdQcmVIZWFkZXInLFxuICAgICAgICAgICAgICAgICdTaXRlTG9nbycsXG4gICAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdFeGl0QnV0dG9uJyxcbiAgICAgICAgICAgICAgICAnTWluaUNhcnQnLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhzOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbXG4gICAgICAgICAgICAgICAgJ1ByZUhlYWRlcicsXG4gICAgICAgICAgICAgICAgJ1NpdGVMb2dvJyxcbiAgICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ0V4aXRCdXR0b24nLFxuICAgICAgICAgICAgICAgICdNaW5pQ2FydCcsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICBsZzogeyBzbG90czogW10gfSxcbiAgICAgICAgICAgIHNsb3RzOiBbJ1ZhcmlhbnRDb25maWdNZW51J10sXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGxnOiB7XG4gICAgICAgICAgICBzbG90czogW1xuICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ0hlYWRlcicsXG4gICAgICAgICAgICAgICdWYXJpYW50Q29uZmlnTWVudScsXG4gICAgICAgICAgICAgICdWYXJpYW50Q29uZmlnQ29udGVudCcsXG4gICAgICAgICAgICAgICdWYXJpYW50Q29uZmlnQm90dG9tYmFyJyxcbiAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdWYXJpYW50Q2Fyb3VzZWwnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnSGVhZGVyJyxcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnQ29udGVudCcsXG4gICAgICAgICAgICAnVmFyaWFudENvbmZpZ0JvdHRvbWJhcicsXG4gICAgICAgICAgICAnVmFyaWFudENvbmZpZ1ZhcmlhbnRDYXJvdXNlbCcsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhbnRDb25maWd1cmF0b3JJbnRlcmFjdGl2ZUxheW91dE1vZHVsZSB7fVxuIl19