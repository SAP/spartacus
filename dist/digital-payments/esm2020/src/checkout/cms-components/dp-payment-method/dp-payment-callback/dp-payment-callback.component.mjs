import { DP_CARD_REGISTRATION_STATUS } from '../../../../utils/dp-constants';
import { GlobalMessageType } from '@spartacus/core';
import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../facade";
import * as i2 from "./../../../facade/dp-local-storage.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/storefront";
export class DpPaymentCallbackComponent {
    constructor(dpPaymentService, dpStorageService, globalMsgService, route) {
        this.dpPaymentService = dpPaymentService;
        this.dpStorageService = dpStorageService;
        this.globalMsgService = globalMsgService;
        this.route = route;
        this.closeCallback = new EventEmitter();
        this.paymentDetailsAdded = new EventEmitter();
    }
    ngOnInit() {
        const dpResponse = this.route.snapshot.queryParamMap.get(DP_CARD_REGISTRATION_STATUS);
        if (dpResponse?.toLowerCase() === 'successful') {
            this.fetchPaymentDetails();
        }
        else {
            this.globalMsgService.add({ key: 'dpPaymentForm.cancelledOrFailed' }, GlobalMessageType.MSG_TYPE_WARNING);
            this.closeCallback.emit();
        }
    }
    fetchPaymentDetails() {
        const paymentRequest = this.dpStorageService.readCardRegistrationState();
        if (paymentRequest?.sessionId && paymentRequest?.signature) {
            this.dpPaymentService
                .createPaymentDetails(paymentRequest.sessionId, paymentRequest.signature)
                .subscribe((details) => {
                if (details?.id) {
                    this.paymentDetailsAdded.emit(details);
                }
                else if (details) {
                    this.globalMsgService.add({ key: 'dpPaymentForm.error.paymentFetch' }, GlobalMessageType.MSG_TYPE_ERROR);
                    this.closeCallback.emit();
                }
            });
        }
        else {
            this.globalMsgService.add({ key: 'dpPaymentForm.error.unknown' }, GlobalMessageType.MSG_TYPE_ERROR);
            this.closeCallback.emit();
        }
    }
}
DpPaymentCallbackComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackComponent, deps: [{ token: i1.DpCheckoutPaymentService }, { token: i2.DpLocalStorageService }, { token: i3.GlobalMessageService }, { token: i4.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
DpPaymentCallbackComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DpPaymentCallbackComponent, selector: "cx-dp-payment-callback", outputs: { closeCallback: "closeCallback", paymentDetailsAdded: "paymentDetailsAdded" }, ngImport: i0, template: "<div class=\"text-center\">{{ 'dpPaymentForm.callback' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n", dependencies: [{ kind: "component", type: i5.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-dp-payment-callback', template: "<div class=\"text-center\">{{ 'dpPaymentForm.callback' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.DpCheckoutPaymentService }, { type: i2.DpLocalStorageService }, { type: i3.GlobalMessageService }, { type: i4.ActivatedRoute }]; }, propDecorators: { closeCallback: [{
                type: Output
            }], paymentDetailsAdded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtcGF5bWVudC1jYWxsYmFjay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2RpZ2l0YWwtcGF5bWVudHMvc3JjL2NoZWNrb3V0L2Ntcy1jb21wb25lbnRzL2RwLXBheW1lbnQtbWV0aG9kL2RwLXBheW1lbnQtY2FsbGJhY2svZHAtcGF5bWVudC1jYWxsYmFjay5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2RpZ2l0YWwtcGF5bWVudHMvc3JjL2NoZWNrb3V0L2Ntcy1jb21wb25lbnRzL2RwLXBheW1lbnQtbWV0aG9kL2RwLXBheW1lbnQtY2FsbGJhY2svZHAtcGF5bWVudC1jYWxsYmFjay5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU3RSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUUsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBTXhFLE1BQU0sT0FBTywwQkFBMEI7SUFNckMsWUFDWSxnQkFBMEMsRUFDMUMsZ0JBQXVDLEVBQ3ZDLGdCQUFzQyxFQUN0QyxLQUFxQjtRQUhyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTBCO1FBQzFDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBdUI7UUFDdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFzQjtRQUN0QyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVJqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQU8zQyxDQUFDO0lBRUosUUFBUTtRQUNOLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3RELDJCQUEyQixDQUM1QixDQUFDO1FBQ0YsSUFBSSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssWUFBWSxFQUFFO1lBQzlDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUN2QixFQUFFLEdBQUcsRUFBRSxpQ0FBaUMsRUFBRSxFQUMxQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FDbkMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBRXpFLElBQUksY0FBYyxFQUFFLFNBQVMsSUFBSSxjQUFjLEVBQUUsU0FBUyxFQUFFO1lBQzFELElBQUksQ0FBQyxnQkFBZ0I7aUJBQ2xCLG9CQUFvQixDQUNuQixjQUFjLENBQUMsU0FBUyxFQUN4QixjQUFjLENBQUMsU0FBUyxDQUN6QjtpQkFDQSxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxPQUFPLEVBQUUsRUFBRSxFQUFFO29CQUNmLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hDO3FCQUFNLElBQUksT0FBTyxFQUFFO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUN2QixFQUFFLEdBQUcsRUFBRSxrQ0FBa0MsRUFBRSxFQUMzQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7b0JBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDM0I7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUN2QixFQUFFLEdBQUcsRUFBRSw2QkFBNkIsRUFBRSxFQUN0QyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7dUhBdkRVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLHVKQ2pCdkMsNElBRUE7MkZEZWEsMEJBQTBCO2tCQUp0QyxTQUFTOytCQUNFLHdCQUF3QjttTkFLbEMsYUFBYTtzQkFEWixNQUFNO2dCQUdQLG1CQUFtQjtzQkFEbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERwTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vZmFjYWRlL2RwLWxvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBEUF9DQVJEX1JFR0lTVFJBVElPTl9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9kcC1jb25zdGFudHMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVNlcnZpY2UsIEdsb2JhbE1lc3NhZ2VUeXBlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IERwQ2hlY2tvdXRQYXltZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2ZhY2FkZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZHAtcGF5bWVudC1jYWxsYmFjaycsXG4gIHRlbXBsYXRlVXJsOiAnLi9kcC1wYXltZW50LWNhbGxiYWNrLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgRHBQYXltZW50Q2FsbGJhY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KClcbiAgY2xvc2VDYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KClcbiAgcGF5bWVudERldGFpbHNBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBkcFBheW1lbnRTZXJ2aWNlOiBEcENoZWNrb3V0UGF5bWVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGRwU3RvcmFnZVNlcnZpY2U6IERwTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTXNnU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZHBSZXNwb25zZSA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbU1hcC5nZXQoXG4gICAgICBEUF9DQVJEX1JFR0lTVFJBVElPTl9TVEFUVVNcbiAgICApO1xuICAgIGlmIChkcFJlc3BvbnNlPy50b0xvd2VyQ2FzZSgpID09PSAnc3VjY2Vzc2Z1bCcpIHtcbiAgICAgIHRoaXMuZmV0Y2hQYXltZW50RGV0YWlscygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdsb2JhbE1zZ1NlcnZpY2UuYWRkKFxuICAgICAgICB7IGtleTogJ2RwUGF5bWVudEZvcm0uY2FuY2VsbGVkT3JGYWlsZWQnIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX1dBUk5JTkdcbiAgICAgICk7XG4gICAgICB0aGlzLmNsb3NlQ2FsbGJhY2suZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmV0Y2hQYXltZW50RGV0YWlscygpIHtcbiAgICBjb25zdCBwYXltZW50UmVxdWVzdCA9IHRoaXMuZHBTdG9yYWdlU2VydmljZS5yZWFkQ2FyZFJlZ2lzdHJhdGlvblN0YXRlKCk7XG5cbiAgICBpZiAocGF5bWVudFJlcXVlc3Q/LnNlc3Npb25JZCAmJiBwYXltZW50UmVxdWVzdD8uc2lnbmF0dXJlKSB7XG4gICAgICB0aGlzLmRwUGF5bWVudFNlcnZpY2VcbiAgICAgICAgLmNyZWF0ZVBheW1lbnREZXRhaWxzKFxuICAgICAgICAgIHBheW1lbnRSZXF1ZXN0LnNlc3Npb25JZCxcbiAgICAgICAgICBwYXltZW50UmVxdWVzdC5zaWduYXR1cmVcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgaWYgKGRldGFpbHM/LmlkKSB7XG4gICAgICAgICAgICB0aGlzLnBheW1lbnREZXRhaWxzQWRkZWQuZW1pdChkZXRhaWxzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsTXNnU2VydmljZS5hZGQoXG4gICAgICAgICAgICAgIHsga2V5OiAnZHBQYXltZW50Rm9ybS5lcnJvci5wYXltZW50RmV0Y2gnIH0sXG4gICAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUNhbGxiYWNrLmVtaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdsb2JhbE1zZ1NlcnZpY2UuYWRkKFxuICAgICAgICB7IGtleTogJ2RwUGF5bWVudEZvcm0uZXJyb3IudW5rbm93bicgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgICB0aGlzLmNsb3NlQ2FsbGJhY2suZW1pdCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+e3sgJ2RwUGF5bWVudEZvcm0uY2FsbGJhY2snIHwgY3hUcmFuc2xhdGUgfX08L2Rpdj5cbjxkaXYgY2xhc3M9XCJjeC1zcGlubmVyXCI+PGN4LXNwaW5uZXI+PC9jeC1zcGlubmVyPjwvZGl2PlxuIl19