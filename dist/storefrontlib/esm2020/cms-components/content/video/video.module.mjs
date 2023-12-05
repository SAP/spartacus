/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { VideoComponent } from './video.component';
import * as i0 from "@angular/core";
export class VideoModule {
}
VideoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VideoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VideoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VideoModule, declarations: [VideoComponent], imports: [CommonModule,
        RouterModule,
        GenericLinkModule,
        MediaModule,
        I18nModule,
        SpinnerModule], exports: [VideoComponent] });
VideoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VideoModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                VideoComponent: {
                    component: VideoComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        GenericLinkModule,
        MediaModule,
        I18nModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VideoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        GenericLinkModule,
                        MediaModule,
                        I18nModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                VideoComponent: {
                                    component: VideoComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [VideoComponent],
                    exports: [VideoComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9jb250ZW50L3ZpZGVvL3ZpZGVvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBYSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDaEcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUF1Qm5ELE1BQU0sT0FBTyxXQUFXOzt3R0FBWCxXQUFXO3lHQUFYLFdBQVcsaUJBSFAsY0FBYyxhQWhCM0IsWUFBWTtRQUNaLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFVBQVU7UUFDVixhQUFhLGFBWUwsY0FBYzt5R0FFYixXQUFXLGFBWlg7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsY0FBYyxFQUFFO29CQUNkLFNBQVMsRUFBRSxjQUFjO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBZkMsWUFBWTtRQUNaLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFVBQVU7UUFDVixhQUFhOzJGQWNKLFdBQVc7a0JBckJ2QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixjQUFjLEVBQUU7b0NBQ2QsU0FBUyxFQUFFLGNBQWM7aUNBQzFCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUM5QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBHZW5lcmljTGlua01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2dlbmVyaWMtbGluay9nZW5lcmljLWxpbmsubW9kdWxlJztcbmltcG9ydCB7IE1lZGlhTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvbWVkaWEvbWVkaWEubW9kdWxlJztcbmltcG9ydCB7IFZpZGVvQ29tcG9uZW50IH0gZnJvbSAnLi92aWRlby5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBHZW5lcmljTGlua01vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBWaWRlb0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogVmlkZW9Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtWaWRlb0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtWaWRlb0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvTW9kdWxlIHt9XG4iXX0=