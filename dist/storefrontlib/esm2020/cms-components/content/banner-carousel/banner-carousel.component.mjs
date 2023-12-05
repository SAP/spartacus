/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/index";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/common";
import * as i4 from "../../../cms-structure/page/component/component-wrapper.directive";
import * as i5 from "../../../shared/components/carousel/carousel.component";
/**
 * Generic carousel that renders CMS Components.
 */
export class BannerCarouselComponent {
    constructor(componentData, cmsService) {
        this.componentData = componentData;
        this.cmsService = cmsService;
        this.componentData$ = this.componentData.data$.pipe(filter((data) => Boolean(data)), tap((d) => (this.theme = `${d.effect}-theme`)));
        this.items$ = this.componentData$.pipe(map((data) => data.banners?.trim().split(' ') ?? []), map((codes) => codes.map((code) => this.cmsService.getComponentData(code))));
        /**
         * Adds a specific theme for the carousel. The effect can be
         * used in CSS customisations.
         */
        this.theme = '';
    }
    /**
     * Returns an Obervable with an Array of Observables. This is done, so that
     * the component UI could consider to lazy load the UI components when they're
     * in the viewpoint.
     */
    getItems() {
        return this.items$;
    }
}
BannerCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerCarouselComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Component });
BannerCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BannerCarouselComponent, selector: "cx-banner-carousel", host: { properties: { "class": "this.theme" } }, ngImport: i0, template: "<cx-carousel\n  *ngIf=\"getItems() | async as items\"\n  [items]=\"items\"\n  [template]=\"template\"\n  itemWidth=\"100%\"\n  class=\"inline-navigation\"\n></cx-carousel>\n\n<ng-template #template let-item=\"item\">\n  <ng-container\n    [cxComponentWrapper]=\"{\n      flexType: item.typeCode,\n      typeCode: item.typeCode,\n      uid: item?.uid\n    }\"\n  >\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.ComponentWrapperDirective, selector: "[cxComponentWrapper]", inputs: ["cxComponentWrapper"], outputs: ["cxComponentRef"] }, { kind: "component", type: i5.CarouselComponent, selector: "cx-carousel", inputs: ["title", "items", "template", "itemWidth", "hideIndicators", "indicatorIcon", "previousIcon", "nextIcon"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-banner-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-carousel\n  *ngIf=\"getItems() | async as items\"\n  [items]=\"items\"\n  [template]=\"template\"\n  itemWidth=\"100%\"\n  class=\"inline-navigation\"\n></cx-carousel>\n\n<ng-template #template let-item=\"item\">\n  <ng-container\n    [cxComponentWrapper]=\"{\n      flexType: item.typeCode,\n      typeCode: item.typeCode,\n      uid: item?.uid\n    }\"\n  >\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.CmsService }]; }, propDecorators: { theme: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXItY2Fyb3VzZWwvYmFubmVyLWNhcm91c2VsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXItY2Fyb3VzZWwvYmFubmVyLWNhcm91c2VsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9oRixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQUdsRDs7R0FFRztBQU1ILE1BQU0sT0FBTyx1QkFBdUI7SUFvQmxDLFlBQ1UsYUFBc0MsRUFDdEMsVUFBc0I7UUFEdEIsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBQ3RDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFyQnhCLG1CQUFjLEdBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDdkUsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDL0IsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUN0RCxDQUFDO1FBRU0sV0FBTSxHQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUNwRCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDNUQsQ0FDRixDQUFDO1FBRUo7OztXQUdHO1FBQ21CLFVBQUssR0FBRyxFQUFFLENBQUM7SUFLOUIsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7O29IQWhDVSx1QkFBdUI7d0dBQXZCLHVCQUF1QiwyR0N4QnBDLGtaQWtCQTsyRkRNYSx1QkFBdUI7a0JBTG5DLFNBQVM7K0JBQ0Usb0JBQW9CLG1CQUViLHVCQUF1QixDQUFDLE1BQU07Z0lBb0J6QixLQUFLO3NCQUExQixXQUFXO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQmFubmVyQ2Fyb3VzZWxDb21wb25lbnQgYXMgbW9kZWwsXG4gIENtc1NlcnZpY2UsXG4gIENvbnRlbnRTbG90Q29tcG9uZW50RGF0YSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9pbmRleCc7XG5cbi8qKlxuICogR2VuZXJpYyBjYXJvdXNlbCB0aGF0IHJlbmRlcnMgQ01TIENvbXBvbmVudHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWJhbm5lci1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnYmFubmVyLWNhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEJhbm5lckNhcm91c2VsQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBjb21wb25lbnREYXRhJDogT2JzZXJ2YWJsZTxtb2RlbD4gPSB0aGlzLmNvbXBvbmVudERhdGEuZGF0YSQucGlwZShcbiAgICBmaWx0ZXIoKGRhdGEpID0+IEJvb2xlYW4oZGF0YSkpLFxuICAgIHRhcCgoZDogbW9kZWwpID0+ICh0aGlzLnRoZW1lID0gYCR7ZC5lZmZlY3R9LXRoZW1lYCkpXG4gICk7XG5cbiAgcHJpdmF0ZSBpdGVtcyQ6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxDb250ZW50U2xvdENvbXBvbmVudERhdGE+W10+ID1cbiAgICB0aGlzLmNvbXBvbmVudERhdGEkLnBpcGUoXG4gICAgICBtYXAoKGRhdGEpID0+IGRhdGEuYmFubmVycz8udHJpbSgpLnNwbGl0KCcgJykgPz8gW10pLFxuICAgICAgbWFwKChjb2RlcykgPT5cbiAgICAgICAgY29kZXMubWFwKChjb2RlKSA9PiB0aGlzLmNtc1NlcnZpY2UuZ2V0Q29tcG9uZW50RGF0YShjb2RlKSlcbiAgICAgIClcbiAgICApO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgc3BlY2lmaWMgdGhlbWUgZm9yIHRoZSBjYXJvdXNlbC4gVGhlIGVmZmVjdCBjYW4gYmVcbiAgICogdXNlZCBpbiBDU1MgY3VzdG9taXNhdGlvbnMuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdGhlbWUgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudERhdGE6IENtc0NvbXBvbmVudERhdGE8bW9kZWw+LFxuICAgIHByaXZhdGUgY21zU2VydmljZTogQ21zU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gT2JlcnZhYmxlIHdpdGggYW4gQXJyYXkgb2YgT2JzZXJ2YWJsZXMuIFRoaXMgaXMgZG9uZSwgc28gdGhhdFxuICAgKiB0aGUgY29tcG9uZW50IFVJIGNvdWxkIGNvbnNpZGVyIHRvIGxhenkgbG9hZCB0aGUgVUkgY29tcG9uZW50cyB3aGVuIHRoZXkncmVcbiAgICogaW4gdGhlIHZpZXdwb2ludC5cbiAgICovXG4gIGdldEl0ZW1zKCk6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxDb250ZW50U2xvdENvbXBvbmVudERhdGE+W10+IHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcyQ7XG4gIH1cbn1cbiIsIjxjeC1jYXJvdXNlbFxuICAqbmdJZj1cImdldEl0ZW1zKCkgfCBhc3luYyBhcyBpdGVtc1wiXG4gIFtpdGVtc109XCJpdGVtc1wiXG4gIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZVwiXG4gIGl0ZW1XaWR0aD1cIjEwMCVcIlxuICBjbGFzcz1cImlubGluZS1uYXZpZ2F0aW9uXCJcbj48L2N4LWNhcm91c2VsPlxuXG48bmctdGVtcGxhdGUgI3RlbXBsYXRlIGxldC1pdGVtPVwiaXRlbVwiPlxuICA8bmctY29udGFpbmVyXG4gICAgW2N4Q29tcG9uZW50V3JhcHBlcl09XCJ7XG4gICAgICBmbGV4VHlwZTogaXRlbS50eXBlQ29kZSxcbiAgICAgIHR5cGVDb2RlOiBpdGVtLnR5cGVDb2RlLFxuICAgICAgdWlkOiBpdGVtPy51aWRcbiAgICB9XCJcbiAgPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=