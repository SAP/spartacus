/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseCoreModule } from '@spartacus/core';
import { GlobalMessageComponentModule } from './cms-components/misc/global-message/global-message.module';
import { OutletRefModule } from './cms-structure/outlet/outlet-ref/outlet-ref.module';
import { OutletModule } from './cms-structure/outlet/outlet.module';
import { PageComponentModule } from './cms-structure/page/component/page-component.module';
import { PageLayoutModule } from './cms-structure/page/page-layout/page-layout.module';
import { PageSlotModule } from './cms-structure/page/slot/page-slot.module';
import { PwaModule } from './cms-structure/pwa/pwa.module';
import { RoutingModule } from './cms-structure/routing/routing.module';
import { SeoModule } from './cms-structure/seo/seo.module';
import { KeyboardFocusModule } from './layout/a11y/keyboard-focus/keyboard-focus.module';
import { SkipLinkModule } from './layout/a11y/skip-link/skip-link.module';
import { LayoutModule } from './layout/layout.module';
import { StorefrontComponentModule } from './layout/main/storefront-component.module';
import { MediaModule } from './shared/components/media/media.module';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./cms-structure/page/component/page-component.module";
import * as i3 from "./cms-structure/routing/routing.module";
import * as i4 from "./shared/components/media/media.module";
import * as i5 from "./cms-structure/outlet/outlet.module";
export class BaseStorefrontModule {
}
BaseStorefrontModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseStorefrontModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BaseStorefrontModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BaseStorefrontModule, imports: [i1.BaseCoreModule, RouterModule,
        GlobalMessageComponentModule,
        OutletModule,
        OutletRefModule,
        PwaModule,
        PageLayoutModule,
        SeoModule, i2.PageComponentModule, PageSlotModule,
        SkipLinkModule,
        KeyboardFocusModule,
        LayoutModule, i3.RoutingModule, i4.MediaModule, i5.OutletModule, StorefrontComponentModule], exports: [LayoutModule, StorefrontComponentModule] });
BaseStorefrontModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseStorefrontModule, imports: [BaseCoreModule.forRoot(),
        RouterModule,
        GlobalMessageComponentModule,
        OutletModule,
        OutletRefModule,
        PwaModule,
        PageLayoutModule,
        SeoModule,
        PageComponentModule.forRoot(),
        PageSlotModule,
        SkipLinkModule,
        KeyboardFocusModule,
        LayoutModule,
        RoutingModule.forRoot(),
        MediaModule.forRoot(),
        OutletModule.forRoot(),
        StorefrontComponentModule, LayoutModule, StorefrontComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseStorefrontModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BaseCoreModule.forRoot(),
                        RouterModule,
                        GlobalMessageComponentModule,
                        OutletModule,
                        OutletRefModule,
                        PwaModule,
                        PageLayoutModule,
                        SeoModule,
                        PageComponentModule.forRoot(),
                        PageSlotModule,
                        SkipLinkModule,
                        KeyboardFocusModule,
                        LayoutModule,
                        RoutingModule.forRoot(),
                        MediaModule.forRoot(),
                        OutletModule.forRoot(),
                        StorefrontComponentModule,
                    ],
                    exports: [LayoutModule, StorefrontComponentModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zdG9yZWZyb250Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvYmFzZS1zdG9yZWZyb250Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQzFHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOzs7Ozs7O0FBd0JyRSxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsK0JBbkI3QixZQUFZO1FBQ1osNEJBQTRCO1FBQzVCLFlBQVk7UUFDWixlQUFlO1FBQ2YsU0FBUztRQUNULGdCQUFnQjtRQUNoQixTQUFTLDBCQUVULGNBQWM7UUFDZCxjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLFlBQVkscURBSVoseUJBQXlCLGFBRWpCLFlBQVksRUFBRSx5QkFBeUI7a0hBRXRDLG9CQUFvQixZQXBCN0IsY0FBYyxDQUFDLE9BQU8sRUFBRTtRQUN4QixZQUFZO1FBQ1osNEJBQTRCO1FBQzVCLFlBQVk7UUFDWixlQUFlO1FBQ2YsU0FBUztRQUNULGdCQUFnQjtRQUNoQixTQUFTO1FBQ1QsbUJBQW1CLENBQUMsT0FBTyxFQUFFO1FBQzdCLGNBQWM7UUFDZCxjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixhQUFhLENBQUMsT0FBTyxFQUFFO1FBQ3ZCLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDckIsWUFBWSxDQUFDLE9BQU8sRUFBRTtRQUN0Qix5QkFBeUIsRUFFakIsWUFBWSxFQUFFLHlCQUF5QjsyRkFFdEMsb0JBQW9CO2tCQXRCaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYyxDQUFDLE9BQU8sRUFBRTt3QkFDeEIsWUFBWTt3QkFDWiw0QkFBNEI7d0JBQzVCLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixTQUFTO3dCQUNULGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7d0JBQzdCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDdkIsV0FBVyxDQUFDLE9BQU8sRUFBRTt3QkFDckIsWUFBWSxDQUFDLE9BQU8sRUFBRTt3QkFDdEIseUJBQXlCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7aUJBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlQ29yZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlQ29tcG9uZW50TW9kdWxlIH0gZnJvbSAnLi9jbXMtY29tcG9uZW50cy9taXNjL2dsb2JhbC1tZXNzYWdlL2dsb2JhbC1tZXNzYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBPdXRsZXRSZWZNb2R1bGUgfSBmcm9tICcuL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC1yZWYvb3V0bGV0LXJlZi5tb2R1bGUnO1xuaW1wb3J0IHsgT3V0bGV0TW9kdWxlIH0gZnJvbSAnLi9jbXMtc3RydWN0dXJlL291dGxldC9vdXRsZXQubW9kdWxlJztcbmltcG9ydCB7IFBhZ2VDb21wb25lbnRNb2R1bGUgfSBmcm9tICcuL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9jb21wb25lbnQvcGFnZS1jb21wb25lbnQubW9kdWxlJztcbmltcG9ydCB7IFBhZ2VMYXlvdXRNb2R1bGUgfSBmcm9tICcuL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9wYWdlLWxheW91dC9wYWdlLWxheW91dC5tb2R1bGUnO1xuaW1wb3J0IHsgUGFnZVNsb3RNb2R1bGUgfSBmcm9tICcuL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9zbG90L3BhZ2Utc2xvdC5tb2R1bGUnO1xuaW1wb3J0IHsgUHdhTW9kdWxlIH0gZnJvbSAnLi9jbXMtc3RydWN0dXJlL3B3YS9wd2EubW9kdWxlJztcbmltcG9ydCB7IFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2Ntcy1zdHJ1Y3R1cmUvcm91dGluZy9yb3V0aW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBTZW9Nb2R1bGUgfSBmcm9tICcuL2Ntcy1zdHJ1Y3R1cmUvc2VvL3Nlby5tb2R1bGUnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJy4vbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMva2V5Ym9hcmQtZm9jdXMubW9kdWxlJztcbmltcG9ydCB7IFNraXBMaW5rTW9kdWxlIH0gZnJvbSAnLi9sYXlvdXQvYTExeS9za2lwLWxpbmsvc2tpcC1saW5rLm1vZHVsZSc7XG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tICcuL2xheW91dC9sYXlvdXQubW9kdWxlJztcbmltcG9ydCB7IFN0b3JlZnJvbnRDb21wb25lbnRNb2R1bGUgfSBmcm9tICcuL2xheW91dC9tYWluL3N0b3JlZnJvbnQtY29tcG9uZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBNZWRpYU1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL2NvbXBvbmVudHMvbWVkaWEvbWVkaWEubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEJhc2VDb3JlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgR2xvYmFsTWVzc2FnZUNvbXBvbmVudE1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gICAgT3V0bGV0UmVmTW9kdWxlLFxuICAgIFB3YU1vZHVsZSxcbiAgICBQYWdlTGF5b3V0TW9kdWxlLFxuICAgIFNlb01vZHVsZSxcbiAgICBQYWdlQ29tcG9uZW50TW9kdWxlLmZvclJvb3QoKSxcbiAgICBQYWdlU2xvdE1vZHVsZSxcbiAgICBTa2lwTGlua01vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIExheW91dE1vZHVsZSxcbiAgICBSb3V0aW5nTW9kdWxlLmZvclJvb3QoKSxcbiAgICBNZWRpYU1vZHVsZS5mb3JSb290KCksXG4gICAgT3V0bGV0TW9kdWxlLmZvclJvb3QoKSxcbiAgICBTdG9yZWZyb250Q29tcG9uZW50TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbTGF5b3V0TW9kdWxlLCBTdG9yZWZyb250Q29tcG9uZW50TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFzZVN0b3JlZnJvbnRNb2R1bGUge31cbiJdfQ==