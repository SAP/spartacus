/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ProductImportStatus, } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { CartActions } from '../store/actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
export class ProductImportInfoService {
    constructor(actionsSubject) {
        this.actionsSubject = actionsSubject;
        this.logger = inject(LoggerService);
    }
    /**
     * Get emission of add entry results from actions subject
     *
     * @param {string} cartId
     * @returns {Observable<ProductImportInfo>}
     */
    getResults(cartId) {
        return this.actionsSubject.pipe(ofType(CartActions.CART_ADD_ENTRY_SUCCESS, CartActions.CART_ADD_ENTRY_FAIL), filter((action) => action.payload.cartId === cartId), map((action) => this.mapMessages(action)));
    }
    /**
     * Map actions to summary messages
     *
     * @param {CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail} action
     * @returns ProductImportInfo
     */
    mapMessages(action) {
        const { productCode } = action.payload;
        if (action instanceof CartActions.CartAddEntrySuccess) {
            const { quantity, quantityAdded, entry, statusCode } = action.payload;
            if (statusCode === ProductImportStatus.LOW_STOCK) {
                return {
                    productCode,
                    statusCode,
                    productName: entry?.product?.name,
                    quantity,
                    quantityAdded,
                };
            }
            if (statusCode === ProductImportStatus.SUCCESS ||
                statusCode === ProductImportStatus.NO_STOCK) {
                return { productCode, statusCode, productName: entry?.product?.name };
            }
        }
        else if (action instanceof CartActions.CartAddEntryFail) {
            const { error } = action.payload;
            if (error?.details[0]?.type === 'UnknownIdentifierError') {
                return {
                    productCode,
                    statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
                };
            }
        }
        if (isDevMode()) {
            this.logger.warn('Unrecognized cart add entry action type while mapping messages', action);
        }
        return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
    }
}
ProductImportInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImportInfoService, deps: [{ token: i1.ActionsSubject }], target: i0.ɵɵFactoryTarget.Injectable });
ProductImportInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImportInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImportInfoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbXBvcnQtaW5mby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL3NlcnZpY2VzL3Byb2R1Y3QtaW1wb3J0LWluZm8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUVMLG1CQUFtQixHQUNwQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBSy9DLE1BQU0sT0FBTyx3QkFBd0I7SUFFbkMsWUFBZ0MsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRHBELFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDd0IsQ0FBQztJQUVsRTs7Ozs7T0FLRztJQUNILFVBQVUsQ0FBQyxNQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzdCLE1BQU0sQ0FDSixXQUFXLENBQUMsc0JBQXNCLEVBQ2xDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDaEMsRUFDRCxNQUFNLENBQ0osQ0FDRSxNQUFzRSxFQUN0RSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUN0QyxFQUNELEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sV0FBVyxDQUNuQixNQUFzRTtRQUV0RSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN2QyxJQUFJLE1BQU0sWUFBWSxXQUFXLENBQUMsbUJBQW1CLEVBQUU7WUFDckQsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDdEUsSUFBSSxVQUFVLEtBQUssbUJBQW1CLENBQUMsU0FBUyxFQUFFO2dCQUNoRCxPQUFPO29CQUNMLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJO29CQUNqQyxRQUFRO29CQUNSLGFBQWE7aUJBQ2QsQ0FBQzthQUNIO1lBQ0QsSUFDRSxVQUFVLEtBQUssbUJBQW1CLENBQUMsT0FBTztnQkFDMUMsVUFBVSxLQUFLLG1CQUFtQixDQUFDLFFBQVEsRUFDM0M7Z0JBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDdkU7U0FDRjthQUFNLElBQUksTUFBTSxZQUFZLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6RCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxJQUFJLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLHdCQUF3QixFQUFFO2dCQUN4RCxPQUFPO29CQUNMLFdBQVc7b0JBQ1gsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGtCQUFrQjtpQkFDbkQsQ0FBQzthQUNIO1NBQ0Y7UUFDRCxJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsZ0VBQWdFLEVBQ2hFLE1BQU0sQ0FDUCxDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN4RSxDQUFDOztxSEFwRVUsd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBQcm9kdWN0SW1wb3J0SW5mbyxcbiAgUHJvZHVjdEltcG9ydFN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FydEFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbXBvcnRJbmZvU2VydmljZSB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWN0aW9uc1N1YmplY3Q6IEFjdGlvbnNTdWJqZWN0KSB7fVxuXG4gIC8qKlxuICAgKiBHZXQgZW1pc3Npb24gb2YgYWRkIGVudHJ5IHJlc3VsdHMgZnJvbSBhY3Rpb25zIHN1YmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhcnRJZFxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9kdWN0SW1wb3J0SW5mbz59XG4gICAqL1xuICBnZXRSZXN1bHRzKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9kdWN0SW1wb3J0SW5mbz4ge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbnNTdWJqZWN0LnBpcGUoXG4gICAgICBvZlR5cGUoXG4gICAgICAgIENhcnRBY3Rpb25zLkNBUlRfQUREX0VOVFJZX1NVQ0NFU1MsXG4gICAgICAgIENhcnRBY3Rpb25zLkNBUlRfQUREX0VOVFJZX0ZBSUxcbiAgICAgICksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChcbiAgICAgICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeVN1Y2Nlc3MgfCBDYXJ0QWN0aW9ucy5DYXJ0QWRkRW50cnlGYWlsXG4gICAgICAgICkgPT4gYWN0aW9uLnBheWxvYWQuY2FydElkID09PSBjYXJ0SWRcbiAgICAgICksXG4gICAgICBtYXAoKGFjdGlvbikgPT4gdGhpcy5tYXBNZXNzYWdlcyhhY3Rpb24pKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTWFwIGFjdGlvbnMgdG8gc3VtbWFyeSBtZXNzYWdlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeVN1Y2Nlc3MgfCBDYXJ0QWN0aW9ucy5DYXJ0QWRkRW50cnlGYWlsfSBhY3Rpb25cbiAgICogQHJldHVybnMgUHJvZHVjdEltcG9ydEluZm9cbiAgICovXG4gIHByb3RlY3RlZCBtYXBNZXNzYWdlcyhcbiAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeVN1Y2Nlc3MgfCBDYXJ0QWN0aW9ucy5DYXJ0QWRkRW50cnlGYWlsXG4gICk6IFByb2R1Y3RJbXBvcnRJbmZvIHtcbiAgICBjb25zdCB7IHByb2R1Y3RDb2RlIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBpZiAoYWN0aW9uIGluc3RhbmNlb2YgQ2FydEFjdGlvbnMuQ2FydEFkZEVudHJ5U3VjY2Vzcykge1xuICAgICAgY29uc3QgeyBxdWFudGl0eSwgcXVhbnRpdHlBZGRlZCwgZW50cnksIHN0YXR1c0NvZGUgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgaWYgKHN0YXR1c0NvZGUgPT09IFByb2R1Y3RJbXBvcnRTdGF0dXMuTE9XX1NUT0NLKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJvZHVjdENvZGUsXG4gICAgICAgICAgc3RhdHVzQ29kZSxcbiAgICAgICAgICBwcm9kdWN0TmFtZTogZW50cnk/LnByb2R1Y3Q/Lm5hbWUsXG4gICAgICAgICAgcXVhbnRpdHksXG4gICAgICAgICAgcXVhbnRpdHlBZGRlZCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3RhdHVzQ29kZSA9PT0gUHJvZHVjdEltcG9ydFN0YXR1cy5TVUNDRVNTIHx8XG4gICAgICAgIHN0YXR1c0NvZGUgPT09IFByb2R1Y3RJbXBvcnRTdGF0dXMuTk9fU1RPQ0tcbiAgICAgICkge1xuICAgICAgICByZXR1cm4geyBwcm9kdWN0Q29kZSwgc3RhdHVzQ29kZSwgcHJvZHVjdE5hbWU6IGVudHJ5Py5wcm9kdWN0Py5uYW1lIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBDYXJ0QWN0aW9ucy5DYXJ0QWRkRW50cnlGYWlsKSB7XG4gICAgICBjb25zdCB7IGVycm9yIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGlmIChlcnJvcj8uZGV0YWlsc1swXT8udHlwZSA9PT0gJ1Vua25vd25JZGVudGlmaWVyRXJyb3InKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJvZHVjdENvZGUsXG4gICAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5VTktOT1dOX0lERU5USUZJRVIsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgJ1VucmVjb2duaXplZCBjYXJ0IGFkZCBlbnRyeSBhY3Rpb24gdHlwZSB3aGlsZSBtYXBwaW5nIG1lc3NhZ2VzJyxcbiAgICAgICAgYWN0aW9uXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4geyBwcm9kdWN0Q29kZSwgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5VTktOT1dOX0VSUk9SIH07XG4gIH1cbn1cbiJdfQ==