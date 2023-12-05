/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard, HamburgerMenuModule, PageLayoutComponent, } from '@spartacus/storefront';
import { VariantConfiguratorInteractiveLayoutModule } from './variant-configurator-interactive-layout.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
export class VariantConfiguratorInteractiveModule {
}
VariantConfiguratorInteractiveModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorInteractiveModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, imports: [i1.RouterModule, HamburgerMenuModule,
        VariantConfiguratorInteractiveLayoutModule] });
VariantConfiguratorInteractiveModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                data: {
                    cxRoute: 'configureCPQCONFIGURATOR',
                },
                component: PageLayoutComponent,
                canActivate: [CmsPageGuard],
            },
        ]),
        HamburgerMenuModule,
        VariantConfiguratorInteractiveLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                data: {
                                    cxRoute: 'configureCPQCONFIGURATOR',
                                },
                                component: PageLayoutComponent,
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        HamburgerMenuModule,
                        VariantConfiguratorInteractiveLayoutModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3ItaW50ZXJhY3RpdmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L3ZhcmlhbnQvdmFyaWFudC1jb25maWd1cmF0b3ItaW50ZXJhY3RpdmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixtQkFBbUIsR0FDcEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsMENBQTBDLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7O0FBRTlHOzs7R0FHRztBQW1CSCxNQUFNLE9BQU8sb0NBQW9DOztpSUFBcEMsb0NBQW9DO2tJQUFwQyxvQ0FBb0MsNkJBSjdDLG1CQUFtQjtRQUNuQiwwQ0FBMEM7a0lBR2pDLG9DQUFvQyxZQWhCN0MsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNwQjtnQkFDRSxvREFBb0Q7Z0JBQ3BELGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSwwQkFBMEI7aUJBQ3BDO2dCQUNELFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUM1QjtTQUNGLENBQUM7UUFDRixtQkFBbUI7UUFDbkIsMENBQTBDOzJGQUdqQyxvQ0FBb0M7a0JBbEJoRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxvREFBb0Q7Z0NBQ3BELGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsSUFBSSxFQUFFO29DQUNKLE9BQU8sRUFBRSwwQkFBMEI7aUNBQ3BDO2dDQUNELFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQzs2QkFDNUI7eUJBQ0YsQ0FBQzt3QkFDRixtQkFBbUI7d0JBQ25CLDBDQUEwQztxQkFDM0M7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc1BhZ2VHdWFyZCxcbiAgSGFtYnVyZ2VyTWVudU1vZHVsZSxcbiAgUGFnZUxheW91dENvbXBvbmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFZhcmlhbnRDb25maWd1cmF0b3JJbnRlcmFjdGl2ZUxheW91dE1vZHVsZSB9IGZyb20gJy4vdmFyaWFudC1jb25maWd1cmF0b3ItaW50ZXJhY3RpdmUtbGF5b3V0Lm1vZHVsZSc7XG5cbi8qKlxuICogVGFrZXMgY2FyZSBvZiB0aGUgaW50ZXJhY3RpdmUgY29uZmlndXJhdGlvbiBwcm9jZXNzICh0aGUgdXNlciBlbnRlcnMgbmV3IGF0dHJpYnV0ZSB2YWx1ZXMgYW5kIG5hdmlnYXRlcyB0aHJvdWdoIHRoZSBjb25maWd1cmF0aW9uKS5cbiAqIFByb3ZpZGVzIHJvdXRpbmcsIGFzc2lnbm1lbnQgb2YgbmcgY29tcG9uZW50cyB0byBDTVMgY29tcG9uZW50cyBhbmQgYXNzaWdubWVudCBvZiBDTVMgY29tcG9uZW50cyB0byB0aGUgbGF5b3V0IHNsb3RzXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBXZSBjYW4gbmVpdGhlciBvbWl0IHRoZSBwYXRoIG5vciBzZXQgdG8gdW5kZWZpbmVkXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGN4Um91dGU6ICdjb25maWd1cmVDUFFDT05GSUdVUkFUT1InLFxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgIH0sXG4gICAgXSksXG4gICAgSGFtYnVyZ2VyTWVudU1vZHVsZSxcbiAgICBWYXJpYW50Q29uZmlndXJhdG9ySW50ZXJhY3RpdmVMYXlvdXRNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhbnRDb25maWd1cmF0b3JJbnRlcmFjdGl2ZU1vZHVsZSB7fVxuIl19