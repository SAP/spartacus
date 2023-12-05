/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { ConfigureCartEntryModule } from '../configure-cart-entry/configure-cart-entry.module';
import { ConfiguratorCartEntryBundleInfoComponent } from './configurator-cart-entry-bundle-info.component';
import * as i0 from "@angular/core";
export class ConfiguratorCartEntryBundleInfoModule {
}
ConfiguratorCartEntryBundleInfoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorCartEntryBundleInfoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, declarations: [ConfiguratorCartEntryBundleInfoComponent], imports: [CommonModule, I18nModule, ConfigureCartEntryModule] });
ConfiguratorCartEntryBundleInfoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_BUNDLE_DETAILS,
            position: OutletPosition.AFTER,
            component: ConfiguratorCartEntryBundleInfoComponent,
        }),
    ], imports: [CommonModule, I18nModule, ConfigureCartEntryModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfigureCartEntryModule],
                    declarations: [ConfiguratorCartEntryBundleInfoComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_BUNDLE_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ConfiguratorCartEntryBundleInfoComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNhcnQtZW50cnktYnVuZGxlLWluZm8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9jb21wb25lbnRzL2NvbmZpZ3VyYXRvci1jYXJ0LWVudHJ5LWJ1bmRsZS1pbmZvL2NvbmZpZ3VyYXRvci1jYXJ0LWVudHJ5LWJ1bmRsZS1pbmZvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOztBQWMzRyxNQUFNLE9BQU8scUNBQXFDOztrSUFBckMscUNBQXFDO21JQUFyQyxxQ0FBcUMsaUJBVmpDLHdDQUF3QyxhQUQ3QyxZQUFZLEVBQUUsVUFBVSxFQUFFLHdCQUF3QjttSUFXakQscUNBQXFDLGFBUnJDO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxtQkFBbUI7WUFDbkMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzlCLFNBQVMsRUFBRSx3Q0FBd0M7U0FDcEQsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFVBQVUsRUFBRSx3QkFBd0I7MkZBV2pELHFDQUFxQztrQkFaakQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixDQUFDO29CQUM3RCxZQUFZLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQztvQkFFeEQsU0FBUyxFQUFFO3dCQUNULGFBQWEsQ0FBQzs0QkFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLG1CQUFtQjs0QkFDbkMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLOzRCQUM5QixTQUFTLEVBQUUsd0NBQXdDO3lCQUNwRCxDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJ0T3V0bGV0cyB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiwgcHJvdmlkZU91dGxldCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmVDYXJ0RW50cnlNb2R1bGUgfSBmcm9tICcuLi9jb25maWd1cmUtY2FydC1lbnRyeS9jb25maWd1cmUtY2FydC1lbnRyeS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ2FydEVudHJ5QnVuZGxlSW5mb0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWNhcnQtZW50cnktYnVuZGxlLWluZm8uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQ29uZmlndXJlQ2FydEVudHJ5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQ2FydEVudHJ5QnVuZGxlSW5mb0NvbXBvbmVudF0sXG5cbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZU91dGxldCh7XG4gICAgICBpZDogQ2FydE91dGxldHMuSVRFTV9CVU5ETEVfREVUQUlMUyxcbiAgICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbi5BRlRFUixcbiAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yQ2FydEVudHJ5QnVuZGxlSW5mb0NvbXBvbmVudCxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQ2FydEVudHJ5QnVuZGxlSW5mb01vZHVsZSB7fVxuIl19