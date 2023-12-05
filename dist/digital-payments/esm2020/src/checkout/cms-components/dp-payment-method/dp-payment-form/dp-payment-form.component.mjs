import { GlobalMessageType, } from '@spartacus/core';
import { Component, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../facade";
import * as i2 from "../../../facade/dp-local-storage.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@spartacus/storefront";
export class DpPaymentFormComponent {
    constructor(dpPaymentService, dpStorageService, globalMsgService, winRef) {
        this.dpPaymentService = dpPaymentService;
        this.dpStorageService = dpStorageService;
        this.globalMsgService = globalMsgService;
        this.winRef = winRef;
        this.closeForm = new EventEmitter();
    }
    ngOnInit() {
        this.dpPaymentService.getCardRegistrationDetails().subscribe((request) => {
            if (request?.url) {
                this.dpStorageService.syncCardRegistrationState(request);
                this.redirect(request.url);
            }
            else if (request) {
                this.globalMsgService.add({ key: 'dpPaymentForm.error.redirect' }, GlobalMessageType.MSG_TYPE_ERROR);
                this.closeForm.emit();
            }
        });
    }
    redirect(url) {
        const window = this.winRef.nativeWindow;
        if (window?.location) {
            window.location.href = url;
        }
    }
}
DpPaymentFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormComponent, deps: [{ token: i1.DpCheckoutPaymentService }, { token: i2.DpLocalStorageService }, { token: i3.GlobalMessageService }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
DpPaymentFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DpPaymentFormComponent, selector: "cx-dp-payment-form", outputs: { closeForm: "closeForm" }, ngImport: i0, template: "<div class=\"text-center\">{{ 'dpPaymentForm.redirect' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n", dependencies: [{ kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-dp-payment-form', template: "<div class=\"text-center\">{{ 'dpPaymentForm.redirect' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.DpCheckoutPaymentService }, { type: i2.DpLocalStorageService }, { type: i3.GlobalMessageService }, { type: i3.WindowRef }]; }, propDecorators: { closeForm: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtcGF5bWVudC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZGlnaXRhbC1wYXltZW50cy9zcmMvY2hlY2tvdXQvY21zLWNvbXBvbmVudHMvZHAtcGF5bWVudC1tZXRob2QvZHAtcGF5bWVudC1mb3JtL2RwLXBheW1lbnQtZm9ybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2RpZ2l0YWwtcGF5bWVudHMvc3JjL2NoZWNrb3V0L2Ntcy1jb21wb25lbnRzL2RwLXBheW1lbnQtbWV0aG9kL2RwLXBheW1lbnQtZm9ybS9kcC1wYXltZW50LWZvcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUVMLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBTXhFLE1BQU0sT0FBTyxzQkFBc0I7SUFJakMsWUFDVSxnQkFBMEMsRUFDMUMsZ0JBQXVDLEVBQ3ZDLGdCQUFzQyxFQUN0QyxNQUFpQjtRQUhqQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTBCO1FBQzFDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBdUI7UUFDdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFzQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBTjNCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBT2pDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdkUsSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO2lCQUFNLElBQUksT0FBTyxFQUFFO2dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUN2QixFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxFQUN2QyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2xCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBRXhDLElBQUksTUFBTSxFQUFFLFFBQVEsRUFBRTtZQUNwQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7U0FDNUI7SUFDSCxDQUFDOzttSEFoQ1Usc0JBQXNCO3VHQUF0QixzQkFBc0IsK0ZDbkJuQyw0SUFFQTsyRkRpQmEsc0JBQXNCO2tCQUpsQyxTQUFTOytCQUNFLG9CQUFvQjs4TUFLOUIsU0FBUztzQkFEUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRHBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZmFjYWRlL2RwLWxvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IERwQ2hlY2tvdXRQYXltZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2ZhY2FkZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZHAtcGF5bWVudC1mb3JtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RwLXBheW1lbnQtZm9ybS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIERwUGF5bWVudEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KClcbiAgY2xvc2VGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkcFBheW1lbnRTZXJ2aWNlOiBEcENoZWNrb3V0UGF5bWVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkcFN0b3JhZ2VTZXJ2aWNlOiBEcExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnbG9iYWxNc2dTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHdpblJlZjogV2luZG93UmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRwUGF5bWVudFNlcnZpY2UuZ2V0Q2FyZFJlZ2lzdHJhdGlvbkRldGFpbHMoKS5zdWJzY3JpYmUoKHJlcXVlc3QpID0+IHtcbiAgICAgIGlmIChyZXF1ZXN0Py51cmwpIHtcbiAgICAgICAgdGhpcy5kcFN0b3JhZ2VTZXJ2aWNlLnN5bmNDYXJkUmVnaXN0cmF0aW9uU3RhdGUocmVxdWVzdCk7XG4gICAgICAgIHRoaXMucmVkaXJlY3QocmVxdWVzdC51cmwpO1xuICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTXNnU2VydmljZS5hZGQoXG4gICAgICAgICAgeyBrZXk6ICdkcFBheW1lbnRGb3JtLmVycm9yLnJlZGlyZWN0JyB9LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2xvc2VGb3JtLmVtaXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlZGlyZWN0KHVybDogc3RyaW5nKSB7XG4gICAgY29uc3Qgd2luZG93ID0gdGhpcy53aW5SZWYubmF0aXZlV2luZG93O1xuXG4gICAgaWYgKHdpbmRvdz8ubG9jYXRpb24pIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+e3sgJ2RwUGF5bWVudEZvcm0ucmVkaXJlY3QnIHwgY3hUcmFuc2xhdGUgfX08L2Rpdj5cbjxkaXYgY2xhc3M9XCJjeC1zcGlubmVyXCI+PGN4LXNwaW5uZXI+PC9jeC1zcGlubmVyPjwvZGl2PlxuIl19