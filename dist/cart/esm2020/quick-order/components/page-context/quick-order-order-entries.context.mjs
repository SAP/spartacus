import { Injectable, inject, isDevMode } from '@angular/core';
import { OrderEntriesSource, ProductImportStatus, } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { merge, of } from 'rxjs';
import { catchError, filter, map, mergeAll, switchMap, take, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/quick-order/root";
import * as i2 from "@spartacus/core";
export class QuickOrderOrderEntriesContext {
    constructor(quickOrderService, productConnector) {
        this.quickOrderService = quickOrderService;
        this.productConnector = productConnector;
        this.type = OrderEntriesSource.QUICK_ORDER;
        this.logger = inject(LoggerService);
    }
    getEntries() {
        return this.quickOrderService.getEntries();
    }
    addEntries(productsData) {
        return merge(productsData.map((productData) => this.quickOrderService
            .canAdd(productData.productCode, productsData)
            .pipe(switchMap((canAdd) => {
            if (canAdd) {
                return this.productConnector.get(productData.productCode).pipe(filter((product) => !!product), tap((product) => {
                    this.quickOrderService.addProduct(product, productData.quantity);
                }), map((product) => this.handleResults(product, productData)), catchError((response) => {
                    return of(this.handleErrors(response, productData.productCode));
                }));
            }
            else {
                return of({
                    productCode: productData.productCode,
                    statusCode: ProductImportStatus.LIMIT_EXCEEDED,
                });
            }
        })))).pipe(mergeAll(), take(productsData.length));
    }
    handleResults(product, productData) {
        if (product.stock?.stockLevel &&
            productData.quantity > product.stock.stockLevel) {
            return {
                productCode: productData.productCode,
                productName: product?.name,
                statusCode: ProductImportStatus.LOW_STOCK,
                quantity: productData.quantity,
                quantityAdded: product.stock.stockLevel,
            };
        }
        else if (product.stock?.stockLevelStatus === 'outOfStock') {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.NO_STOCK,
                productName: product?.name,
            };
        }
        else {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.SUCCESS,
            };
        }
    }
    handleErrors(response, productCode) {
        if (response?.error?.errors[0].type === 'UnknownIdentifierError') {
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
            };
        }
        else {
            if (isDevMode()) {
                this.logger.warn('Unrecognized cart add entry action type while mapping messages', response);
            }
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_ERROR,
            };
        }
    }
}
QuickOrderOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderOrderEntriesContext, deps: [{ token: i1.QuickOrderFacade }, { token: i2.ProductConnector }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.QuickOrderFacade }, { type: i2.ProductConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvcXVpY2stb3JkZXIvY29tcG9uZW50cy9wYWdlLWNvbnRleHQvcXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBR0wsa0JBQWtCLEVBSWxCLG1CQUFtQixHQUNwQixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxhQUFhLEVBQTZCLE1BQU0saUJBQWlCLENBQUM7QUFDM0UsT0FBTyxFQUFjLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixTQUFTLEVBQ1QsSUFBSSxFQUNKLEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7O0FBS3hCLE1BQU0sT0FBTyw2QkFBNkI7SUFNeEMsWUFDWSxpQkFBbUMsRUFDbkMsZ0JBQWtDO1FBRGxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUxyQyxTQUFJLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFLdEMsQ0FBQztJQUVKLFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsVUFBVSxDQUFDLFlBQTJCO1FBQ3BDLE9BQU8sS0FBSyxDQUNWLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxD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O2FBQzlDLENBQUM7U0FDSDtJQUNILENBQUM7OzBIQXBHVSw2QkFBNkI7OEhBQTdCLDZCQUE2QixjQUY1QixNQUFNOzJGQUVQLDZCQUE2QjtrQkFIekMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBZGRPcmRlckVudHJpZXNDb250ZXh0LFxuICBHZXRPcmRlckVudHJpZXNDb250ZXh0LFxuICBPcmRlckVudHJpZXNTb3VyY2UsXG4gIE9yZGVyRW50cnksXG4gIFByb2R1Y3REYXRhLFxuICBQcm9kdWN0SW1wb3J0SW5mbyxcbiAgUHJvZHVjdEltcG9ydFN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBRdWlja09yZGVyRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3F1aWNrLW9yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgUHJvZHVjdCwgUHJvZHVjdENvbm5lY3RvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBtZXJnZUFsbCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFF1aWNrT3JkZXJPcmRlckVudHJpZXNDb250ZXh0XG4gIGltcGxlbWVudHMgQWRkT3JkZXJFbnRyaWVzQ29udGV4dCwgR2V0T3JkZXJFbnRyaWVzQ29udGV4dFxue1xuICByZWFkb25seSB0eXBlID0gT3JkZXJFbnRyaWVzU291cmNlLlFVSUNLX09SREVSO1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBxdWlja09yZGVyU2VydmljZTogUXVpY2tPcmRlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdENvbm5lY3RvcjogUHJvZHVjdENvbm5lY3RvclxuICApIHt9XG5cbiAgZ2V0RW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlLmdldEVudHJpZXMoKTtcbiAgfVxuXG4gIGFkZEVudHJpZXMocHJvZHVjdHNEYXRhOiBQcm9kdWN0RGF0YVtdKTogT2JzZXJ2YWJsZTxQcm9kdWN0SW1wb3J0SW5mbz4ge1xuICAgIHJldHVybiBtZXJnZShcbiAgICAgIHByb2R1Y3RzRGF0YS5tYXAoKHByb2R1Y3REYXRhKSA9PlxuICAgICAgICB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlXG4gICAgICAgICAgLmNhbkFkZChwcm9kdWN0RGF0YS5wcm9kdWN0Q29kZSwgcHJvZHVjdHNEYXRhKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKChjYW5BZGQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGNhbkFkZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RDb25uZWN0b3IuZ2V0KHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlKS5waXBlKFxuICAgICAgICAgICAgICAgICAgZmlsdGVyKChwcm9kdWN0KSA9PiAhIXByb2R1Y3QpLFxuICAgICAgICAgICAgICAgICAgdGFwKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2UuYWRkUHJvZHVjdChcbiAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LFxuICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3REYXRhLnF1YW50aXR5XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIG1hcCgocHJvZHVjdCkgPT4gdGhpcy5oYW5kbGVSZXN1bHRzKHByb2R1Y3QsIHByb2R1Y3REYXRhKSksXG4gICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3JzKHJlc3BvbnNlLCBwcm9kdWN0RGF0YS5wcm9kdWN0Q29kZSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2Yoe1xuICAgICAgICAgICAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlLFxuICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5MSU1JVF9FWENFRURFRCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICApXG4gICAgKS5waXBlKG1lcmdlQWxsKCksIHRha2UocHJvZHVjdHNEYXRhLmxlbmd0aCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVJlc3VsdHMoXG4gICAgcHJvZHVjdDogUHJvZHVjdCxcbiAgICBwcm9kdWN0RGF0YTogUHJvZHVjdERhdGFcbiAgKTogUHJvZHVjdEltcG9ydEluZm8ge1xuICAgIGlmIChcbiAgICAgIHByb2R1Y3Quc3RvY2s/LnN0b2NrTGV2ZWwgJiZcbiAgICAgIHByb2R1Y3REYXRhLnF1YW50aXR5ID4gcHJvZHVjdC5zdG9jay5zdG9ja0xldmVsXG4gICAgKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9kdWN0Q29kZTogcHJvZHVjdERhdGEucHJvZHVjdENvZGUsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kdWN0Py5uYW1lLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLkxPV19TVE9DSyxcbiAgICAgICAgcXVhbnRpdHk6IHByb2R1Y3REYXRhLnF1YW50aXR5LFxuICAgICAgICBxdWFudGl0eUFkZGVkOiBwcm9kdWN0LnN0b2NrLnN0b2NrTGV2ZWwsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAocHJvZHVjdC5zdG9jaz8uc3RvY2tMZXZlbFN0YXR1cyA9PT0gJ291dE9mU3RvY2snKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9kdWN0Q29kZTogcHJvZHVjdERhdGEucHJvZHVjdENvZGUsXG4gICAgICAgIHN0YXR1c0NvZGU6IFByb2R1Y3RJbXBvcnRTdGF0dXMuTk9fU1RPQ0ssXG4gICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kdWN0Py5uYW1lLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLlNVQ0NFU1MsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVFcnJvcnMoXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlLFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogUHJvZHVjdEltcG9ydEluZm8ge1xuICAgIGlmIChyZXNwb25zZT8uZXJyb3I/LmVycm9yc1swXS50eXBlID09PSAnVW5rbm93bklkZW50aWZpZXJFcnJvcicpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLlVOS05PV05fSURFTlRJRklFUixcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICAgICdVbnJlY29nbml6ZWQgY2FydCBhZGQgZW50cnkgYWN0aW9uIHR5cGUgd2hpbGUgbWFwcGluZyBtZXNzYWdlcycsXG4gICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLlVOS05PV05fRVJST1IsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19