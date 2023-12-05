/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ComponentFactoryResolver, NgModule, } from '@angular/core';
import { ConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import { KeyboardFocusModule } from '../keyboard-focus/keyboard-focus.module';
import { SkipLinkComponent } from './component/skip-link.component';
import { defaultSkipLinkConfig } from './config/default-skip-link.config';
import { SkipLinkDirective } from './directive/skip-link.directive';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class SkipLinkModule {
}
SkipLinkModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkipLinkModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkModule, declarations: [SkipLinkComponent, SkipLinkDirective], imports: [CommonModule,
        I18nModule, i1.ConfigModule, KeyboardFocusModule], exports: [SkipLinkDirective] });
SkipLinkModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkModule, providers: [
        provideDefaultConfig(defaultSkipLinkConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: skipLinkFactory,
            deps: [ComponentFactoryResolver, OutletService],
            multi: true,
        },
    ], imports: [CommonModule,
        I18nModule,
        ConfigModule.withConfig(defaultSkipLinkConfig),
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfigModule.withConfig(defaultSkipLinkConfig),
                        KeyboardFocusModule,
                    ],
                    declarations: [SkipLinkComponent, SkipLinkDirective],
                    exports: [SkipLinkDirective],
                    providers: [
                        provideDefaultConfig(defaultSkipLinkConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: skipLinkFactory,
                            deps: [ComponentFactoryResolver, OutletService],
                            multi: true,
                        },
                    ],
                }]
        }] });
/**
 * Adds the skip link component before the cx-storefront.
 */
export function skipLinkFactory(componentFactoryResolver, outletService) {
    const isReady = () => {
        const factory = componentFactoryResolver.resolveComponentFactory(SkipLinkComponent);
        outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
    };
    return isReady;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC1saW5rLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkvc2tpcC1saW5rL3NraXAtbGluay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLHdCQUF3QixFQUN4QixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFlBQVksRUFDWixVQUFVLEVBQ1Ysb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBcUJwRSxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQVpWLGlCQUFpQixFQUFFLGlCQUFpQixhQUxqRCxZQUFZO1FBQ1osVUFBVSxtQkFFVixtQkFBbUIsYUFHWCxpQkFBaUI7NEdBV2hCLGNBQWMsYUFWZDtRQUNULG9CQUFvQixDQUFDLHFCQUFxQixDQUFDO1FBQzNDO1lBQ0UsT0FBTyxFQUFFLGVBQWU7WUFDeEIsVUFBVSxFQUFFLGVBQWU7WUFDM0IsSUFBSSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsYUFBYSxDQUFDO1lBQy9DLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQWZDLFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQztRQUM5QyxtQkFBbUI7MkZBY1YsY0FBYztrQkFuQjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDO3dCQUM5QyxtQkFBbUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO29CQUNwRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDNUIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLHFCQUFxQixDQUFDO3dCQUMzQzs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsVUFBVSxFQUFFLGVBQWU7NEJBQzNCLElBQUksRUFBRSxDQUFDLHdCQUF3QixFQUFFLGFBQWEsQ0FBQzs0QkFDL0MsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7O0FBR0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUM3Qix3QkFBa0QsRUFDbEQsYUFBNEI7SUFFNUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxHQUNYLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQU8sT0FBTyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUM7SUFDRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFQUF9JTklUSUFMSVpFUixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBOZ01vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3V0bGV0UG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL291dGxldC9vdXRsZXQubW9kZWwnO1xuaW1wb3J0IHsgT3V0bGV0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5zZXJ2aWNlJztcbmltcG9ydCB7IEtleWJvYXJkRm9jdXNNb2R1bGUgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy9rZXlib2FyZC1mb2N1cy5tb2R1bGUnO1xuaW1wb3J0IHsgU2tpcExpbmtDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudC9za2lwLWxpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRTa2lwTGlua0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtc2tpcC1saW5rLmNvbmZpZyc7XG5pbXBvcnQgeyBTa2lwTGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3NraXAtbGluay5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoZGVmYXVsdFNraXBMaW5rQ29uZmlnKSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtTa2lwTGlua0NvbXBvbmVudCwgU2tpcExpbmtEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbU2tpcExpbmtEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0U2tpcExpbmtDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IHNraXBMaW5rRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE91dGxldFNlcnZpY2VdLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2tpcExpbmtNb2R1bGUge31cblxuLyoqXG4gKiBBZGRzIHRoZSBza2lwIGxpbmsgY29tcG9uZW50IGJlZm9yZSB0aGUgY3gtc3RvcmVmcm9udC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNraXBMaW5rRmFjdG9yeShcbiAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIG91dGxldFNlcnZpY2U6IE91dGxldFNlcnZpY2Vcbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBpc1JlYWR5ID0gKCkgPT4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPVxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFNraXBMaW5rQ29tcG9uZW50KTtcbiAgICBvdXRsZXRTZXJ2aWNlLmFkZCgnY3gtc3RvcmVmcm9udCcsIDxhbnk+ZmFjdG9yeSwgT3V0bGV0UG9zaXRpb24uQkVGT1JFKTtcbiAgfTtcbiAgcmV0dXJuIGlzUmVhZHk7XG59XG4iXX0=