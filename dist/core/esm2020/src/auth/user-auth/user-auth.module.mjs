/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { switchMap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { provideDefaultConfig } from '../../config/config-providers';
import { provideConfigValidator } from '../../config/config-validator/config-validator';
import { baseUrlConfigValidator } from './config/base-url-config-validator';
import { defaultAuthConfig } from './config/default-auth-config';
import { UserAuthEventModule } from './events/user-auth-event.module';
import { AuthService } from './facade/auth.service';
import { interceptors } from './http-interceptors/index';
import { AuthStatePersistenceService } from './services/auth-state-persistence.service';
import { AuthStorageService } from './services/auth-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "angular-oauth2-oidc";
/**
 * Initialize the check for `token` or `code` in the url returned from the OAuth server.
 */
export function checkOAuthParamsInUrl(authService, configInit) {
    const result = () => configInit
        .getStable()
        .pipe(switchMap(() => 
    // Wait for stable config is used, because with auth redirect would kick so quickly that the page would not be loaded correctly
    authService.checkOAuthParamsInUrl()))
        .toPromise();
    return result;
}
export function authStatePersistenceFactory(authStatePersistenceService) {
    const result = () => authStatePersistenceService.initSync();
    return result;
}
/**
 * Authentication module for a user. Handlers requests for logged in users,
 * provides authorization services and storage for tokens.
 */
export class UserAuthModule {
    static forRoot() {
        return {
            ngModule: UserAuthModule,
            providers: [
                provideDefaultConfig(defaultAuthConfig),
                provideConfigValidator(baseUrlConfigValidator),
                ...interceptors,
                {
                    provide: OAuthStorage,
                    useExisting: AuthStorageService,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: authStatePersistenceFactory,
                    deps: [AuthStatePersistenceService],
                    multi: true,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: checkOAuthParamsInUrl,
                    deps: [AuthService, ConfigInitializerService],
                    multi: true,
                },
            ],
        };
    }
}
UserAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAuthModule, imports: [CommonModule, i1.OAuthModule, UserAuthEventModule] });
UserAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAuthModule, imports: [CommonModule, OAuthModule.forRoot(), UserAuthEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OAuthModule.forRoot(), UserAuthEventModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hdXRoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL3VzZXItYXV0aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDeEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBRXJFOztHQUVHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxXQUF3QixFQUN4QixVQUFvQztJQUVwQyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FDbEIsVUFBVTtTQUNQLFNBQVMsRUFBRTtTQUNYLElBQUksQ0FDSCxTQUFTLENBQUMsR0FBRyxFQUFFO0lBQ2IsK0hBQStIO0lBQy9ILFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUNwQyxDQUNGO1NBQ0EsU0FBUyxFQUFFLENBQUM7SUFFakIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkIsQ0FDekMsMkJBQXdEO0lBRXhELE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1Qsb0JBQW9CLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZDLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDO2dCQUM5QyxHQUFHLFlBQVk7Z0JBQ2Y7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFdBQVcsRUFBRSxrQkFBa0I7aUJBQ2hDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsMkJBQTJCO29CQUN2QyxJQUFJLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDbkMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7b0JBQ2pDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSx3QkFBd0IsQ0FBQztvQkFDN0MsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsyR0ExQlUsY0FBYzs0R0FBZCxjQUFjLFlBRmYsWUFBWSxrQkFBeUIsbUJBQW1COzRHQUV2RCxjQUFjLFlBRmYsWUFBWSxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxtQkFBbUI7MkZBRXZELGNBQWM7a0JBSDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQztpQkFDcEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT0F1dGhNb2R1bGUsIE9BdXRoU3RvcmFnZSB9IGZyb20gJ2FuZ3VsYXItb2F1dGgyLW9pZGMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWctcHJvdmlkZXJzJztcbmltcG9ydCB7IHByb3ZpZGVDb25maWdWYWxpZGF0b3IgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLXZhbGlkYXRvci9jb25maWctdmFsaWRhdG9yJztcbmltcG9ydCB7IGJhc2VVcmxDb25maWdWYWxpZGF0b3IgfSBmcm9tICcuL2NvbmZpZy9iYXNlLXVybC1jb25maWctdmFsaWRhdG9yJztcbmltcG9ydCB7IGRlZmF1bHRBdXRoQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1hdXRoLWNvbmZpZyc7XG5pbXBvcnQgeyBVc2VyQXV0aEV2ZW50TW9kdWxlIH0gZnJvbSAnLi9ldmVudHMvdXNlci1hdXRoLWV2ZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vZmFjYWRlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBpbnRlcmNlcHRvcnMgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2luZGV4JztcbmltcG9ydCB7IEF1dGhTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aC1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aC1zdG9yYWdlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGNoZWNrIGZvciBgdG9rZW5gIG9yIGBjb2RlYCBpbiB0aGUgdXJsIHJldHVybmVkIGZyb20gdGhlIE9BdXRoIHNlcnZlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrT0F1dGhQYXJhbXNJblVybChcbiAgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICBjb25maWdJbml0OiBDb25maWdJbml0aWFsaXplclNlcnZpY2Vcbik6ICgpID0+IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCByZXN1bHQgPSAoKSA9PlxuICAgIGNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIC8vIFdhaXQgZm9yIHN0YWJsZSBjb25maWcgaXMgdXNlZCwgYmVjYXVzZSB3aXRoIGF1dGggcmVkaXJlY3Qgd291bGQga2ljayBzbyBxdWlja2x5IHRoYXQgdGhlIHBhZ2Ugd291bGQgbm90IGJlIGxvYWRlZCBjb3JyZWN0bHlcbiAgICAgICAgICBhdXRoU2VydmljZS5jaGVja09BdXRoUGFyYW1zSW5VcmwoKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhTdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeShcbiAgYXV0aFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBBdXRoU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Vcbikge1xuICBjb25zdCByZXN1bHQgPSAoKSA9PiBhdXRoU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UuaW5pdFN5bmMoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBdXRoZW50aWNhdGlvbiBtb2R1bGUgZm9yIGEgdXNlci4gSGFuZGxlcnMgcmVxdWVzdHMgZm9yIGxvZ2dlZCBpbiB1c2VycyxcbiAqIHByb3ZpZGVzIGF1dGhvcml6YXRpb24gc2VydmljZXMgYW5kIHN0b3JhZ2UgZm9yIHRva2Vucy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT0F1dGhNb2R1bGUuZm9yUm9vdCgpLCBVc2VyQXV0aEV2ZW50TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckF1dGhNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFVzZXJBdXRoTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBVc2VyQXV0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QXV0aENvbmZpZyksXG4gICAgICAgIHByb3ZpZGVDb25maWdWYWxpZGF0b3IoYmFzZVVybENvbmZpZ1ZhbGlkYXRvciksXG4gICAgICAgIC4uLmludGVyY2VwdG9ycyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE9BdXRoU3RvcmFnZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGF1dGhTdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbQXV0aFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlXSxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjaGVja09BdXRoUGFyYW1zSW5VcmwsXG4gICAgICAgICAgZGVwczogW0F1dGhTZXJ2aWNlLCBDb25maWdJbml0aWFsaXplclNlcnZpY2VdLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=