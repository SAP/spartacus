/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { first } from 'rxjs/operators';
import { VisualizationLoadStatus, VisualizationLookupResult, } from '../../visual-viewer/models/visualization-load-info';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
export class VisualPickingTabService {
    constructor(currentProductService, globalMessageService, changeDetectorRef, windowRef) {
        this.currentProductService = currentProductService;
        this.globalMessageService = globalMessageService;
        this.changeDetectorRef = changeDetectorRef;
        this.windowRef = windowRef;
        this._selectedProductCodes = [];
        /**
         * When true, error messages will be shown when visualization load/lookup failures occur.
         */
        this.showErrorMessages = true;
    }
    /**
     * Initialize the service.
     * @param visualViewerService The VisualViewerService instance to use.
     * @param visualPickingProductListService The VisualPickingProductListService instance to use.
     */
    initialize(visualViewerService, visualPickingProductListService) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.visualViewerService = visualViewerService;
        this.visualPickingProductListService = visualPickingProductListService;
        this.visualizationLoadInfoChangeSubscription =
            this.visualViewerService.visualizationLoadInfoChange.subscribe(this.handleLoadVisualizationInfoChange.bind(this));
        this.getFilteredProductReferencesSubscription =
            this.visualPickingProductListService
                .getFilteredProductReferences()
                .subscribe((productReferences) => {
                const productCodes = productReferences.map((productReference) => productReference.target.code);
                this.visualViewerService.includedProductCodes = productCodes;
            });
        this.getProductReferencesSubscription = this.visualPickingProductListService
            .getProductReferences()
            .subscribe((productReferences) => {
            this.setProductReferences(productReferences);
            if (productReferences.length > 0) {
                this.visualPickingProductListService.currentProduct$
                    .pipe(first())
                    .subscribe((currentProduct) => {
                    this.visualViewerService
                        .loadVisualization(currentProduct.code)
                        .pipe(first())
                        .subscribe();
                });
            }
        });
    }
    ngOnDestroy() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.visualizationLoadInfoChangeSubscription?.unsubscribe();
        this.getProductReferencesSubscription?.unsubscribe();
        this.getFilteredProductReferencesSubscription?.unsubscribe();
    }
    get selectedProductCodes() {
        return this._selectedProductCodes;
    }
    set selectedProductCodes(selectedProducts) {
        this._selectedProductCodes = selectedProducts;
        this.changeDetectorRef.detectChanges();
    }
    get productReferences() {
        return this._productReferences;
    }
    setProductReferences(value) {
        this._productReferences = value;
        // hideNoProductReferencesText, hideProductList, hideViewport values may have changed
        this.changeDetectorRef.markForCheck();
    }
    get visualizationLoadStatus() {
        return (this.visualViewerService.visualizationLoadInfo?.loadStatus ??
            VisualizationLoadStatus.NotStarted);
    }
    get hideNoProductReferencesText() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length > 0);
    }
    get hideProductList() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length === 0);
    }
    get hideViewport() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length === 0 ||
            !(this.visualizationLoadStatus === VisualizationLoadStatus.Loading ||
                this.visualizationLoadStatus === VisualizationLoadStatus.Loaded));
    }
    showErrorMessage(message) {
        if (this.showErrorMessages) {
            this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    handleLoadVisualizationInfoChange(visualizationLoadInfo) {
        switch (visualizationLoadInfo.lookupResult) {
            case VisualizationLookupResult.UniqueMatchFound:
                switch (visualizationLoadInfo.loadStatus) {
                    case VisualizationLoadStatus.Loading:
                        break;
                    case VisualizationLoadStatus.UnexpectedError:
                        this.showErrorMessage({
                            key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
                        });
                        break;
                }
                break;
            case VisualizationLookupResult.NoMatchFound:
                break;
            case VisualizationLookupResult.MultipleMatchesFound:
                this.showErrorMessage({
                    key: 'epdVisualization.errors.visualLoad.multipleMatchingVisualsFound',
                });
                break;
            case VisualizationLookupResult.UnexpectedError:
                this.showErrorMessage({
                    key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
                });
                break;
        }
        this.changeDetectorRef.detectChanges();
    }
    get visualViewerService() {
        return this._visualViewerService;
    }
    set visualViewerService(value) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._visualViewerService = value;
    }
    get visualPickingProductListService() {
        return this._visualPickingProductListService;
    }
    set visualPickingProductListService(value) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._visualPickingProductListService = value;
    }
}
VisualPickingTabService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabService, deps: [{ token: i1.CurrentProductService }, { token: i2.GlobalMessageService }, { token: i0.ChangeDetectorRef }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualPickingTabService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i2.GlobalMessageService }, { type: i0.ChangeDetectorRef }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctdGFiLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXBpY2tpbmcvdmlzdWFsLXBpY2tpbmctdGFiL3Zpc3VhbC1waWNraW5nLXRhYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXFCLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBRUwsaUJBQWlCLEdBS2xCLE1BQU0saUJBQWlCLENBQUM7QUFHekIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIseUJBQXlCLEdBQzFCLE1BQU0sb0RBQW9ELENBQUM7Ozs7QUFPNUQsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNZLHFCQUE0QyxFQUM1QyxvQkFBMEMsRUFDMUMsaUJBQW9DLEVBQ3BDLFNBQW9CO1FBSHBCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFrRXhCLDBCQUFxQixHQUFhLEVBQUUsQ0FBQztRQVM3Qzs7V0FFRztRQUNPLHNCQUFpQixHQUFZLElBQUksQ0FBQztJQTdFekMsQ0FBQztJQUVKOzs7O09BSUc7SUFDSSxVQUFVLENBQ2YsbUJBQXdDLEVBQ3hDLCtCQUFnRTtRQUVoRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7UUFDL0MsSUFBSSxDQUFDLCtCQUErQixHQUFH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VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFByb2R1Y3QsXG4gIFByb2R1Y3RSZWZlcmVuY2UsXG4gIFRyYW5zbGF0YWJsZSxcbiAgV2luZG93UmVmLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ3VycmVudFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBWaXN1YWxpemF0aW9uTG9hZEluZm8sXG4gIFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLFxuICBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0LFxufSBmcm9tICcuLi8uLi92aXN1YWwtdmlld2VyL21vZGVscy92aXN1YWxpemF0aW9uLWxvYWQtaW5mbyc7XG5pbXBvcnQgeyBWaXN1YWxWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdmlzdWFsLXZpZXdlci92aXN1YWwtdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZSB9IGZyb20gJy4vcHJvZHVjdC1saXN0L3Zpc3VhbC1waWNraW5nLXByb2R1Y3QtbGlzdC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFZpc3VhbFBpY2tpbmdUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRQcm9kdWN0U2VydmljZTogQ3VycmVudFByb2R1Y3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgd2luZG93UmVmOiBXaW5kb3dSZWZcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBzZXJ2aWNlLlxuICAgKiBAcGFyYW0gdmlzdWFsVmlld2VyU2VydmljZSBUaGUgVmlzdWFsVmlld2VyU2VydmljZSBpbnN0YW5jZSB0byB1c2UuXG4gICAqIEBwYXJhbSB2aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlIFRoZSBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlIGluc3RhbmNlIHRvIHVzZS5cbiAgICovXG4gIHB1YmxpYyBpbml0aWFsaXplKFxuICAgIHZpc3VhbFZpZXdlclNlcnZpY2U6IFZpc3VhbFZpZXdlclNlcnZpY2UsXG4gICAgdmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZTogVmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZVxuICApOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlID0gdmlzdWFsVmlld2VyU2VydmljZTtcbiAgICB0aGlzLnZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UgPSB2aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlO1xuXG4gICAgdGhpcy52aXN1YWxpemF0aW9uTG9hZEluZm9DaGFuZ2VTdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLnZpc3VhbGl6YXRpb25Mb2FkSW5mb0NoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIHRoaXMuaGFuZGxlTG9hZFZpc3VhbGl6YXRpb25JbmZvQ2hhbmdlLmJpbmQodGhpcylcbiAgICAgICk7XG5cbiAgICB0aGlzLmdldEZpbHRlcmVkUHJvZHVjdFJlZmVyZW5jZXNTdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy52aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlXG4gICAgICAgIC5nZXRGaWx0ZXJlZFByb2R1Y3RSZWZlcmVuY2VzKClcbiAgICAgICAgLnN1YnNjcmliZSgocHJvZHVjdFJlZmVyZW5jZXM6IFByb2R1Y3RSZWZlcmVuY2VbXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RDb2Rlczogc3RyaW5nW10gPSBwcm9kdWN0UmVmZXJlbmNlcy5tYXAoXG4gICAgICAgICAgICAocHJvZHVjdFJlZmVyZW5jZSkgPT5cbiAgICAgICAgICAgICAgKHByb2R1Y3RSZWZlcmVuY2UudGFyZ2V0IGFzIFByb2R1Y3QpLmNvZGUgYXMgc3RyaW5nXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5pbmNsdWRlZFByb2R1Y3RDb2RlcyA9IHByb2R1Y3RDb2RlcztcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLmdldFByb2R1Y3RSZWZlcmVuY2VzU3Vic2NyaXB0aW9uID0gdGhpcy52aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlXG4gICAgICAuZ2V0UHJvZHVjdFJlZmVyZW5jZXMoKVxuICAgICAgLnN1YnNjcmliZSgocHJvZHVjdFJlZmVyZW5jZXM6IFByb2R1Y3RSZWZlcmVuY2VbXSkgPT4ge1xuICAgICAgICB0aGlzLnNldFByb2R1Y3RSZWZlcmVuY2VzKHByb2R1Y3RSZWZlcmVuY2VzKTtcbiAgICAgICAgaWYgKHByb2R1Y3RSZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UuY3VycmVudFByb2R1Y3QkXG4gICAgICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY3VycmVudFByb2R1Y3Q6IFByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmxvYWRWaXN1YWxpemF0aW9uKGN1cnJlbnRQcm9kdWN0LmNvZGUgYXMgc3RyaW5nKVxuICAgICAgICAgICAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZpc3VhbGl6YXRpb25Mb2FkSW5mb0NoYW5nZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmdldFByb2R1Y3RSZWZlcmVuY2VzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZ2V0RmlsdGVyZWRQcm9kdWN0UmVmZXJlbmNlc1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlzdWFsaXphdGlvbkxvYWRJbmZvQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZ2V0UHJvZHVjdFJlZmVyZW5jZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBnZXRGaWx0ZXJlZFByb2R1Y3RSZWZlcmVuY2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQcm9kdWN0Q29kZXM6IHN0cmluZ1tdID0gW107XG4gIHB1YmxpYyBnZXQgc2VsZWN0ZWRQcm9kdWN0Q29kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUHJvZHVjdENvZGVzO1xuICB9XG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWRQcm9kdWN0Q29kZXMoc2VsZWN0ZWRQcm9kdWN0czogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RDb2RlcyA9IHNlbGVjdGVkUHJvZHVjdHM7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBlcnJvciBtZXNzYWdlcyB3aWxsIGJlIHNob3duIHdoZW4gdmlzdWFsaXphdGlvbiBsb2FkL2xvb2t1cCBmYWlsdXJlcyBvY2N1ci5cbiAgICovXG4gIHByb3RlY3RlZCBzaG93RXJyb3JNZXNzYWdlczogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHJpdmF0ZSBfcHJvZHVjdFJlZmVyZW5jZXM6IFByb2R1Y3RSZWZlcmVuY2VbXTtcbiAgcHJpdmF0ZSBnZXQgcHJvZHVjdFJlZmVyZW5jZXMoKTogUHJvZHVjdFJlZmVyZW5jZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZHVjdFJlZmVyZW5jZXM7XG4gIH1cbiAgcHJpdmF0ZSBzZXRQcm9kdWN0UmVmZXJlbmNlcyh2YWx1ZTogUHJvZHVjdFJlZmVyZW5jZVtdKSB7XG4gICAgdGhpcy5fcHJvZHVjdFJlZmVyZW5jZXMgPSB2YWx1ZTtcblxuICAgIC8vIGhpZGVOb1Byb2R1Y3RSZWZlcmVuY2VzVGV4dCwgaGlkZVByb2R1Y3RMaXN0LCBoaWRlVmlld3BvcnQgdmFsdWVzIG1heSBoYXZlIGNoYW5nZWRcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdmlzdWFsaXphdGlvbkxvYWRTdGF0dXMoKTogVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UudmlzdWFsaXphdGlvbkxvYWRJbmZvPy5sb2FkU3RhdHVzID8/XG4gICAgICBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5Ob3RTdGFydGVkXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlkZU5vUHJvZHVjdFJlZmVyZW5jZXNUZXh0KCkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9kdWN0UmVmZXJlbmNlcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAodGhpcy5wcm9kdWN0UmVmZXJlbmNlcyBhcyBQcm9kdWN0UmVmZXJlbmNlW10pLmxlbmd0aCA+IDBcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldCBoaWRlUHJvZHVjdExpc3QoKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb2R1Y3RSZWZlcmVuY2VzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICh0aGlzLnByb2R1Y3RSZWZlcmVuY2VzIGFzIFByb2R1Y3RSZWZlcmVuY2VbXSkubGVuZ3RoID09PSAwXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlkZVZpZXdwb3J0KCkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9kdWN0UmVmZXJlbmNlcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAodGhpcy5wcm9kdWN0UmVmZXJlbmNlcyBhcyBQcm9kdWN0UmVmZXJlbmNlW10pLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgIShcbiAgICAgICAgdGhpcy52aXN1YWxpemF0aW9uTG9hZFN0YXR1cyA9PT0gVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTG9hZGluZyB8fFxuICAgICAgICB0aGlzLnZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzID09PSBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5Mb2FkZWRcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93RXJyb3JNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyB8IFRyYW5zbGF0YWJsZSkge1xuICAgIGlmICh0aGlzLnNob3dFcnJvck1lc3NhZ2VzKSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChtZXNzYWdlLCBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVMb2FkVmlzdWFsaXphdGlvbkluZm9DaGFuZ2UoXG4gICAgdmlzdWFsaXphdGlvbkxvYWRJbmZvOiBWaXN1YWxpemF0aW9uTG9hZEluZm9cbiAgKTogdm9pZCB7XG4gICAgc3dpdGNoICh2aXN1YWxpemF0aW9uTG9hZEluZm8ubG9va3VwUmVzdWx0KSB7XG4gICAgICBjYXNlIFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuVW5pcXVlTWF0Y2hGb3VuZDpcbiAgICAgICAgc3dpdGNoICh2aXN1YWxpemF0aW9uTG9hZEluZm8ubG9hZFN0YXR1cykge1xuICAgICAgICAgIGNhc2UgVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTG9hZGluZzpcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5VbmV4cGVjdGVkRXJyb3I6XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvck1lc3NhZ2Uoe1xuICAgICAgICAgICAgICBrZXk6ICdlcGRWaXN1YWxpemF0aW9uLmVycm9ycy52aXN1YWxMb2FkLnVuZXhwZWN0ZWRMb2FkRXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0Lk5vTWF0Y2hGb3VuZDpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdC5NdWx0aXBsZU1hdGNoZXNGb3VuZDpcbiAgICAgICAgdGhpcy5zaG93RXJyb3JNZXNzYWdlKHtcbiAgICAgICAgICBrZXk6ICdlcGRWaXN1YWxpemF0aW9uLmVycm9ycy52aXN1YWxMb2FkLm11bHRpcGxlTWF0Y2hpbmdWaXN1YWxzRm91bmQnLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdC5VbmV4cGVjdGVkRXJyb3I6XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yTWVzc2FnZSh7XG4gICAgICAgICAga2V5OiAnZXBkVmlzdWFsaXphdGlvbi5lcnJvcnMudmlzdWFsTG9hZC51bmV4cGVjdGVkTG9hZEVycm9yJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc3VhbFZpZXdlclNlcnZpY2U6IFZpc3VhbFZpZXdlclNlcnZpY2U7XG4gIHB1YmxpYyBnZXQgdmlzdWFsVmlld2VyU2VydmljZSgpOiBWaXN1YWxWaWV3ZXJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzdWFsVmlld2VyU2VydmljZTtcbiAgfVxuICBwdWJsaWMgc2V0IHZpc3VhbFZpZXdlclNlcnZpY2UodmFsdWU6IFZpc3VhbFZpZXdlclNlcnZpY2UpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Zpc3VhbFZpZXdlclNlcnZpY2UgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2U6IFZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2U7XG4gIHB1YmxpYyBnZXQgdmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZSgpOiBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZTtcbiAgfVxuICBwdWJsaWMgc2V0IHZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UoXG4gICAgdmFsdWU6IFZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==