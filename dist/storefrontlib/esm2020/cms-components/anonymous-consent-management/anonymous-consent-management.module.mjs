/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeferLoadingStrategy, FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { KeyboardFocusModule } from '../../layout/a11y/keyboard-focus/index';
import { AnonymousConsentManagementBannerComponent } from './banner/anonymous-consent-management-banner.component';
import { defaultAnonymousConsentLayoutConfig } from './default-anonymous-consent-layout.config';
import { AnonymousConsentOpenDialogComponent } from './open-dialog/anonymous-consent-open-dialog.component';
import * as i0 from "@angular/core";
export class AnonymousConsentManagementBannerModule {
}
AnonymousConsentManagementBannerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentManagementBannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AnonymousConsentManagementBannerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentManagementBannerModule, declarations: [AnonymousConsentManagementBannerComponent,
        AnonymousConsentOpenDialogComponent], imports: [CommonModule,
        I18nModule,
        FeaturesConfigModule,
        KeyboardFocusModule], exports: [AnonymousConsentManagementBannerComponent,
        AnonymousConsentOpenDialogComponent] });
AnonymousConsentManagementBannerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentManagementBannerModule, providers: [
        provideDefaultConfig(defaultAnonymousConsentLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                AnonymousConsentManagementBannerComponent: {
                    component: AnonymousConsentManagementBannerComponent,
                    deferLoading: DeferLoadingStrategy.INSTANT,
                },
                AnonymousConsentOpenDialogComponent: {
                    component: AnonymousConsentOpenDialogComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        FeaturesConfigModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentManagementBannerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultAnonymousConsentLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                AnonymousConsentManagementBannerComponent: {
                                    component: AnonymousConsentManagementBannerComponent,
                                    deferLoading: DeferLoadingStrategy.INSTANT,
                                },
                                AnonymousConsentOpenDialogComponent: {
                                    component: AnonymousConsentOpenDialogComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        AnonymousConsentManagementBannerComponent,
                        AnonymousConsentOpenDialogComponent,
                    ],
                    exports: [
                        AnonymousConsentManagementBannerComponent,
                        AnonymousConsentOpenDialogComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzLWNvbnNlbnQtbWFuYWdlbWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL2Fub255bW91cy1jb25zZW50LW1hbmFnZW1lbnQvYW5vbnltb3VzLWNvbnNlbnQtbWFuYWdlbWVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUseUNBQXlDLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNuSCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSx1REFBdUQsQ0FBQzs7QUFnQzVHLE1BQU0sT0FBTyxzQ0FBc0M7O21JQUF0QyxzQ0FBc0M7b0lBQXRDLHNDQUFzQyxpQkFSL0MseUNBQXlDO1FBQ3pDLG1DQUFtQyxhQXJCbkMsWUFBWTtRQUNaLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsbUJBQW1CLGFBcUJuQix5Q0FBeUM7UUFDekMsbUNBQW1DO29JQUcxQixzQ0FBc0MsYUF2QnRDO1FBQ1Qsb0JBQW9CLENBQUMsbUNBQW1DLENBQUM7UUFDekQsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHlDQUF5QyxFQUFFO29CQUN6QyxTQUFTLEVBQUUseUNBQXlDO29CQUNwRCxZQUFZLEVBQUUsb0JBQW9CLENBQUMsT0FBTztpQkFDM0M7Z0JBQ0QsbUNBQW1DLEVBQUU7b0JBQ25DLFNBQVMsRUFBRSxtQ0FBbUM7aUJBQy9DO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFsQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsbUJBQW1COzJGQXlCVixzQ0FBc0M7a0JBOUJsRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1Ysb0JBQW9CO3dCQUNwQixtQkFBbUI7cUJBQ3BCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxtQ0FBbUMsQ0FBQzt3QkFDekQsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYix5Q0FBeUMsRUFBRTtvQ0FDekMsU0FBUyxFQUFFLHlDQUF5QztvQ0FDcEQsWUFBWSxFQUFFLG9CQUFvQixDQUFDLE9BQU87aUNBQzNDO2dDQUNELG1DQUFtQyxFQUFFO29DQUNuQyxTQUFTLEVBQUUsbUNBQW1DO2lDQUMvQzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWix5Q0FBeUM7d0JBQ3pDLG1DQUFtQztxQkFDcEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHlDQUF5Qzt3QkFDekMsbUNBQW1DO3FCQUNwQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBEZWZlckxvYWRpbmdTdHJhdGVneSxcbiAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJy4uLy4uL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2luZGV4JztcbmltcG9ydCB7IEFub255bW91c0NvbnNlbnRNYW5hZ2VtZW50QmFubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9iYW5uZXIvYW5vbnltb3VzLWNvbnNlbnQtbWFuYWdlbWVudC1iYW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRBbm9ueW1vdXNDb25zZW50TGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWFub255bW91cy1jb25zZW50LWxheW91dC5jb25maWcnO1xuaW1wb3J0IHsgQW5vbnltb3VzQ29uc2VudE9wZW5EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL29wZW4tZGlhbG9nL2Fub255bW91cy1jb25zZW50LW9wZW4tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QW5vbnltb3VzQ29uc2VudExheW91dENvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEFub255bW91c0NvbnNlbnRNYW5hZ2VtZW50QmFubmVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBBbm9ueW1vdXNDb25zZW50TWFuYWdlbWVudEJhbm5lckNvbXBvbmVudCxcbiAgICAgICAgICBkZWZlckxvYWRpbmc6IERlZmVyTG9hZGluZ1N0cmF0ZWd5LklOU1RBTlQsXG4gICAgICAgIH0sXG4gICAgICAgIEFub255bW91c0NvbnNlbnRPcGVuRGlhbG9nQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBBbm9ueW1vdXNDb25zZW50T3BlbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFub255bW91c0NvbnNlbnRNYW5hZ2VtZW50QmFubmVyQ29tcG9uZW50LFxuICAgIEFub255bW91c0NvbnNlbnRPcGVuRGlhbG9nQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQW5vbnltb3VzQ29uc2VudE1hbmFnZW1lbnRCYW5uZXJDb21wb25lbnQsXG4gICAgQW5vbnltb3VzQ29uc2VudE9wZW5EaWFsb2dDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFub255bW91c0NvbnNlbnRNYW5hZ2VtZW50QmFubmVyTW9kdWxlIHt9XG4iXX0=