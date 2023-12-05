/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { PageComponentModule } from '../../../cms-structure/page/component/page-component.module';
import { TabParagraphContainerComponent } from './tab-paragraph-container.component';
import * as i0 from "@angular/core";
export class TabParagraphContainerModule {
}
TabParagraphContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabParagraphContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TabParagraphContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TabParagraphContainerModule, declarations: [TabParagraphContainerComponent], imports: [CommonModule, PageComponentModule, OutletModule, I18nModule], exports: [TabParagraphContainerComponent] });
TabParagraphContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabParagraphContainerModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CMSTabParagraphContainer: {
                    component: TabParagraphContainerComponent,
                },
            },
        }),
    ], imports: [CommonModule, PageComponentModule, OutletModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabParagraphContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PageComponentModule, OutletModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CMSTabParagraphContainer: {
                                    component: TabParagraphContainerComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [TabParagraphContainerComponent],
                    exports: [TabParagraphContainerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXBhcmFncmFwaC1jb250YWluZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9jb250ZW50L3RhYi1wYXJhZ3JhcGgtY29udGFpbmVyL3RhYi1wYXJhZ3JhcGgtY29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFnQnJGLE1BQU0sT0FBTywyQkFBMkI7O3dIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixpQkFIdkIsOEJBQThCLGFBVm5DLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxhQVczRCw4QkFBOEI7eUhBRTdCLDJCQUEyQixhQVozQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix3QkFBd0IsRUFBRTtvQkFDeEIsU0FBUyxFQUFFLDhCQUE4QjtpQkFDMUM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVTsyRkFhMUQsMkJBQTJCO2tCQWR2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO29CQUN0RSxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYix3QkFBd0IsRUFBRTtvQ0FDeEIsU0FBUyxFQUFFLDhCQUE4QjtpQ0FDMUM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDOUMsT0FBTyxFQUFFLENBQUMsOEJBQThCLENBQUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE91dGxldE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5tb2R1bGUnO1xuaW1wb3J0IHsgUGFnZUNvbXBvbmVudE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9jb21wb25lbnQvcGFnZS1jb21wb25lbnQubW9kdWxlJztcbmltcG9ydCB7IFRhYlBhcmFncmFwaENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGFiLXBhcmFncmFwaC1jb250YWluZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGFnZUNvbXBvbmVudE1vZHVsZSwgT3V0bGV0TW9kdWxlLCBJMThuTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENNU1RhYlBhcmFncmFwaENvbnRhaW5lcjoge1xuICAgICAgICAgIGNvbXBvbmVudDogVGFiUGFyYWdyYXBoQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVGFiUGFyYWdyYXBoQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RhYlBhcmFncmFwaENvbnRhaW5lckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFRhYlBhcmFncmFwaENvbnRhaW5lck1vZHVsZSB7fVxuIl19