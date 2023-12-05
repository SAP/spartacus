/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../auth/user-auth/facade/user-id.service";
import * as i3 from "../user-transitional-tokens";
export class UserService {
    constructor(store, userIdService, 
    // TODO: Remove transitional tokens in 4.0 with #11607
    userProfileFacade) {
        this.store = store;
        this.userIdService = userIdService;
        this.userProfileFacade = userProfileFacade;
    }
    /**
     * Returns titles.
     *
     * @deprecated since 3.2, use `UserProfileFacade.getTitles()` from `@spartacus/user` package.
     * We can remove it completely once we move the user-address feature to the User lib.
     */
    getTitles() {
        if (this.userProfileFacade) {
            return this.userProfileFacade.getTitles();
        }
        throw Error('Cannot get a titles. Install `@spartacus/user` library which provides required services.');
    }
}
UserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i3.UserProfileFacadeTransitionalToken, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
UserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i3.UserProfileFacadeTransitionalToken, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXNlci9mYWNhZGUvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFVckQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFDWSxLQUFvRCxFQUNwRCxhQUE0QjtJQUN0QyxzREFBc0Q7SUFFNUMsaUJBQXNEO1FBSnRELFVBQUssR0FBTCxLQUFLLENBQStDO1FBQ3BELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUM7SUFDL0QsQ0FBQztJQUVKOzs7OztPQUtHO0lBQ0gsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsTUFBTSxLQUFLLENBQ1QsMEZBQTBGLENBQzNGLENBQUM7SUFDSixDQUFDOzt3R0F0QlUsV0FBVzs0R0FBWCxXQUFXLGNBREUsTUFBTTsyRkFDbkIsV0FBVztrQkFEdkIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQU03QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlcklkU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGgvdXNlci1hdXRoL2ZhY2FkZS91c2VyLWlkLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICcuLi8uLi9tb2RlbC9taXNjLm1vZGVsJztcbmltcG9ydCB7IFN0YXRlV2l0aFByb2Nlc3MgfSBmcm9tICcuLi8uLi9wcm9jZXNzL3N0b3JlL3Byb2Nlc3Mtc3RhdGUnO1xuaW1wb3J0IHsgU3RhdGVXaXRoVXNlciB9IGZyb20gJy4uL3N0b3JlL3VzZXItc3RhdGUnO1xuaW1wb3J0IHsgVXNlclByb2ZpbGVGYWNhZGVUcmFuc2l0aW9uYWxUb2tlbiB9IGZyb20gJy4uL3VzZXItdHJhbnNpdGlvbmFsLXRva2Vucyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aFVzZXIgfCBTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+PixcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICAvLyBUT0RPOiBSZW1vdmUgdHJhbnNpdGlvbmFsIHRva2VucyBpbiA0LjAgd2l0aCAjMTE2MDdcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByb3RlY3RlZCB1c2VyUHJvZmlsZUZhY2FkZT86IFVzZXJQcm9maWxlRmFjYWRlVHJhbnNpdGlvbmFsVG9rZW5cbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRpdGxlcy5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgMy4yLCB1c2UgYFVzZXJQcm9maWxlRmFjYWRlLmdldFRpdGxlcygpYCBmcm9tIGBAc3BhcnRhY3VzL3VzZXJgIHBhY2thZ2UuXG4gICAqIFdlIGNhbiByZW1vdmUgaXQgY29tcGxldGVseSBvbmNlIHdlIG1vdmUgdGhlIHVzZXItYWRkcmVzcyBmZWF0dXJlIHRvIHRoZSBVc2VyIGxpYi5cbiAgICovXG4gIGdldFRpdGxlcygpOiBPYnNlcnZhYmxlPFRpdGxlW10+IHtcbiAgICBpZiAodGhpcy51c2VyUHJvZmlsZUZhY2FkZSkge1xuICAgICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGVGYWNhZGUuZ2V0VGl0bGVzKCk7XG4gICAgfVxuICAgIHRocm93IEVycm9yKFxuICAgICAgJ0Nhbm5vdCBnZXQgYSB0aXRsZXMuIEluc3RhbGwgYEBzcGFydGFjdXMvdXNlcmAgbGlicmFyeSB3aGljaCBwcm92aWRlcyByZXF1aXJlZCBzZXJ2aWNlcy4nXG4gICAgKTtcbiAgfVxufVxuIl19