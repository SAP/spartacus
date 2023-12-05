/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginModule } from './login/login.module';
import { MyAccountV2UserModule } from './my-account-v2-user';
import * as i0 from "@angular/core";
export class UserAccountComponentsModule {
}
UserAccountComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, imports: [LoginModule,
        LoginFormModule,
        LoginRegisterModule,
        MyAccountV2UserModule] });
UserAccountComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, imports: [LoginModule,
        LoginFormModule,
        LoginRegisterModule,
        MyAccountV2UserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        LoginModule,
                        LoginFormModule,
                        LoginRegisterModule,
                        MyAccountV2UserModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LWNvbXBvbmVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9hY2NvdW50L2NvbXBvbmVudHMvdXNlci1hY2NvdW50LWNvbXBvbmVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFVN0QsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLFlBTnBDLFdBQVc7UUFDWCxlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLHFCQUFxQjt5SEFHWiwyQkFBMkIsWUFOcEMsV0FBVztRQUNYLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIscUJBQXFCOzJGQUdaLDJCQUEyQjtrQkFSdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIscUJBQXFCO3FCQUN0QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dpbkZvcm1Nb2R1bGUgfSBmcm9tICcuL2xvZ2luLWZvcm0vbG9naW4tZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgTG9naW5SZWdpc3Rlck1vZHVsZSB9IGZyb20gJy4vbG9naW4tcmVnaXN0ZXIvbG9naW4tcmVnaXN0ZXIubW9kdWxlJztcbmltcG9ydCB7IExvZ2luTW9kdWxlIH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5tb2R1bGUnO1xuaW1wb3J0IHsgTXlBY2NvdW50VjJVc2VyTW9kdWxlIH0gZnJvbSAnLi9teS1hY2NvdW50LXYyLXVzZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTG9naW5Nb2R1bGUsXG4gICAgTG9naW5Gb3JtTW9kdWxlLFxuICAgIExvZ2luUmVnaXN0ZXJNb2R1bGUsXG4gICAgTXlBY2NvdW50VjJVc2VyTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQWNjb3VudENvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==