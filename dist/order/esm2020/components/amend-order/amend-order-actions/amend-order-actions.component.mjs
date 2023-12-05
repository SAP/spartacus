/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
export class AmendOrderActionsComponent {
    constructor(routingService) {
        this.routingService = routingService;
        this.styles = 'row';
    }
    continue(event) {
        if (this.amendOrderForm.valid) {
            this.routingService.go({
                cxRoute: this.forwardRoute,
                params: { code: this.orderCode },
            });
        }
        else {
            this.amendOrderForm.markAllAsTouched();
            event.stopPropagation();
        }
    }
}
AmendOrderActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsComponent, deps: [{ token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
AmendOrderActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: { orderCode: "orderCode", amendOrderForm: "amendOrderForm", backRoute: "backRoute", forwardRoute: "forwardRoute" }, host: { properties: { "class": "this.styles" } }, ngImport: i0, template: "<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <a\n    [routerLink]=\"\n      {\n        cxRoute: backRoute,\n        params: { code: orderCode }\n      } | cxUrl\n    \"\n    class=\"btn btn-block btn-secondary\"\n  >\n    {{ 'common.back' | cxTranslate }}\n  </a>\n</div>\n<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <button\n    *ngIf=\"forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    (click)=\"continue($event)\"\n  >\n    {{ 'common.continue' | cxTranslate }}\n  </button>\n\n  <button\n    *ngIf=\"!forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    type=\"submit\"\n    [attr.aria-label]=\"\n      'orderDetails.cancellationAndReturn.submitDescription' | cxTranslate\n    \"\n  >\n    {{ 'orderDetails.cancellationAndReturn.submit' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-amend-order-actions', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <a\n    [routerLink]=\"\n      {\n        cxRoute: backRoute,\n        params: { code: orderCode }\n      } | cxUrl\n    \"\n    class=\"btn btn-block btn-secondary\"\n  >\n    {{ 'common.back' | cxTranslate }}\n  </a>\n</div>\n<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <button\n    *ngIf=\"forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    (click)=\"continue($event)\"\n  >\n    {{ 'common.continue' | cxTranslate }}\n  </button>\n\n  <button\n    *ngIf=\"!forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    type=\"submit\"\n    [attr.aria-label]=\"\n      'orderDetails.cancellationAndReturn.submitDescription' | cxTranslate\n    \"\n  >\n    {{ 'orderDetails.cancellationAndReturn.submit' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }]; }, propDecorators: { orderCode: [{
                type: Input
            }], amendOrderForm: [{
                type: Input
            }], backRoute: [{
                type: Input
            }], forwardRoute: [{
                type: Input
            }], styles: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1lbmQtb3JkZXItYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9hbWVuZC1vcmRlci9hbWVuZC1vcmRlci1hY3Rpb25zL2FtZW5kLW9yZGVyLWFjdGlvbnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvYW1lbmQtb3JkZXIvYW1lbmQtb3JkZXItYWN0aW9ucy9hbWVuZC1vcmRlci1hY3Rpb25zLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDOzs7OztBQVN2QixNQUFNLE9BQU8sMEJBQTBCO0lBUXJDLFlBQXNCLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUY5QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBRWtCLENBQUM7SUFFeEQsUUFBUSxDQUFDLEtBQVk7UUFDbkIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtZQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMxQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTthQUNqQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7O3VIQXBCVSwwQkFBMEI7MkdBQTFCLDBCQUEwQiw0T0NwQnZDLHN5QkFpQ0E7MkZEYmEsMEJBQTBCO2tCQUx0QyxTQUFTOytCQUNFLHdCQUF3QixtQkFFakIsdUJBQXVCLENBQUMsTUFBTTtxR0FHdEMsU0FBUztzQkFBakIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFFZ0IsTUFBTTtzQkFBM0IsV0FBVzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWFtZW5kLW9yZGVyLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vYW1lbmQtb3JkZXItYWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBbWVuZE9yZGVyQWN0aW9uc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG9yZGVyQ29kZTogc3RyaW5nO1xuICBASW5wdXQoKSBhbWVuZE9yZGVyRm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgQElucHV0KCkgYmFja1JvdXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcndhcmRSb3V0ZTogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBzdHlsZXMgPSAncm93JztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlKSB7fVxuXG4gIGNvbnRpbnVlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFtZW5kT3JkZXJGb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgY3hSb3V0ZTogdGhpcy5mb3J3YXJkUm91dGUsXG4gICAgICAgIHBhcmFtczogeyBjb2RlOiB0aGlzLm9yZGVyQ29kZSB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW1lbmRPcmRlckZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC00IGNvbC1sZy0zXCI+XG4gIDxhXG4gICAgW3JvdXRlckxpbmtdPVwiXG4gICAgICB7XG4gICAgICAgIGN4Um91dGU6IGJhY2tSb3V0ZSxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IG9yZGVyQ29kZSB9XG4gICAgICB9IHwgY3hVcmxcbiAgICBcIlxuICAgIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tc2Vjb25kYXJ5XCJcbiAgPlxuICAgIHt7ICdjb21tb24uYmFjaycgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2E+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTQgY29sLWxnLTNcIj5cbiAgPGJ1dHRvblxuICAgICpuZ0lmPVwiZm9yd2FyZFJvdXRlXCJcbiAgICBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXByaW1hcnlcIlxuICAgIChjbGljayk9XCJjb250aW51ZSgkZXZlbnQpXCJcbiAgPlxuICAgIHt7ICdjb21tb24uY29udGludWUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG5cbiAgPGJ1dHRvblxuICAgICpuZ0lmPVwiIWZvcndhcmRSb3V0ZVwiXG4gICAgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1wcmltYXJ5XCJcbiAgICB0eXBlPVwic3VibWl0XCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgJ29yZGVyRGV0YWlscy5jYW5jZWxsYXRpb25BbmRSZXR1cm4uc3VibWl0RGVzY3JpcHRpb24nIHwgY3hUcmFuc2xhdGVcbiAgICBcIlxuICA+XG4gICAge3sgJ29yZGVyRGV0YWlscy5jYW5jZWxsYXRpb25BbmRSZXR1cm4uc3VibWl0JyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=