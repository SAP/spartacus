/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { CpqConfiguratorPageLayoutHandler } from './cpq-configurator-page-layout-handler';
import * as i0 from "@angular/core";
/**
 *  Contains the layout configuration for the CPQ configurator pages. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from CpqConfiguratorInteractiveModule is active
 */
export class CpqConfiguratorLayoutModule {
}
CpqConfiguratorLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule });
CpqConfiguratorLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                CpqConfigurationTemplate: {
                    header: {
                        lg: {
                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                        },
                        xs: {
                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                        },
                    },
                    headerDisplayOnly: {
                        lg: {
                            slots: [
                                'SiteContext',
                                'SiteLinks',
                                'SiteLogo',
                                'SearchBox',
                                'SiteLogin',
                                'MiniCart',
                                'NavigationBar',
                            ],
                        },
                        xs: {
                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                        },
                    },
                    navigation: {
                        lg: { slots: [] },
                        slots: ['CpqConfigMenu'],
                    },
                    navigationDisplayOnly: {
                        lg: { slots: [] },
                        xs: {
                            slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
                        },
                    },
                    lg: {
                        slots: [
                            'CpqConfigHeader',
                            'CpqConfigBanner',
                            'CpqConfigMenu',
                            'CpqConfigContent',
                            'CpqConfigOverviewBanner',
                            'CpqConfigOverviewContent',
                            'CpqConfigBottombar',
                        ],
                    },
                    slots: [
                        'CpqConfigHeader',
                        'CpqConfigBanner',
                        'CpqConfigContent',
                        'CpqConfigOverviewBanner',
                        'CpqConfigOverviewContent',
                        'CpqConfigBottombar',
                    ],
                },
            },
        }),
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: CpqConfiguratorPageLayoutHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                CpqConfigurationTemplate: {
                                    header: {
                                        lg: {
                                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                                        },
                                        xs: {
                                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                                        },
                                    },
                                    headerDisplayOnly: {
                                        lg: {
                                            slots: [
                                                'SiteContext',
                                                'SiteLinks',
                                                'SiteLogo',
                                                'SearchBox',
                                                'SiteLogin',
                                                'MiniCart',
                                                'NavigationBar',
                                            ],
                                        },
                                        xs: {
                                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                                        },
                                    },
                                    navigation: {
                                        lg: { slots: [] },
                                        slots: ['CpqConfigMenu'],
                                    },
                                    navigationDisplayOnly: {
                                        lg: { slots: [] },
                                        xs: {
                                            slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
                                        },
                                    },
                                    lg: {
                                        slots: [
                                            'CpqConfigHeader',
                                            'CpqConfigBanner',
                                            'CpqConfigMenu',
                                            'CpqConfigContent',
                                            'CpqConfigOverviewBanner',
                                            'CpqConfigOverviewContent',
                                            'CpqConfigBottombar',
                                        ],
                                    },
                                    slots: [
                                        'CpqConfigHeader',
                                        'CpqConfigBanner',
                                        'CpqConfigContent',
                                        'CpqConfigOverviewBanner',
                                        'CpqConfigOverviewContent',
                                        'CpqConfigBottombar',
                                    ],
                                },
                            },
                        }),
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: CpqConfiguratorPageLayoutHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1sYXlvdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L2NwcS9jcHEtY29uZmlndXJhdG9yLWxheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFnQixtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQUUxRjs7Ozs7R0FLRztBQTBFSCxNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixhQXhFM0I7UUFDVCxvQkFBb0IsQ0FBZTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsd0JBQXdCLEVBQUU7b0JBQ3hCLE1BQU0sRUFBRTt3QkFDTixFQUFFLEVBQUU7NEJBQ0YsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsQ0FBQzt5QkFDdkQ7d0JBQ0QsRUFBRSxFQUFFOzRCQUNGLEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUM7eUJBQ3ZEO3FCQUNGO29CQUNELGlCQUFpQixFQUFFO3dCQUNqQixFQUFFLEVBQUU7NEJBQ0YsS0FBSyxFQUFFO2dDQUNMLGFBQWE7Z0NBQ2IsV0FBVztnQ0FDWCxVQUFVO2dDQUNWLFdBQVc7Z0NBQ1gsV0FBVztnQ0FDWCxVQUFVO2dDQUNWLGVBQWU7NkJBQ2hCO3lCQUNGO3dCQUNELEVBQUUsRUFBRTs0QkFDRixLQUFLLEVBQUUsQ0FBQyxXQUFX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Z2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnLCBQQUdFX0xBWU9VVF9IQU5ETEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyIH0gZnJvbSAnLi9jcHEtY29uZmlndXJhdG9yLXBhZ2UtbGF5b3V0LWhhbmRsZXInO1xuXG4vKipcbiAqICBDb250YWlucyB0aGUgbGF5b3V0IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBDUFEgY29uZmlndXJhdG9yIHBhZ2VzLiBUaGlzIGNvbmZpZ3VyYXRpb24gaXNcbiAqICBvcHRpb25hbCBhcyBvZiB2ZXJzaW9uIDQuMiwgYW5kIHJlZHVjZXMgdGhlIGNvbXBvbmVudHMgdGhhdCBhcmUgcmVuZGVyZWQgaW4gdGhlIGhlYWRlciBzZWN0aW9uLlxuICogIEl0IG5lZWRzIHRvIGJlIGV4cGxpY2l0bHkgaW1wb3J0ZWQsIG90aGVyd2lzZSB0aGUgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gKiAgZnJvbSBDcHFDb25maWd1cmF0b3JJbnRlcmFjdGl2ZU1vZHVsZSBpcyBhY3RpdmVcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPExheW91dENvbmZpZz57XG4gICAgICBsYXlvdXRTbG90czoge1xuICAgICAgICBDcHFDb25maWd1cmF0aW9uVGVtcGxhdGU6IHtcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGxnOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbJ1NpdGVMb2dvJywgJ0NwcUNvbmZpZ0V4aXRCdXR0b24nLCAnTWluaUNhcnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4czoge1xuICAgICAgICAgICAgICBzbG90czogWydTaXRlTG9nbycsICdDcHFDb25maWdFeGl0QnV0dG9uJywgJ01pbmlDYXJ0J10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyRGlzcGxheU9ubHk6IHtcbiAgICAgICAgICAgIGxnOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbXG4gICAgICAgICAgICAgICAgJ1NpdGVDb250ZXh0JyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxpbmtzJyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxvZ28nLFxuICAgICAgICAgICAgICAgICdTZWFyY2hCb3gnLFxuICAgICAgICAgICAgICAgICdTaXRlTG9naW4nLFxuICAgICAgICAgICAgICAgICdNaW5pQ2FydCcsXG4gICAgICAgICAgICAgICAgJ05hdmlnYXRpb25CYXInLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhzOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbJ1ByZUhlYWRlcicsICdTaXRlTG9nbycsICdTZWFyY2hCb3gnLCAnTWluaUNhcnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgIGxnOiB7IHNsb3RzOiBbXSB9LFxuICAgICAgICAgICAgc2xvdHM6IFsnQ3BxQ29uZmlnTWVudSddLFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBuYXZpZ2F0aW9uRGlzcGxheU9ubHk6IHtcbiAgICAgICAgICAgIGxnOiB7IHNsb3RzOiBbXSB9LFxuICAgICAgICAgICAgeHM6IHtcbiAgICAgICAgICAgICAgc2xvdHM6IFsnU2l0ZUxvZ2luJywgJ05hdmlnYXRpb25CYXInLCAnU2l0ZUNvbnRleHQnLCAnU2l0ZUxpbmtzJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBsZzoge1xuICAgICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICAgJ0NwcUNvbmZpZ0hlYWRlcicsXG4gICAgICAgICAgICAgICdDcHFDb25maWdCYW5uZXInLFxuICAgICAgICAgICAgICAnQ3BxQ29uZmlnTWVudScsXG4gICAgICAgICAgICAgICdDcHFDb25maWdDb250ZW50JyxcbiAgICAgICAgICAgICAgJ0NwcUNvbmZpZ092ZXJ2aWV3QmFubmVyJyxcbiAgICAgICAgICAgICAgJ0NwcUNvbmZpZ092ZXJ2aWV3Q29udGVudCcsXG4gICAgICAgICAgICAgICdDcHFDb25maWdCb3R0b21iYXInLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICdDcHFDb25maWdIZWFkZXInLFxuICAgICAgICAgICAgJ0NwcUNvbmZpZ0Jhbm5lcicsXG4gICAgICAgICAgICAnQ3BxQ29uZmlnQ29udGVudCcsXG4gICAgICAgICAgICAnQ3BxQ29uZmlnT3ZlcnZpZXdCYW5uZXInLFxuICAgICAgICAgICAgJ0NwcUNvbmZpZ092ZXJ2aWV3Q29udGVudCcsXG4gICAgICAgICAgICAnQ3BxQ29uZmlnQm90dG9tYmFyJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBBR0VfTEFZT1VUX0hBTkRMRVIsXG4gICAgICB1c2VFeGlzdGluZzogQ3BxQ29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JMYXlvdXRNb2R1bGUge31cbiJdfQ==