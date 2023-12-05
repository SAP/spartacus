/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/components/generic-link/generic-link.component";
import * as i5 from "../../../shared/components/media/media.component";
export class BannerComponent {
    constructor(component, urlService, cmsService) {
        this.component = component;
        this.urlService = urlService;
        this.cmsService = cmsService;
        this.data$ = this.component.data$.pipe(tap((data) => {
            this.setRouterLink(data);
            this.styleClasses = data.styleClasses;
        }));
    }
    /**
     * Returns `_blank` to force opening the link in a new window whenever the
     * `data.external` flag is set to true.
     */
    getTarget(data) {
        return data.external === 'true' || data.external === true ? '_blank' : null;
    }
    setRouterLink(data) {
        if (data.urlLink) {
            this.routerLink = data.urlLink;
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
    getImage(data) {
        if (data.media) {
            if ('url' in data.media) {
                return data.media;
            }
            else {
                return data.media;
            }
        }
    }
}
BannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.SemanticPathService }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Component });
BannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BannerComponent, selector: "cx-banner", host: { properties: { "class": "this.styleClasses" } }, ngImport: i0, template: "<ng-container *ngIf=\"data$ | async as data\">\n  <cx-generic-link\n    *ngIf=\"routerLink\"\n    [url]=\"routerLink\"\n    [target]=\"getTarget(data)\"\n  >\n    <p class=\"headline\" *ngIf=\"data.headline\" [innerHTML]=\"data.headline\"></p>\n    <cx-media [container]=\"getImage(data)\"></cx-media>\n    <p class=\"content\" *ngIf=\"data.content\" [innerHTML]=\"data.content\"></p>\n  </cx-generic-link>\n  <ng-container *cxFeatureLevel=\"'6.3'\">\n    <ng-container *ngIf=\"!routerLink\">\n      <div class=\"no-link\">\n        <p\n          class=\"headline\"\n          *ngIf=\"data.headline\"\n          [innerHTML]=\"data.headline\"\n        ></p>\n        <cx-media [container]=\"getImage(data)\"></cx-media>\n        <p class=\"content\" *ngIf=\"data.content\" [innerHTML]=\"data.content\"></p>\n      </div>\n    </ng-container>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.GenericLinkComponent, selector: "cx-generic-link", inputs: ["url", "target", "id", "class", "style", "title"] }, { kind: "component", type: i5.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i2.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-banner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"data$ | async as data\">\n  <cx-generic-link\n    *ngIf=\"routerLink\"\n    [url]=\"routerLink\"\n    [target]=\"getTarget(data)\"\n  >\n    <p class=\"headline\" *ngIf=\"data.headline\" [innerHTML]=\"data.headline\"></p>\n    <cx-media [container]=\"getImage(data)\"></cx-media>\n    <p class=\"content\" *ngIf=\"data.content\" [innerHTML]=\"data.content\"></p>\n  </cx-generic-link>\n  <ng-container *cxFeatureLevel=\"'6.3'\">\n    <ng-container *ngIf=\"!routerLink\">\n      <div class=\"no-link\">\n        <p\n          class=\"headline\"\n          *ngIf=\"data.headline\"\n          [innerHTML]=\"data.headline\"\n        ></p>\n        <cx-media [container]=\"getImage(data)\"></cx-media>\n        <p class=\"content\" *ngIf=\"data.content\" [innerHTML]=\"data.content\"></p>\n      </div>\n    </ng-container>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.SemanticPathService }, { type: i2.CmsService }]; }, propDecorators: { styleClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXIvYmFubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXIvYmFubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBS0wsUUFBUSxHQUVULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQVEzQyxNQUFNLE9BQU8sZUFBZTtJQVkxQixZQUNZLFNBQStDLEVBQy9DLFVBQStCLEVBQy9CLFVBQXNCO1FBRnRCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQy9DLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFWbEMsVUFBSyxHQUFtQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQy9ELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQU1DLENBQUM7SUFFSjs7O09BR0c7SUFDSCxTQUFTLENBQUMsSUFBd0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUVTLGFBQWEsQ0FBQyxJQUF3QjtRQUM5QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVO2lCQUNaLE9BQU8sQ0FBQztnQkFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3BCLElBQUksRUFBRSxRQUFRLENBQUMsWUFBWTthQUM1QixDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTthQUMvQixDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQXdCO1FBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQWMsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFtQixDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDOzs0R0E1RFUsZUFBZTtnR0FBZixlQUFlLHlHQ3hCNUIsZzNCQXdCQTsyRkRBYSxlQUFlO2tCQUwzQixTQUFTOytCQUNFLFdBQVcsbUJBRUosdUJBQXVCLENBQUMsTUFBTTtrS0FLekIsWUFBWTtzQkFBakMsV0FBVzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENtc0Jhbm5lckNvbXBvbmVudCxcbiAgQ21zU2VydmljZSxcbiAgSW1hZ2UsXG4gIEltYWdlR3JvdXAsXG4gIFBhZ2VUeXBlLFxuICBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50RGF0YSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9tb2RlbC9jbXMtY29tcG9uZW50LWRhdGEnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1iYW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEJhbm5lckNvbXBvbmVudCB7XG4gIHJvdXRlckxpbms6IHN0cmluZyB8IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBzdHlsZUNsYXNzZXM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBkYXRhJDogT2JzZXJ2YWJsZTxDbXNCYW5uZXJDb21wb25lbnQ+ID0gdGhpcy5jb21wb25lbnQuZGF0YSQucGlwZShcbiAgICB0YXAoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0Um91dGVyTGluayhkYXRhKTtcbiAgICAgIHRoaXMuc3R5bGVDbGFzc2VzID0gZGF0YS5zdHlsZUNsYXNzZXM7XG4gICAgfSlcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tcG9uZW50OiBDbXNDb21wb25lbnREYXRhPENtc0Jhbm5lckNvbXBvbmVudD4sXG4gICAgcHJvdGVjdGVkIHVybFNlcnZpY2U6IFNlbWFudGljUGF0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNtc1NlcnZpY2U6IENtc1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGBfYmxhbmtgIHRvIGZvcmNlIG9wZW5pbmcgdGhlIGxpbmsgaW4gYSBuZXcgd2luZG93IHdoZW5ldmVyIHRoZVxuICAgKiBgZGF0YS5leHRlcm5hbGAgZmxhZyBpcyBzZXQgdG8gdHJ1ZS5cbiAgICovXG4gIGdldFRhcmdldChkYXRhOiBDbXNCYW5uZXJDb21wb25lbnQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gZGF0YS5leHRlcm5hbCA9PT0gJ3RydWUnIHx8IGRhdGEuZXh0ZXJuYWwgPT09IHRydWUgPyAnX2JsYW5rJyA6IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0Um91dGVyTGluayhkYXRhOiBDbXNCYW5uZXJDb21wb25lbnQpOiB2b2lkIHtcbiAgICBpZiAoZGF0YS51cmxMaW5rKSB7XG4gICAgICB0aGlzLnJvdXRlckxpbmsgPSBkYXRhLnVybExpbms7XG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbnRlbnRQYWdlKSB7XG4gICAgICB0aGlzLmNtc1NlcnZpY2VcbiAgICAgICAgLmdldFBhZ2Uoe1xuICAgICAgICAgIGlkOiBkYXRhLmNvbnRlbnRQYWdlLFxuICAgICAgICAgIHR5cGU6IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSxcbiAgICAgICAgfSlcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgocGFnZSkgPT4ge1xuICAgICAgICAgIHRoaXMucm91dGVyTGluayA9IHBhZ2U/LmxhYmVsO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvZHVjdCkge1xuICAgICAgdGhpcy5yb3V0ZXJMaW5rID0gdGhpcy51cmxTZXJ2aWNlLnRyYW5zZm9ybSh7XG4gICAgICAgIGN4Um91dGU6ICdwcm9kdWN0JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGRhdGEucHJvZHVjdCB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLmNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnJvdXRlckxpbmsgPSB0aGlzLnVybFNlcnZpY2UudHJhbnNmb3JtKHtcbiAgICAgICAgY3hSb3V0ZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGRhdGEuY2F0ZWdvcnkgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEltYWdlKGRhdGE6IENtc0Jhbm5lckNvbXBvbmVudCk6IEltYWdlIHwgSW1hZ2VHcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGRhdGEubWVkaWEpIHtcbiAgICAgIGlmICgndXJsJyBpbiBkYXRhLm1lZGlhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLm1lZGlhIGFzIEltYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRhdGEubWVkaWEgYXMgSW1hZ2VHcm91cDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhJCB8IGFzeW5jIGFzIGRhdGFcIj5cbiAgPGN4LWdlbmVyaWMtbGlua1xuICAgICpuZ0lmPVwicm91dGVyTGlua1wiXG4gICAgW3VybF09XCJyb3V0ZXJMaW5rXCJcbiAgICBbdGFyZ2V0XT1cImdldFRhcmdldChkYXRhKVwiXG4gID5cbiAgICA8cCBjbGFzcz1cImhlYWRsaW5lXCIgKm5nSWY9XCJkYXRhLmhlYWRsaW5lXCIgW2lubmVySFRNTF09XCJkYXRhLmhlYWRsaW5lXCI+PC9wPlxuICAgIDxjeC1tZWRpYSBbY29udGFpbmVyXT1cImdldEltYWdlKGRhdGEpXCI+PC9jeC1tZWRpYT5cbiAgICA8cCBjbGFzcz1cImNvbnRlbnRcIiAqbmdJZj1cImRhdGEuY29udGVudFwiIFtpbm5lckhUTUxdPVwiZGF0YS5jb250ZW50XCI+PC9wPlxuICA8L2N4LWdlbmVyaWMtbGluaz5cbiAgPG5nLWNvbnRhaW5lciAqY3hGZWF0dXJlTGV2ZWw9XCInNi4zJ1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcm91dGVyTGlua1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vLWxpbmtcIj5cbiAgICAgICAgPHBcbiAgICAgICAgICBjbGFzcz1cImhlYWRsaW5lXCJcbiAgICAgICAgICAqbmdJZj1cImRhdGEuaGVhZGxpbmVcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwiZGF0YS5oZWFkbGluZVwiXG4gICAgICAgID48L3A+XG4gICAgICAgIDxjeC1tZWRpYSBbY29udGFpbmVyXT1cImdldEltYWdlKGRhdGEpXCI+PC9jeC1tZWRpYT5cbiAgICAgICAgPHAgY2xhc3M9XCJjb250ZW50XCIgKm5nSWY9XCJkYXRhLmNvbnRlbnRcIiBbaW5uZXJIVE1MXT1cImRhdGEuY29udGVudFwiPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19