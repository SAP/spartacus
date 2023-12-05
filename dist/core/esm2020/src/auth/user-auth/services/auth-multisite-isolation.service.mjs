/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../site-context/facade/base-site.service";
export class AuthMultisiteIsolationService {
    constructor(baseSiteService) {
        this.baseSiteService = baseSiteService;
        this.MULTISITE_SEPARATOR = '|';
    }
    /**
     * When isolation is turned on, a customer who registers for baseSiteA
     * can only log into baseSiteA, not baseSiteB.
     * To login into baseSiteB customer have to use the same e-mail and register an account
     * on baseSiteB.
     *
     * The strategy how to handle isolation is to use an additional decorator
     * passed as a suffix to the uid field.
     *
     * Example uid value for baseSiteA will be email@example.com|baseSiteA
     */
    getBaseSiteDecorator() {
        return this.baseSiteService.get().pipe(take(1), map((baseSite) => Boolean(baseSite?.isolated)
            ? this.MULTISITE_SEPARATOR + baseSite?.uid
            : ''));
    }
    /**
     * Method returns concatenated `userId` with the decorator suffix.
     *
     * @param userId The `userId` for given user
     */
    decorateUserId(userId) {
        return this.getBaseSiteDecorator().pipe(map((decorator) => userId + decorator));
    }
}
AuthMultisiteIsolationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthMultisiteIsolationService, deps: [{ token: i1.BaseSiteService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthMultisiteIsolationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthMultisiteIsolationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthMultisiteIsolationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.BaseSiteService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1tdWx0aXNpdGUtaXNvbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL3VzZXItYXV0aC9zZXJ2aWNlcy9hdXRoLW11bHRpc2l0ZS1pc29sYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLDZCQUE2QjtJQUd4QyxZQUFzQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFGbkMsd0JBQW1CLEdBQUcsR0FBRyxDQUFDO0lBRVksQ0FBQztJQUUxRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUNmLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxFQUFFLEdBQUc7WUFDMUMsQ0FBQyxDQUFDLEVBQUUsQ0FDUCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FDdkMsQ0FBQztJQUNKLENBQUM7OzBIQXBDVSw2QkFBNkI7OEhBQTdCLDZCQUE2QixjQUY1QixNQUFNOzJGQUVQLDZCQUE2QjtrQkFIekMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCYXNlU2l0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaXRlLWNvbnRleHQvZmFjYWRlL2Jhc2Utc2l0ZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNdWx0aXNpdGVJc29sYXRpb25TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IE1VTFRJU0lURV9TRVBBUkFUT1IgPSAnfCc7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBXaGVuIGlzb2xhdGlvbiBpcyB0dXJuZWQgb24sIGEgY3VzdG9tZXIgd2hvIHJlZ2lzdGVycyBmb3IgYmFzZVNpdGVBXG4gICAqIGNhbiBvbmx5IGxvZyBpbnRvIGJhc2VTaXRlQSwgbm90IGJhc2VTaXRlQi5cbiAgICogVG8gbG9naW4gaW50byBiYXNlU2l0ZUIgY3VzdG9tZXIgaGF2ZSB0byB1c2UgdGhlIHNhbWUgZS1tYWlsIGFuZCByZWdpc3RlciBhbiBhY2NvdW50XG4gICAqIG9uIGJhc2VTaXRlQi5cbiAgICpcbiAgICogVGhlIHN0cmF0ZWd5IGhvdyB0byBoYW5kbGUgaXNvbGF0aW9uIGlzIHRvIHVzZSBhbiBhZGRpdGlvbmFsIGRlY29yYXRvclxuICAgKiBwYXNzZWQgYXMgYSBzdWZmaXggdG8gdGhlIHVpZCBmaWVsZC5cbiAgICpcbiAgICogRXhhbXBsZSB1aWQgdmFsdWUgZm9yIGJhc2VTaXRlQSB3aWxsIGJlIGVtYWlsQGV4YW1wbGUuY29tfGJhc2VTaXRlQVxuICAgKi9cbiAgZ2V0QmFzZVNpdGVEZWNvcmF0b3IoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iYXNlU2l0ZVNlcnZpY2UuZ2V0KCkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKGJhc2VTaXRlKSA9PlxuICAgICAgICBCb29sZWFuKGJhc2VTaXRlPy5pc29sYXRlZClcbiAgICAgICAgICA/IHRoaXMuTVVMVElTSVRFX1NFUEFSQVRPUiArIGJhc2VTaXRlPy51aWRcbiAgICAgICAgICA6ICcnXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgcmV0dXJucyBjb25jYXRlbmF0ZWQgYHVzZXJJZGAgd2l0aCB0aGUgZGVjb3JhdG9yIHN1ZmZpeC5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgYHVzZXJJZGAgZm9yIGdpdmVuIHVzZXJcbiAgICovXG4gIGRlY29yYXRlVXNlcklkKHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRCYXNlU2l0ZURlY29yYXRvcigpLnBpcGUoXG4gICAgICBtYXAoKGRlY29yYXRvcikgPT4gdXNlcklkICsgZGVjb3JhdG9yKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==