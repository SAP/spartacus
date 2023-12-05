/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { IconModule, ItemCounterModule } from '@spartacus/storefront';
import { ConfiguratorAddToCartButtonComponent } from './configurator-add-to-cart-button.component';
import * as i0 from "@angular/core";
export class ConfiguratorAddToCartButtonModule {
}
ConfiguratorAddToCartButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAddToCartButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, declarations: [ConfiguratorAddToCartButtonComponent], imports: [CommonModule,
        I18nModule,
        ItemCounterModule,
        IconModule,
        FeaturesConfigModule], exports: [ConfiguratorAddToCartButtonComponent] });
ConfiguratorAddToCartButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorAddToCartButton: {
                    component: ConfiguratorAddToCartButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        ItemCounterModule,
        IconModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ItemCounterModule,
                        IconModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorAddToCartButton: {
                                    component: ConfiguratorAddToCartButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAddToCartButtonComponent],
                    exports: [ConfiguratorAddToCartButtonComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYWRkLXRvLWNhcnQtYnV0dG9uL2NvbmZpZ3VyYXRvci1hZGQtdG8tY2FydC1idXR0b24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBc0JuRyxNQUFNLE9BQU8saUNBQWlDOzs4SEFBakMsaUNBQWlDOytIQUFqQyxpQ0FBaUMsaUJBSDdCLG9DQUFvQyxhQWZqRCxZQUFZO1FBQ1osVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixVQUFVO1FBQ1Ysb0JBQW9CLGFBWVosb0NBQW9DOytIQUVuQyxpQ0FBaUMsYUFaakM7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsMkJBQTJCLEVBQUU7b0JBQzNCLFNBQVMsRUFBRSxvQ0FBb0M7aUJBQ2hEO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFkQyxZQUFZO1FBQ1osVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixVQUFVO1FBQ1Ysb0JBQW9COzJGQWNYLGlDQUFpQztrQkFwQjdDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixpQkFBaUI7d0JBQ2pCLFVBQVU7d0JBQ1Ysb0JBQW9CO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwyQkFBMkIsRUFBRTtvQ0FDM0IsU0FBUyxFQUFFLG9DQUFvQztpQ0FDaEQ7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztvQkFDcEQsT0FBTyxFQUFFLENBQUMsb0NBQW9DLENBQUM7aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUsIEl0ZW1Db3VudGVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbjoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yQWRkVG9DYXJ0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQWRkVG9DYXJ0QnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbk1vZHVsZSB7fVxuIl19