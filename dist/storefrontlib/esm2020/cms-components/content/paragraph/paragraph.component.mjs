/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostListener, inject, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.pipe";
export class ParagraphComponent {
    handleClick(event) {
        if (event.target instanceof HTMLAnchorElement) {
            const element = event.target;
            const href = element?.getAttribute('href');
            const documentHost = element.ownerDocument.URL.split('://')[1].split('/')[0];
            // Use router for internal link navigation
            if (href && documentHost === element.host) {
                event.preventDefault();
                this.router.navigateByUrl(href);
            }
        }
    }
    constructor(component, router) {
        this.component = component;
        this.router = router;
        this.sanitizer = inject(DomSanitizer);
    }
    bypassSecurityTrustHtml(html = '') {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
ParagraphComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ParagraphComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
ParagraphComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ParagraphComponent, selector: "cx-paragraph", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  *ngIf=\"component.data$ | async as data\"\n  [innerHTML]=\"bypassSecurityTrustHtml(data.content | cxSupplementHashAnchors)\"\n></div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.SupplementHashAnchorsPipe, name: "cxSupplementHashAnchors" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ParagraphComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-paragraph', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"component.data$ | async as data\"\n  [innerHTML]=\"bypassSecurityTrustHtml(data.content | cxSupplementHashAnchors)\"\n></div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.Router }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0FBVW5FLE1BQU0sT0FBTyxrQkFBa0I7SUFJdEIsV0FBVyxDQUFDLEtBQVk7UUFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxZQUFZLGlCQUFpQixFQUFFO1lBQzdDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUEyQixDQUFDO1lBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0MsTUFBTSxZQUFZLEdBQ2hCLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUQsMENBQTBDO1lBQzFDLElBQUksSUFBSSxJQUFJLFlBQVksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUN6QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsWUFDUyxTQUFrRCxFQUMvQyxNQUFjO1FBRGpCLGNBQVMsR0FBVCxTQUFTLENBQXlDO1FBQy9DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFyQmhCLGNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFzQnhDLENBQUM7SUFFRyx1QkFBdUIsQ0FBQyxPQUFlLEVBQUU7UUFDOUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7OytHQTNCVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiw2R0N0Qi9CLGlKQUlBOzJGRGtCYSxrQkFBa0I7a0JBTDlCLFNBQVM7K0JBQ0UsY0FBYyxtQkFFUCx1QkFBdUIsQ0FBQyxNQUFNOzRIQU14QyxXQUFXO3NCQURqQixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDbXNQYXJhZ3JhcGhDb21wb25lbnQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50RGF0YSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9tb2RlbC9jbXMtY29tcG9uZW50LWRhdGEnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wYXJhZ3JhcGgnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFyYWdyYXBoLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBhcmFncmFwaENvbXBvbmVudCB7XG4gIHByb3RlY3RlZCBzYW5pdGl6ZXIgPSBpbmplY3QoRG9tU2FuaXRpemVyKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICBjb25zdCBocmVmID0gZWxlbWVudD8uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgICAgIGNvbnN0IGRvY3VtZW50SG9zdCA9XG4gICAgICAgIGVsZW1lbnQub3duZXJEb2N1bWVudC5VUkwuc3BsaXQoJzovLycpWzFdLnNwbGl0KCcvJylbMF07XG5cbiAgICAgIC8vIFVzZSByb3V0ZXIgZm9yIGludGVybmFsIGxpbmsgbmF2aWdhdGlvblxuICAgICAgaWYgKGhyZWYgJiYgZG9jdW1lbnRIb3N0ID09PSBlbGVtZW50Lmhvc3QpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChocmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDbXNDb21wb25lbnREYXRhPENtc1BhcmFncmFwaENvbXBvbmVudD4sXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICBwdWJsaWMgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbDogc3RyaW5nID0gJycpOiBTYWZlSHRtbCB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpO1xuICB9XG59XG4iLCI8ZGl2XG4gICpuZ0lmPVwiY29tcG9uZW50LmRhdGEkIHwgYXN5bmMgYXMgZGF0YVwiXG4gIFtpbm5lckhUTUxdPVwiYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoZGF0YS5jb250ZW50IHwgY3hTdXBwbGVtZW50SGFzaEFuY2hvcnMpXCJcbj48L2Rpdj5cbiJdfQ==