/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { errorHandlers, httpErrorInterceptors, } from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
import { GlobalMessageEffect } from './store/effects/global-message.effect';
import { defaultGlobalMessageConfig } from './config/default-global-message-config';
import { provideDefaultConfig } from '../config/config-providers';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
export class GlobalMessageModule {
    static forRoot() {
        return {
            ngModule: GlobalMessageModule,
            providers: [...errorHandlers, ...httpErrorInterceptors],
        };
    }
}
GlobalMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GlobalMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageModule, imports: [GlobalMessageStoreModule, i1.EffectsFeatureModule] });
GlobalMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageModule, providers: [provideDefaultConfig(defaultGlobalMessageConfig)], imports: [GlobalMessageStoreModule,
        EffectsModule.forFeature([GlobalMessageEffect])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GlobalMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        GlobalMessageStoreModule,
                        EffectsModule.forFeature([GlobalMessageEffect]),
                    ],
                    providers: [provideDefaultConfig(defaultGlobalMessageConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLW1lc3NhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvZ2xvYmFsLW1lc3NhZ2UvZ2xvYmFsLW1lc3NhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFDTCxhQUFhLEVBQ2IscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFNUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQVNsRSxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztTQUN4RCxDQUFDO0lBQ0osQ0FBQzs7Z0hBTlUsbUJBQW1CO2lIQUFuQixtQkFBbUIsWUFMNUIsd0JBQXdCO2lIQUtmLG1CQUFtQixhQUZuQixDQUFDLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLENBQUMsWUFIM0Qsd0JBQXdCO1FBQ3hCLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzJGQUl0QyxtQkFBbUI7a0JBUC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUM7cUJBQ2hEO29CQUNELFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLENBQUM7aUJBQzlEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdHNNb2R1bGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7XG4gIGVycm9ySGFuZGxlcnMsXG4gIGh0dHBFcnJvckludGVyY2VwdG9ycyxcbn0gZnJvbSAnLi9odHRwLWludGVyY2VwdG9ycy9pbmRleCc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL2dsb2JhbC1tZXNzYWdlLXN0b3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlRWZmZWN0IH0gZnJvbSAnLi9zdG9yZS9lZmZlY3RzL2dsb2JhbC1tZXNzYWdlLmVmZmVjdCc7XG5cbmltcG9ydCB7IGRlZmF1bHRHbG9iYWxNZXNzYWdlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1nbG9iYWwtbWVzc2FnZS1jb25maWcnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLXByb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBHbG9iYWxNZXNzYWdlU3RvcmVNb2R1bGUsXG4gICAgRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlKFtHbG9iYWxNZXNzYWdlRWZmZWN0XSksXG4gIF0sXG4gIHByb3ZpZGVyczogW3Byb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRHbG9iYWxNZXNzYWdlQ29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIEdsb2JhbE1lc3NhZ2VNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEdsb2JhbE1lc3NhZ2VNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEdsb2JhbE1lc3NhZ2VNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsuLi5lcnJvckhhbmRsZXJzLCAuLi5odHRwRXJyb3JJbnRlcmNlcHRvcnNdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==