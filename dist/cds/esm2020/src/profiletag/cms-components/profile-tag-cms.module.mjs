/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeferLoadingStrategy, provideDefaultConfig, } from '@spartacus/core';
import { ProfileTagComponent } from './profile-tag.component';
import * as i0 from "@angular/core";
export class ProfileTagCmsModule {
}
ProfileTagCmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProfileTagCmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, declarations: [ProfileTagComponent], imports: [CommonModule], exports: [ProfileTagComponent] });
ProfileTagCmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProfileTagComponent: {
                    component: ProfileTagComponent,
                    deferLoading: DeferLoadingStrategy.INSTANT,
                },
            },
        }),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProfileTagComponent: {
                                    component: ProfileTagComponent,
                                    deferLoading: DeferLoadingStrategy.INSTANT,
                                },
                            },
                        }),
                    ],
                    exports: [ProfileTagComponent],
                    declarations: [ProfileTagComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWctY21zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9wcm9maWxldGFnL2Ntcy1jb21wb25lbnRzL3Byb2ZpbGUtdGFnLWNtcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBaUI5RCxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsaUJBRmYsbUJBQW1CLGFBWnhCLFlBQVksYUFXWixtQkFBbUI7aUhBR2xCLG1CQUFtQixhQWJuQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixtQkFBbUIsRUFBRTtvQkFDbkIsU0FBUyxFQUFFLG1CQUFtQjtvQkFDOUIsWUFBWSxFQUFFLG9CQUFvQixDQUFDLE9BQU87aUJBQzNDO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFWUyxZQUFZOzJGQWNYLG1CQUFtQjtrQkFmL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLG1CQUFtQixFQUFFO29DQUNuQixTQUFTLEVBQUUsbUJBQW1CO29DQUM5QixZQUFZLEVBQUUsb0JBQW9CLENBQUMsT0FBTztpQ0FDM0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIERlZmVyTG9hZGluZ1N0cmF0ZWd5LFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFByb2ZpbGVUYWdDb21wb25lbnQgfSBmcm9tICcuL3Byb2ZpbGUtdGFnLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgUHJvZmlsZVRhZ0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUHJvZmlsZVRhZ0NvbXBvbmVudCxcbiAgICAgICAgICBkZWZlckxvYWRpbmc6IERlZmVyTG9hZGluZ1N0cmF0ZWd5LklOU1RBTlQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBleHBvcnRzOiBbUHJvZmlsZVRhZ0NvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1Byb2ZpbGVUYWdDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlVGFnQ21zTW9kdWxlIHt9XG4iXX0=