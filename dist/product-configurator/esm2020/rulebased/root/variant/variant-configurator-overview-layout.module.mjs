/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { VariantConfiguratorPageLayoutHandler } from './variant-configurator-page-layout-handler';
import * as i0 from "@angular/core";
/**
 *  Contains the layout configuration for the overview configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorOverviewModule is active
 */
export class VariantConfiguratorOverviewLayoutModule {
}
VariantConfiguratorOverviewLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOverviewLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule });
VariantConfiguratorOverviewLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                VariantConfigurationOverviewTemplate: {
                    header: {
                        slots: ['SiteLogo', 'VariantConfigOverviewExitButton', 'MiniCart'],
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
                    lg: {
                        slots: [
                            'VariantConfigOverviewHeader',
                            'VariantConfigOverviewBanner',
                            'VariantConfigOverviewNavigation',
                            'VariantConfigOverviewContent',
                            'VariantConfigOverviewBottombar',
                        ],
                    },
                    slots: [
                        'VariantConfigOverviewHeader',
                        'VariantConfigOverviewBanner',
                        'VariantConfigOverviewFilterButton',
                        'VariantConfigOverviewContent',
                        'VariantConfigOverviewBottombar',
                    ],
                },
            },
        }),
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: VariantConfiguratorPageLayoutHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                VariantConfigurationOverviewTemplate: {
                                    header: {
                                        slots: ['SiteLogo', 'VariantConfigOverviewExitButton', 'MiniCart'],
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
                                    lg: {
                                        slots: [
                                            'VariantConfigOverviewHeader',
                                            'VariantConfigOverviewBanner',
                                            'VariantConfigOverviewNavigation',
                                            'VariantConfigOverviewContent',
                                            'VariantConfigOverviewBottombar',
                                        ],
                                    },
                                    slots: [
                                        'VariantConfigOverviewHeader',
                                        'VariantConfigOverviewBanner',
                                        'VariantConfigOverviewFilterButton',
                                        'VariantConfigOverviewContent',
                                        'VariantConfigOverviewBottombar',
                                    ],
                                },
                            },
                        }),
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: VariantConfiguratorPageLayoutHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3Itb3ZlcnZpZXctbGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLW92ZXJ2aWV3LWxheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFnQixtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOztBQUVsRzs7Ozs7R0FLRztBQW1ESCxNQUFNLE9BQU8sdUNBQXVDOztvSUFBdkMsdUNBQXVDO3FJQUF2Qyx1Q0FBdUM7cUlBQXZDLHVDQUF1QyxhQWpEdkM7UUFDVCxvQkFBb0IsQ0FBZTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsb0NBQW9DLEVBQUU7b0JBQ3BDLE1BQU0sRUFBRTt3QkFDTixLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsaUNBQWlDLEVBQUUsVUFBVSxDQUFDO3FCQUNuRTtvQkFDRCxpQkFBaUIsRUFBRTt3QkFDakIsRUFBRSxFQUFFOzRCQUNGLEtBQUssRUFBRTtnQ0FDTCxhQUFhO2dDQUNiLFdBQVc7Z0NBQ1gsVUFBVTtnQ0FDVixXQUFXO2dDQUNYLFdBQVc7Z0NBQ1gsVUFBVTtnQ0FDVixlQUFlOzZCQUNoQjt5QkFDRjt3QkFDRCxFQUFFLEVBQUU7NEJBQ0YsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO3lCQUMxRDtxQkFDRjtvQkFDRCxFQUFFLEVBQUU7d0JBQ0YsS0FBSyxFQUFFOzRCQUNMLDZCQUE2Qjs0QkFDN0IsNkJBQTZCOzRCQUM3QixpQ0FBaUM7NEJBQ2pDLDhCQUE4Qjs0QkFDOUIsZ0NBQWdDO3lCQUNqQztxQkFDRjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsNkJBQTZCO3dCQUM3Qiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsOEJBQThCO3dCQUM5QixnQ0FBZ0M7cUJBQ2pDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO1FBQ0Y7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLHVDQUF1QztrQkFsRG5ELFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFlOzRCQUNqQyxXQUFXLEVBQUU7Z0NBQ1gsb0NBQW9DLEVBQUU7b0NBQ3BDLE1BQU0sRUFBRTt3Q0FDTixLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsaUNBQWlDLEVBQUUsVUFBVSxDQUFDO3FDQUNuRTtvQ0FDRCxpQkFBaUIsRUFBRTt3Q0FDakIsRUFBRSxFQUFFOzRDQUNGLEtBQUssRUFBRTtnREFDTCxhQUFhO2dEQUNiLFdBQVc7Z0RBQ1gsVUFBVTtnREFDVixXQUFXO2dEQUNYLFdBQVc7Z0RBQ1gsVUFBVTtnREFDVixlQUFlOzZDQUNoQjt5Q0FDRjt3Q0FDRCxFQUFFLEVBQUU7NENBQ0YsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO3lDQUMxRDtxQ0FDRjtvQ0FDRCxFQUFFLEVBQUU7d0NBQ0YsS0FBSyxFQUFFOzRDQUNMLDZCQUE2Qjs0Q0FDN0IsNkJBQTZCOzRDQUM3QixpQ0FBaUM7NENBQ2pDLDhCQUE4Qjs0Q0FDOUIsZ0NBQWdDO3lDQUNqQztxQ0FDRjtvQ0FDRCxLQUFLLEVBQUU7d0NBQ0wsNkJBQTZCO3dDQUM3Qiw2QkFBNkI7d0NBQzdCLG1DQUFtQzt3Q0FDbkMsOEJBQThCO3dDQUM5QixnQ0FBZ0M7cUNBQ2pDO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7d0JBQ0Y7NEJBQ0UsT0FBTyxFQUFFLG1CQUFtQjs0QkFDNUIsV0FBVyxFQUFFLG9DQUFvQzs0QkFDakQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnLCBQQUdFX0xBWU9VVF9IQU5ETEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFZhcmlhbnRDb25maWd1cmF0b3JQYWdlTGF5b3V0SGFuZGxlciB9IGZyb20gJy4vdmFyaWFudC1jb25maWd1cmF0b3ItcGFnZS1sYXlvdXQtaGFuZGxlcic7XG5cbi8qKlxuICogIENvbnRhaW5zIHRoZSBsYXlvdXQgY29uZmlndXJhdGlvbiBmb3IgdGhlIG92ZXJ2aWV3IGNvbmZpZ3VyYXRpb24gcGFnZS4gVGhpcyBjb25maWd1cmF0aW9uIGlzXG4gKiAgb3B0aW9uYWwgYXMgb2YgdmVyc2lvbiA0LjIsIGFuZCByZWR1Y2VzIHRoZSBjb21wb25lbnRzIHRoYXQgYXJlIHJlbmRlcmVkIGluIHRoZSBoZWFkZXIgc2VjdGlvbi5cbiAqICBJdCBuZWVkcyB0byBiZSBleHBsaWNpdGx5IGltcG9ydGVkLCBvdGhlcndpc2UgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvblxuICogIGZyb20gVmFyaWFudENvbmZpZ3VyYXRvck92ZXJ2aWV3TW9kdWxlIGlzIGFjdGl2ZVxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8TGF5b3V0Q29uZmlnPntcbiAgICAgIGxheW91dFNsb3RzOiB7XG4gICAgICAgIFZhcmlhbnRDb25maWd1cmF0aW9uT3ZlcnZpZXdUZW1wbGF0ZToge1xuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgc2xvdHM6IFsnU2l0ZUxvZ28nLCAnVmFyaWFudENvbmZpZ092ZXJ2aWV3RXhpdEJ1dHRvbicsICdNaW5pQ2FydCddLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyRGlzcGxheU9ubHk6IHtcbiAgICAgICAgICAgIGxnOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbXG4gICAgICAgICAgICAgICAgJ1NpdGVDb250ZXh0JyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxpbmtzJyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxvZ28nLFxuICAgICAgICAgICAgICAgICdTZWFyY2hCb3gnLFxuICAgICAgICAgICAgICAgICdTaXRlTG9naW4nLFxuICAgICAgICAgICAgICAgICdNaW5pQ2FydCcsXG4gICAgICAgICAgICAgICAgJ05hdmlnYXRpb25CYXInLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhzOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbJ1ByZUhlYWRlcicsICdTaXRlTG9nbycsICdTZWFyY2hCb3gnLCAnTWluaUNhcnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsZzoge1xuICAgICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdPdmVydmlld0hlYWRlcicsXG4gICAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdCYW5uZXInLFxuICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ092ZXJ2aWV3TmF2aWdhdGlvbicsXG4gICAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdDb250ZW50JyxcbiAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdPdmVydmlld0JvdHRvbWJhcicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdIZWFkZXInLFxuICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdPdmVydmlld0Jhbm5lcicsXG4gICAgICAgICAgICAnVmFyaWFudENvbmZpZ092ZXJ2aWV3RmlsdGVyQnV0dG9uJyxcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdDb250ZW50JyxcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdCb3R0b21iYXInLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBBR0VfTEFZT1VUX0hBTkRMRVIsXG4gICAgICB1c2VFeGlzdGluZzogVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVmFyaWFudENvbmZpZ3VyYXRvck92ZXJ2aWV3TGF5b3V0TW9kdWxlIHt9XG4iXX0=