/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, inject, isDevMode, NgModule, Optional, } from '@angular/core';
import { LoggerService } from '../../logger';
import { ConfigInitializerService } from '../config-initializer/config-initializer.service';
import { ConfigValidatorToken, validateConfig, } from './config-validator';
import * as i0 from "@angular/core";
export function configValidatorFactory(configInitializer, validators) {
    const logger = inject(LoggerService);
    return () => {
        if (isDevMode()) {
            configInitializer
                .getStable()
                .subscribe((config) => validateConfig(config, validators || [], logger));
        }
    };
}
/**
 * Should stay private in 1.x
 * as forRoot() is used internally by ConfigInitializerModule
 *
 * issue: #5279
 */
export class ConfigValidatorModule {
    static forRoot() {
        return {
            ngModule: ConfigValidatorModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    useFactory: configValidatorFactory,
                    deps: [
                        ConfigInitializerService,
                        [new Optional(), ConfigValidatorToken],
                    ],
                },
            ],
        };
    }
}
ConfigValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfigValidatorModule });
ConfigValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigValidatorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigValidatorModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXZhbGlkYXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jb25maWcvY29uZmlnLXZhbGlkYXRvci9jb25maWctdmFsaWRhdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUVULFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM3QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RixPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLGNBQWMsR0FDZixNQUFNLG9CQUFvQixDQUFDOztBQUU1QixNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLGlCQUEyQyxFQUMzQyxVQUE2QjtJQUU3QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckMsT0FBTyxHQUFHLEVBQUU7UUFDVixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsaUJBQWlCO2lCQUNkLFNBQVMsRUFBRTtpQkFDWCxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNwQixjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ2pELENBQUM7U0FDTDtJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO29CQUNYLFVBQVUsRUFBRSxzQkFBc0I7b0JBQ2xDLElBQUksRUFBRTt3QkFDSix3QkFBd0I7d0JBQ3hCLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQztxQkFDdkM7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztrSEFoQlUscUJBQXFCO21IQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBQX0lOSVRJQUxJWkVSLFxuICBpbmplY3QsXG4gIGlzRGV2TW9kZSxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sb2dnZXInO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlnLWluaXRpYWxpemVyL2NvbmZpZy1pbml0aWFsaXplci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbmZpZ1ZhbGlkYXRvcixcbiAgQ29uZmlnVmFsaWRhdG9yVG9rZW4sXG4gIHZhbGlkYXRlQ29uZmlnLFxufSBmcm9tICcuL2NvbmZpZy12YWxpZGF0b3InO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnVmFsaWRhdG9yRmFjdG9yeShcbiAgY29uZmlnSW5pdGlhbGl6ZXI6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgdmFsaWRhdG9yczogQ29uZmlnVmFsaWRhdG9yW11cbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25maWdJbml0aWFsaXplclxuICAgICAgICAuZ2V0U3RhYmxlKClcbiAgICAgICAgLnN1YnNjcmliZSgoY29uZmlnKSA9PlxuICAgICAgICAgIHZhbGlkYXRlQ29uZmlnKGNvbmZpZywgdmFsaWRhdG9ycyB8fCBbXSwgbG9nZ2VyKVxuICAgICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBTaG91bGQgc3RheSBwcml2YXRlIGluIDEueFxuICogYXMgZm9yUm9vdCgpIGlzIHVzZWQgaW50ZXJuYWxseSBieSBDb25maWdJbml0aWFsaXplck1vZHVsZVxuICpcbiAqIGlzc3VlOiAjNTI3OVxuICovXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ1ZhbGlkYXRvck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlnVmFsaWRhdG9yTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maWdWYWxpZGF0b3JNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjb25maWdWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgICAgICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgQ29uZmlnVmFsaWRhdG9yVG9rZW5dLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==