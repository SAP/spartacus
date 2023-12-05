import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./client-token.service";
/**
 * Service for handling `Authorization` header and errors for requests that
 * require client token (eg. user registration).
 */
export class ClientErrorHandlingService {
    constructor(clientTokenService) {
        this.clientTokenService = clientTokenService;
    }
    /**
     * Refreshes client token and retries the request with the new token.
     *
     * @param request
     * @param httpHandler
     */
    handleExpiredClientToken(request, next) {
        return this.clientTokenService.refreshClientToken().pipe(take(1), switchMap((token) => {
            return next.handle(this.createNewRequestWithNewToken(request, token));
        }));
    }
    /**
     * Clones the requests and provided `Authorization` header.
     *
     * @param request
     * @param token
     */
    createNewRequestWithNewToken(request, token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            },
        });
        return request;
    }
}
ClientErrorHandlingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientErrorHandlingService, deps: [{ token: i1.ClientTokenService }], target: i0.ɵɵFactoryTarget.Injectable });
ClientErrorHandlingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientErrorHandlingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientErrorHandlingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ClientTokenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWVycm9yLWhhbmRsaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL2NsaWVudC1hdXRoL3NlcnZpY2VzL2NsaWVudC1lcnJvci1oYW5kbGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSWpEOzs7R0FHRztBQUlILE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFBc0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBRyxDQUFDO0lBRWhFOzs7OztPQUtHO0lBQ0ksd0JBQXdCLENBQzdCLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUN0RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLDRCQUE0QixDQUNwQyxPQUF5QixFQUN6QixLQUFrQjtRQUVsQixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN0QixVQUFVLEVBQUU7Z0JBQ1YsYUFBYSxFQUFFLEdBQUcsS0FBSyxDQUFDLFVBQVUsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTthQUN2RTtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O3VIQXJDVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbGllbnRUb2tlbiB9IGZyb20gJy4uL21vZGVscy9jbGllbnQtdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgQ2xpZW50VG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9jbGllbnQtdG9rZW4uc2VydmljZSc7XG5cbi8qKlxuICogU2VydmljZSBmb3IgaGFuZGxpbmcgYEF1dGhvcml6YXRpb25gIGhlYWRlciBhbmQgZXJyb3JzIGZvciByZXF1ZXN0cyB0aGF0XG4gKiByZXF1aXJlIGNsaWVudCB0b2tlbiAoZWcuIHVzZXIgcmVnaXN0cmF0aW9uKS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENsaWVudEVycm9ySGFuZGxpbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNsaWVudFRva2VuU2VydmljZTogQ2xpZW50VG9rZW5TZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgY2xpZW50IHRva2VuIGFuZCByZXRyaWVzIHRoZSByZXF1ZXN0IHdpdGggdGhlIG5ldyB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHJlcXVlc3RcbiAgICogQHBhcmFtIGh0dHBIYW5kbGVyXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRXhwaXJlZENsaWVudFRva2VuKFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnRUb2tlblNlcnZpY2UucmVmcmVzaENsaWVudFRva2VuKCkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKHRva2VuOiBDbGllbnRUb2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUodGhpcy5jcmVhdGVOZXdSZXF1ZXN0V2l0aE5ld1Rva2VuKHJlcXVlc3QsIHRva2VuKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmVzIHRoZSByZXF1ZXN0cyBhbmQgcHJvdmlkZWQgYEF1dGhvcml6YXRpb25gIGhlYWRlci5cbiAgICpcbiAgICogQHBhcmFtIHJlcXVlc3RcbiAgICogQHBhcmFtIHRva2VuXG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlTmV3UmVxdWVzdFdpdGhOZXdUb2tlbihcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIHRva2VuOiBDbGllbnRUb2tlblxuICApOiBIdHRwUmVxdWVzdDxhbnk+IHtcbiAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XG4gICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGAke3Rva2VuLnRva2VuX3R5cGUgfHwgJ0JlYXJlcid9ICR7dG9rZW4uYWNjZXNzX3Rva2VufWAsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG59XG4iXX0=