/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/smartedit/root";
export class SmartEditService {
    constructor(cmsService, routingService, baseSiteService, zone, winRef, rendererFactory, config) {
        this.cmsService = cmsService;
        this.routingService = routingService;
        this.baseSiteService = baseSiteService;
        this.zone = zone;
        this.winRef = winRef;
        this.rendererFactory = rendererFactory;
        this.config = config;
        this.isPreviewPage = false;
        if (winRef.nativeWindow) {
            const window = winRef.nativeWindow;
            // rerender components and slots after editing
            window.smartedit = window.smartedit || {};
            window.smartedit.renderComponent = (componentId, componentType, parentId) => {
                return this.renderComponent(componentId, componentType, parentId);
            };
            // reprocess page
            window.smartedit.reprocessPage = this.reprocessPage;
        }
    }
    processCmsPage() {
        this.baseSiteService
            .get()
            .pipe(filter((site) => Boolean(site)), take(1))
            .subscribe((site) => {
            this.defaultPreviewCategoryCode = site.defaultPreviewCategoryCode;
            this.defaultPreviewProductCode = site.defaultPreviewProductCode;
            this.cmsService
                .getCurrentPage()
                .pipe(filter(Boolean))
                .subscribe((cmsPage) => {
                this._currentPageId = cmsPage.pageId;
                // before adding contract to page, we need redirect to that page
                this.goToPreviewPage(cmsPage);
                this.addPageContract(cmsPage);
            });
        });
    }
    /**
     * add CSS classes in a body tag
     */
    addPageContract(cmsPage) {
        const renderer = this.rendererFactory.createRenderer('body', null);
        const element = this.winRef.document.body;
        // remove old page contract
        const previousContract = [];
        Array.from(element.classList).forEach((attr) => previousContract.push(attr));
        previousContract.forEach((attr) => renderer.removeClass(element, attr));
        // add new page contract
        this.addSmartEditContract(element, renderer, cmsPage.properties);
    }
    /**
     * go to the default preview page
     */
    goToPreviewPage(cmsPage) {
        // only the first page is the smartedit preview page
        if (!this.isPreviewPage) {
            this.isPreviewPage = true;
            if (cmsPage.type === PageType.PRODUCT_PAGE &&
                this.defaultPreviewProductCode) {
                this.routingService.go({
                    cxRoute: 'product',
                    params: { code: this.defaultPreviewProductCode, name: '' },
                });
            }
            else if (cmsPage.type === PageType.CATEGORY_PAGE &&
                this.defaultPreviewCategoryCode) {
                this.routingService.go({
                    cxRoute: 'category',
                    params: { code: this.defaultPreviewCategoryCode },
                });
            }
        }
    }
    /**
     * re-render CMS components and slots
     */
    renderComponent(componentId, componentType, parentId) {
        if (componentId) {
            this.zone.run(() => {
                // without parentId, it is slot
                if (!parentId) {
                    if (this._currentPageId) {
                        this.cmsService.refreshPageById(this._currentPageId);
                    }
                    else {
                        this.cmsService.refreshLatestPage();
                    }
                }
                else if (componentType) {
                    this.cmsService.refreshComponent(componentId);
                }
            });
        }
        return true;
    }
    reprocessPage() {
        // TODO: reprocess page API
    }
    /**
     * add smartedit HTML markup contract
     */
    addSmartEditContract(element, renderer, properties) {
        if (properties) {
            // check each group of properties, e.g. smartedit
            Object.keys(properties).forEach((group) => {
                const name = 'data-' + group + '-';
                const groupProps = properties[group];
                // check each property in the group
                Object.keys(groupProps).forEach((propName) => {
                    const propValue = groupProps[propName];
                    if (propName === 'classes') {
                        const classes = propValue.split(' ');
                        classes.forEach((classItem) => {
                            renderer.addClass(element, classItem);
                        });
                    }
                    else {
                        renderer.setAttribute(element, name +
                            propName
                                .split(/(?=[A-Z])/)
                                .join('-')
                                .toLowerCase(), propValue);
                    }
                });
            });
        }
    }
}
SmartEditService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditService, deps: [{ token: i1.CmsService }, { token: i1.RoutingService }, { token: i1.BaseSiteService }, { token: i0.NgZone }, { token: i1.WindowRef }, { token: i0.RendererFactory2 }, { token: i2.SmartEditConfig }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.RoutingService }, { type: i1.BaseSiteService }, { type: i0.NgZone }, { type: i1.WindowRef }, { type: i0.RendererFactory2 }, { type: i2.SmartEditConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3NtYXJ0ZWRpdC9jb3JlL3NlcnZpY2VzL3NtYXJ0LWVkaXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUlMLFFBQVEsR0FHVCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFNOUMsTUFBTSxPQUFPLGdCQUFnQjtJQU8zQixZQUNZLFVBQXNCLEVBQ3RCLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLElBQVksRUFDWixNQUFpQixFQUNqQixlQUFpQyxFQUNqQyxNQUF1QjtRQU52QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBYjNCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBZTVCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBbUIsQ0FBQztZQUMxQyw4Q0FBOEM7WUFDOUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUMxQyxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxDQUNqQyxXQUFtQixFQUNuQixhQUFxQixFQUNyQixRQUFnQixFQUNoQixFQUFFO2dCQUNGLE9BQU8sSUFBSSxDQUFDLGVBQWUs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QzNDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO3dCQUMxQixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFOzRCQUNwQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7eUJBQU07d0JBQ0wsUUFBUSxDQUFDLFlBQVksQ0FDbkIsT0FBTyxFQUNQLElBQUk7NEJBQ0YsUUFBUTtpQ0FDTCxLQUFLLENBQUMsV0FBVyxDQUFDO2lDQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDO2lDQUNULFdBQVcsRUFBRSxFQUNsQixTQUFTLENBQ1YsQ0FBQztxQkFDSDtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs2R0F2S1UsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FGZixNQUFNOzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZVNpdGVTZXJ2aWNlLFxuICBDbXNTZXJ2aWNlLFxuICBQYWdlLFxuICBQYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNtYXJ0RWRpdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvc21hcnRlZGl0L3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU21hcnRFZGl0U2VydmljZSB7XG4gIHByaXZhdGUgaXNQcmV2aWV3UGFnZSA9IGZhbHNlO1xuICBwcml2YXRlIF9jdXJyZW50UGFnZUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBkZWZhdWx0UHJldmlld1Byb2R1Y3RDb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZGVmYXVsdFByZXZpZXdDYXRlZ29yeUNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY21zU2VydmljZTogQ21zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBiYXNlU2l0ZVNlcnZpY2U6IEJhc2VTaXRlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHByb3RlY3RlZCBjb25maWc6IFNtYXJ0RWRpdENvbmZpZ1xuICApIHtcbiAgICBpZiAod2luUmVmLm5hdGl2ZVdpbmRvdykge1xuICAgICAgY29uc3Qgd2luZG93ID0gd2luUmVmLm5hdGl2ZVdpbmRvdyBhcyBhbnk7XG4gICAgICAvLyByZXJlbmRlciBjb21wb25lbnRzIGFuZCBzbG90cyBhZnRlciBlZGl0aW5nXG4gICAgICB3aW5kb3cuc21hcnRlZGl0ID0gd2luZG93LnNtYXJ0ZWRpdCB8fCB7fTtcbiAgICAgIHdpbmRvdy5zbWFydGVkaXQucmVuZGVyQ29tcG9uZW50ID0gKFxuICAgICAgICBjb21wb25lbnRJZDogc3RyaW5nLFxuICAgICAgICBjb21wb25lbnRUeXBlOiBzdHJpbmcsXG4gICAgICAgIHBhcmVudElkOiBzdHJpbmdcbiAgICAgICkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDb21wb25lbnQoY29tcG9uZW50SWQsIGNvbXBvbmVudFR5cGUsIHBhcmVudElkKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHJlcHJvY2VzcyBwYWdlXG4gICAgICB3aW5kb3cuc21hcnRlZGl0LnJlcHJvY2Vzc1BhZ2UgPSB0aGlzLnJlcHJvY2Vzc1BhZ2U7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHByb2Nlc3NDbXNQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuYmFzZVNpdGVTZXJ2aWNlXG4gICAgICAuZ2V0KClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHNpdGU6IGFueSkgPT4gQm9vbGVhbihzaXRlKSksXG4gICAgICAgIHRha2UoMSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHNpdGUpID0+IHtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmlld0NhdGVnb3J5Q29kZSA9IHNpdGUuZGVmYXVsdFByZXZpZXdDYXRlZ29yeUNvZGU7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZpZXdQcm9kdWN0Q29kZSA9IHNpdGUuZGVmYXVsdFByZXZpZXdQcm9kdWN0Q29kZTtcblxuICAgICAgICB0aGlzLmNtc1NlcnZpY2VcbiAgICAgICAgICAuZ2V0Q3VycmVudFBhZ2UoKVxuICAgICAgICAgIC5waXBlKGZpbHRlcjxQYWdlPihCb29sZWFuKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChjbXNQYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGFnZUlkID0gY21zUGFnZS5wYWdlSWQ7XG4gICAgICAgICAgICAvLyBiZWZvcmUgYWRkaW5nIGNvbnRyYWN0IHRvIHBhZ2UsIHdlIG5lZWQgcmVkaXJlY3QgdG8gdGhhdCBwYWdlXG4gICAgICAgICAgICB0aGlzLmdvVG9QcmV2aWV3UGFnZShjbXNQYWdlKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUGFnZUNvbnRyYWN0KGNtc1BhZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIENTUyBjbGFzc2VzIGluIGEgYm9keSB0YWdcbiAgICovXG4gIHByb3RlY3RlZCBhZGRQYWdlQ29udHJhY3QoY21zUGFnZTogUGFnZSkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoJ2JvZHknLCBudWxsKTtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy53aW5SZWYuZG9jdW1lbnQuYm9keTtcblxuICAgIC8vIHJlbW92ZSBvbGQgcGFnZSBjb250cmFjdFxuICAgIGNvbnN0IHByZXZpb3VzQ29udHJhY3Q6IHN0cmluZ1tdID0gW107XG4gICAgQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCkuZm9yRWFjaCgoYXR0cikgPT5cbiAgICAgIHByZXZpb3VzQ29udHJhY3QucHVzaChhdHRyKVxuICAgICk7XG4gICAgcHJldmlvdXNDb250cmFjdC5mb3JFYWNoKChhdHRyKSA9PiByZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBhdHRyKSk7XG5cbiAgICAvLyBhZGQgbmV3IHBhZ2UgY29udHJhY3RcbiAgICB0aGlzLmFkZFNtYXJ0RWRpdENvbnRyYWN0KGVsZW1lbnQsIHJlbmRlcmVyLCBjbXNQYWdlLnByb3BlcnRpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdvIHRvIHRoZSBkZWZhdWx0IHByZXZpZXcgcGFnZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdvVG9QcmV2aWV3UGFnZShjbXNQYWdlOiBQYWdlKSB7XG4gICAgLy8gb25seSB0aGUgZmlyc3QgcGFnZSBpcyB0aGUgc21hcnRlZGl0IHByZXZpZXcgcGFnZVxuICAgIGlmICghdGhpcy5pc1ByZXZpZXdQYWdlKSB7XG4gICAgICB0aGlzLmlzUHJldmlld1BhZ2UgPSB0cnVlO1xuICAgICAgaWYgKFxuICAgICAgICBjbXNQYWdlLnR5cGUgPT09IFBhZ2VUeXBlLlBST0RVQ1RfUEFHRSAmJlxuICAgICAgICB0aGlzLmRlZmF1bHRQcmV2aWV3UHJvZHVjdENvZGVcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgICBjeFJvdXRlOiAncHJvZHVjdCcsXG4gICAgICAgICAgcGFyYW1zOiB7IGNvZGU6IHRoaXMuZGVmYXVsdFByZXZpZXdQcm9kdWN0Q29kZSwgbmFtZTogJycgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBjbXNQYWdlLnR5cGUgPT09IFBhZ2VUeXBlLkNBVEVHT1JZX1BBR0UgJiZcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmlld0NhdGVnb3J5Q29kZVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oe1xuICAgICAgICAgIGN4Um91dGU6ICdjYXRlZ29yeScsXG4gICAgICAgICAgcGFyYW1zOiB7IGNvZGU6IHRoaXMuZGVmYXVsdFByZXZpZXdDYXRlZ29yeUNvZGUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlLXJlbmRlciBDTVMgY29tcG9uZW50cyBhbmQgc2xvdHNcbiAgICovXG4gIHByb3RlY3RlZCByZW5kZXJDb21wb25lbnQoXG4gICAgY29tcG9uZW50SWQ6IHN0cmluZyxcbiAgICBjb21wb25lbnRUeXBlPzogc3RyaW5nLFxuICAgIHBhcmVudElkPzogc3RyaW5nXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmIChjb21wb25lbnRJZCkge1xuICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIC8vIHdpdGhvdXQgcGFyZW50SWQsIGl0IGlzIHNsb3RcbiAgICAgICAgaWYgKCFwYXJlbnRJZCkge1xuICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZUlkKSB7XG4gICAgICAgICAgICB0aGlzLmNtc1NlcnZpY2UucmVmcmVzaFBhZ2VCeUlkKHRoaXMuX2N1cnJlbnRQYWdlSWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNtc1NlcnZpY2UucmVmcmVzaExhdGVzdFBhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgIHRoaXMuY21zU2VydmljZS5yZWZyZXNoQ29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVwcm9jZXNzUGFnZSgpIHtcbiAgICAvLyBUT0RPOiByZXByb2Nlc3MgcGFnZSBBUElcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgc21hcnRlZGl0IEhUTUwgbWFya3VwIGNvbnRyYWN0XG4gICAqL1xuICBwdWJsaWMgYWRkU21hcnRFZGl0Q29udHJhY3QoXG4gICAgZWxlbWVudDogRWxlbWVudCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3BlcnRpZXM6IGFueVxuICApOiB2b2lkIHtcbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgLy8gY2hlY2sgZWFjaCBncm91cCBvZiBwcm9wZXJ0aWVzLCBlLmcuIHNtYXJ0ZWRpdFxuICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9ICdkYXRhLScgKyBncm91cCArICctJztcbiAgICAgICAgY29uc3QgZ3JvdXBQcm9wcyA9IHByb3BlcnRpZXNbZ3JvdXBdO1xuXG4gICAgICAgIC8vIGNoZWNrIGVhY2ggcHJvcGVydHkgaW4gdGhlIGdyb3VwXG4gICAgICAgIE9iamVjdC5rZXlzKGdyb3VwUHJvcHMpLmZvckVhY2goKHByb3BOYW1lKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcFZhbHVlID0gZ3JvdXBQcm9wc1twcm9wTmFtZV07XG4gICAgICAgICAgaWYgKHByb3BOYW1lID09PSAnY2xhc3NlcycpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBwcm9wVmFsdWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NJdGVtOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NJdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgIHByb3BOYW1lXG4gICAgICAgICAgICAgICAgICAuc3BsaXQoLyg/PVtBLVpdKS8pXG4gICAgICAgICAgICAgICAgICAuam9pbignLScpXG4gICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgcHJvcFZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==