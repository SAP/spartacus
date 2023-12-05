/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, } from '@angular/core';
import { ContainerBackgroundOptions, PageType, } from '@spartacus/core';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "../../../shared/components/media/media.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "../../../shared/components/spinner/spinner.component";
export class VideoComponent {
    constructor(component, mediaService, urlService, cmsService, cd) {
        this.component = component;
        this.mediaService = mediaService;
        this.urlService = urlService;
        this.cmsService = cmsService;
        this.cd = cd;
        this.data$ = this.component.data$.pipe(distinctUntilChanged(), tap((data) => {
            this.styleClasses = data.styleClasses;
            this.setMedia(data);
            this.setControls(data);
            this.setRouting(data);
        }));
    }
    setMedia(data) {
        if (data.video) {
            this.source = this.mediaService.getMedia(data.video)?.src;
        }
        if (data?.containerBackground ===
            ContainerBackgroundOptions.UPLOAD_RESPONSIVE_IMAGE &&
            data?.videoMedia) {
            this.thumbnail = this.mediaService.getMedia(data.videoMedia);
        }
        else if (data?.thumbnailSelector === ContainerBackgroundOptions.UPLOAD_THUMBNAIL &&
            data?.thumbnail) {
            this.thumbnail = this.mediaService.getMedia(data.thumbnail);
        }
        else {
            this.thumbnail = undefined;
        }
    }
    setControls(data) {
        this.autoPlay = data.autoPlay === 'true';
        this.loop = data.loop === 'true';
        this.mute = data.mute === 'true' ? 'muted' : undefined;
    }
    setRouting(data) {
        if (data.url) {
            this.routerLink = data.url;
        }
        else if (data.contentPage) {
            this.cmsService
                .getPage({
                id: data.contentPage,
                type: PageType.CONTENT_PAGE,
            })
                .pipe(take(1))
                .subscribe((page) => {
                this.routerLink = page?.label;
                this.cd.markForCheck();
            });
        }
        else if (data.product) {
            this.routerLink = this.urlService.transform({
                cxRoute: 'product',
                params: { code: data.product },
            });
        }
        else if (data.category) {
            this.routerLink = this.urlService.transform({
                cxRoute: 'category',
                params: { code: data.category },
            });
        }
    }
}
VideoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VideoComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.MediaService }, { token: i3.SemanticPathService }, { token: i3.CmsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
VideoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VideoComponent, selector: "cx-video", host: { properties: { "class": "this.styleClasses" } }, ngImport: i0, template: "<div\n  *ngIf=\"data$ | async as data; else loading\"\n  class=\"video-container\"\n  tabindex=\"-1\"\n>\n  <a *ngIf=\"data.overlayTitle\" [routerLink]=\"routerLink\">{{\n    data.overlayTitle\n  }}</a>\n  <video\n    *ngIf=\"source\"\n    [style.height.px]=\"data.videoContainerHeight\"\n    controls\n    [poster]=\"thumbnail?.src\"\n    [loop]=\"loop\"\n    [autoplay]=\"autoPlay\"\n    [muted]=\"mute\"\n    [attr.aria-label]=\"'player.label' | cxTranslate\"\n    [src]=\"source\"\n  ></video>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i6.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VideoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-video', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"data$ | async as data; else loading\"\n  class=\"video-container\"\n  tabindex=\"-1\"\n>\n  <a *ngIf=\"data.overlayTitle\" [routerLink]=\"routerLink\">{{\n    data.overlayTitle\n  }}</a>\n  <video\n    *ngIf=\"source\"\n    [style.height.px]=\"data.videoContainerHeight\"\n    controls\n    [poster]=\"thumbnail?.src\"\n    [loop]=\"loop\"\n    [autoplay]=\"autoPlay\"\n    [muted]=\"mute\"\n    [attr.aria-label]=\"'player.label' | cxTranslate\"\n    [src]=\"source\"\n  ></video>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.MediaService }, { type: i3.SemanticPathService }, { type: i3.CmsService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { styleClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9jb250ZW50L3ZpZGVvL3ZpZGVvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC92aWRlby92aWRlby5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCwwQkFBMEIsRUFDMUIsUUFBUSxHQUVULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFhakUsTUFBTSxPQUFPLGNBQWM7SUFvQnpCLFlBQ1ksU0FBOEMsRUFDOUMsWUFBMEIsRUFDMUIsVUFBK0IsRUFDL0IsVUFBc0IsRUFDdEIsRUFBcUI7UUFKckIsY0FBUyxHQUFULFNBQVMsQ0FBcUM7UUFDOUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7UUFDL0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWZqQyxVQUFLLEdBQWtDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDOUQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJ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QUFZO3NCQUFqQyxXQUFXO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zU2VydmljZSxcbiAgQ21zVmlkZW9Db21wb25lbnQsXG4gIENvbnRhaW5lckJhY2tncm91bmRPcHRpb25zLFxuICBQYWdlVHlwZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5pbXBvcnQge1xuICBNZWRpYSxcbiAgTWVkaWFDb250YWluZXIsXG59IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL21lZGlhL21lZGlhLm1vZGVsJztcbmltcG9ydCB7IE1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL21lZGlhL21lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC12aWRlbycsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWRlby5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBWaWRlb0NvbXBvbmVudCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBzdHlsZUNsYXNzZXM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBzb3VyY2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdGh1bWJuYWlsOiBNZWRpYSB8IHVuZGVmaW5lZDtcbiAgcm91dGVyTGluazogc3RyaW5nIHwgYW55W10gfCB1bmRlZmluZWQ7XG4gIGF1dG9QbGF5OiBib29sZWFuO1xuICBsb29wOiBib29sZWFuO1xuICBtdXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgZGF0YSQ6IE9ic2VydmFibGU8Q21zVmlkZW9Db21wb25lbnQ+ID0gdGhpcy5jb21wb25lbnQuZGF0YSQucGlwZShcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIHRhcCgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zdHlsZUNsYXNzZXMgPSBkYXRhLnN0eWxlQ2xhc3NlcztcbiAgICAgIHRoaXMuc2V0TWVkaWEoZGF0YSk7XG4gICAgICB0aGlzLnNldENvbnRyb2xzKGRhdGEpO1xuICAgICAgdGhpcy5zZXRSb3V0aW5nKGRhdGEpO1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudDogQ21zQ29tcG9uZW50RGF0YTxDbXNWaWRlb0NvbXBvbmVudD4sXG4gICAgcHJvdGVjdGVkIG1lZGlhU2VydmljZTogTWVkaWFTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1cmxTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBzZXRNZWRpYShkYXRhOiBDbXNWaWRlb0NvbXBvbmVudCkge1xuICAgIGlmIChkYXRhLnZpZGVvKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHRoaXMubWVkaWFTZXJ2aWNlLmdldE1lZGlhKGRhdGEudmlkZW8pPy5zcmM7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZGF0YT8uY29udGFpbmVyQmFja2dyb3VuZCA9PT1cbiAgICAgICAgQ29udGFpbmVyQmFja2dyb3VuZE9wdGlvbnMuVVBMT0FEX1JFU1BPTlNJVkVfSU1BR0UgJiZcbiAgICAgIGRhdGE/LnZpZGVvTWVkaWFcbiAgICApIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsID0gdGhpcy5tZWRpYVNlcnZpY2UuZ2V0TWVkaWEoXG4gICAgICAgIGRhdGEudmlkZW9NZWRpYSBhcyBNZWRpYUNvbnRhaW5lclxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZGF0YT8udGh1bWJuYWlsU2VsZWN0b3IgPT09IENvbnRhaW5lckJhY2tncm91bmRPcHRpb25zLlVQTE9BRF9USFVNQk5BSUwgJiZcbiAgICAgIGRhdGE/LnRodW1ibmFpbFxuICAgICkge1xuICAgICAgdGhpcy50aHVtYm5haWwgPSB0aGlzLm1lZGlhU2VydmljZS5nZXRNZWRpYShcbiAgICAgICAgZGF0YS50aHVtYm5haWwgYXMgTWVkaWFDb250YWluZXJcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRDb250cm9scyhkYXRhOiBDbXNWaWRlb0NvbXBvbmVudCkge1xuICAgIHRoaXMuYXV0b1BsYXkgPSBkYXRhLmF1dG9QbGF5ID09PSAndHJ1ZSc7XG4gICAgdGhpcy5sb29wID0gZGF0YS5sb29wID09PSAndHJ1ZSc7XG4gICAgdGhpcy5tdXRlID0gZGF0YS5tdXRlID09PSAndHJ1ZScgPyAnbXV0ZWQnIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFJvdXRpbmcoZGF0YTogQ21zVmlkZW9Db21wb25lbnQpIHtcbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIHRoaXMucm91dGVyTGluayA9IGRhdGEudXJsO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5jb250ZW50UGFnZSkge1xuICAgICAgdGhpcy5jbXNTZXJ2aWNlXG4gICAgICAgIC5nZXRQYWdlKHtcbiAgICAgICAgICBpZDogZGF0YS5jb250ZW50UGFnZSxcbiAgICAgICAgICB0eXBlOiBQYWdlVHlwZS5DT05URU5UX1BBR0UsXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHBhZ2UpID0+IHtcbiAgICAgICAgICB0aGlzLnJvdXRlckxpbmsgPSBwYWdlPy5sYWJlbDtcbiAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvZHVjdCkge1xuICAgICAgdGhpcy5yb3V0ZXJMaW5rID0gdGhpcy51cmxTZXJ2aWNlLnRyYW5zZm9ybSh7XG4gICAgICAgIGN4Um91dGU6ICdwcm9kdWN0JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGRhdGEucHJvZHVjdCB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLmNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnJvdXRlckxpbmsgPSB0aGlzLnVybFNlcnZpY2UudHJhbnNmb3JtKHtcbiAgICAgICAgY3hSb3V0ZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGRhdGEuY2F0ZWdvcnkgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdlxuICAqbmdJZj1cImRhdGEkIHwgYXN5bmMgYXMgZGF0YTsgZWxzZSBsb2FkaW5nXCJcbiAgY2xhc3M9XCJ2aWRlby1jb250YWluZXJcIlxuICB0YWJpbmRleD1cIi0xXCJcbj5cbiAgPGEgKm5nSWY9XCJkYXRhLm92ZXJsYXlUaXRsZVwiIFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmtcIj57e1xuICAgIGRhdGEub3ZlcmxheVRpdGxlXG4gIH19PC9hPlxuICA8dmlkZW9cbiAgICAqbmdJZj1cInNvdXJjZVwiXG4gICAgW3N0eWxlLmhlaWdodC5weF09XCJkYXRhLnZpZGVvQ29udGFpbmVySGVpZ2h0XCJcbiAgICBjb250cm9sc1xuICAgIFtwb3N0ZXJdPVwidGh1bWJuYWlsPy5zcmNcIlxuICAgIFtsb29wXT1cImxvb3BcIlxuICAgIFthdXRvcGxheV09XCJhdXRvUGxheVwiXG4gICAgW211dGVkXT1cIm11dGVcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ3BsYXllci5sYWJlbCcgfCBjeFRyYW5zbGF0ZVwiXG4gICAgW3NyY109XCJzb3VyY2VcIlxuICA+PC92aWRlbz5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2xvYWRpbmc+XG4gIDxkaXYgY2xhc3M9XCJjeC1zcGlubmVyXCI+PGN4LXNwaW5uZXI+PC9jeC1zcGlubmVyPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==