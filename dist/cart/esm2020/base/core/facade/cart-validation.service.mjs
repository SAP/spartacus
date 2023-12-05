/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../connectors/validation/cart-validation.connector";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "../services/cart-validation-state.service";
export class CartValidationService {
    constructor(cartValidationConnector, command, userIdService, activeCartFacade, cartValidationStateService) {
        this.cartValidationConnector = cartValidationConnector;
        this.command = command;
        this.userIdService = userIdService;
        this.activeCartFacade = activeCartFacade;
        this.cartValidationStateService = cartValidationStateService;
        this.validateCartCommand = this.command.create(() => combineLatest([
            this.activeCartFacade.getActiveCartId(),
            this.userIdService.takeUserId(),
            this.activeCartFacade.isStable(),
        ]).pipe(filter(([_, __, loaded]) => loaded), take(1), switchMap(([cartId, userId]) => this.cartValidationConnector.validate(cartId, userId))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Validates cart and returns cart modification list.
     */
    validateCart() {
        return this.validateCartCommand.execute();
    }
    /**
     * Returns cart modification results
     */
    getValidationResults() {
        return this.cartValidationStateService.cartValidationResult$;
    }
}
CartValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationService, deps: [{ token: i1.CartValidationConnector }, { token: i2.CommandService }, { token: i2.UserIdService }, { token: i3.ActiveCartFacade }, { token: i4.CartValidationStateService }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CartValidationConnector }, { type: i2.CommandService }, { type: i2.UserIdService }, { type: i3.ActiveCartFacade }, { type: i4.CartValidationStateService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvZmFjYWRlL2NhcnQtdmFsaWRhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE9BQU8sRUFHTCxlQUFlLEdBRWhCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3pELE1BQU0sT0FBTyxxQkFBcUI7SUFvQmhDLFlBQ1ksdUJBQWdELEVBQ2hELE9BQXVCLEVBQ3ZCLGFBQTRCLEVBQzVCLGdCQUFrQyxFQUNsQywwQkFBc0Q7UUFKdEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUF4QnhELHdCQUFtQixHQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDakIsR0FBRyxFQUFFLENBQ0gsYUFBYSxDQUFDO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0wsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FDN0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQ3RELENBQ0YsRUFDSDtZQUNFLFFBQVEsRUFBRSxlQUFlLENBQUMsY0FBYztTQUN6QyxDQUNGLENBQUM7SUFRRCxDQUFDO0lBRUo7O09BRUc7SUFDSCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDO0lBQy9ELENBQUM7O2tIQXhDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FydE1vZGlmaWNhdGlvbixcbiAgQ2FydE1vZGlmaWNhdGlvbkxpc3QsXG4gIENhcnRWYWxpZGF0aW9uRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy92YWxpZGF0aW9uL2NhcnQtdmFsaWRhdGlvbi5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ2FydFZhbGlkYXRpb25TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJ0LXZhbGlkYXRpb24tc3RhdGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXJ0VmFsaWRhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBDYXJ0VmFsaWRhdGlvbkZhY2FkZSB7XG4gIHByb3RlY3RlZCB2YWxpZGF0ZUNhcnRDb21tYW5kOiBDb21tYW5kPHZvaWQsIENhcnRNb2RpZmljYXRpb25MaXN0PiA9XG4gICAgdGhpcy5jb21tYW5kLmNyZWF0ZShcbiAgICAgICgpID0+XG4gICAgICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5nZXRBY3RpdmVDYXJ0SWQoKSxcbiAgICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLFxuICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5pc1N0YWJsZSgpLFxuICAgICAgICBdKS5waXBlKFxuICAgICAgICAgIGZpbHRlcigoW18sIF9fLCBsb2FkZWRdKSA9PiBsb2FkZWQpLFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgc3dpdGNoTWFwKChbY2FydElkLCB1c2VySWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jYXJ0VmFsaWRhdGlvbkNvbm5lY3Rvci52YWxpZGF0ZShjYXJ0SWQsIHVzZXJJZClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2FydFZhbGlkYXRpb25Db25uZWN0b3I6IENhcnRWYWxpZGF0aW9uQ29ubmVjdG9yLFxuICAgIHByb3RlY3RlZCBjb21tYW5kOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2FydFZhbGlkYXRpb25TdGF0ZVNlcnZpY2U6IENhcnRWYWxpZGF0aW9uU3RhdGVTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogVmFsaWRhdGVzIGNhcnQgYW5kIHJldHVybnMgY2FydCBtb2RpZmljYXRpb24gbGlzdC5cbiAgICovXG4gIHZhbGlkYXRlQ2FydCgpOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb25MaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGVDYXJ0Q29tbWFuZC5leGVjdXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjYXJ0IG1vZGlmaWNhdGlvbiByZXN1bHRzXG4gICAqL1xuICBnZXRWYWxpZGF0aW9uUmVzdWx0cygpOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLmNhcnRWYWxpZGF0aW9uU3RhdGVTZXJ2aWNlLmNhcnRWYWxpZGF0aW9uUmVzdWx0JDtcbiAgfVxufVxuIl19