/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CloseAccountModule } from './close-account/close-account.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RegisterComponentModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UpdateEmailModule } from './update-email/update-email.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { UpdateProfileModule } from './update-profile/update-profile.module';
import * as i0 from "@angular/core";
export class UserProfileComponentsModule {
}
UserProfileComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, imports: [RegisterComponentModule,
        UpdateProfileModule,
        UpdateEmailModule,
        UpdatePasswordModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        CloseAccountModule] });
UserProfileComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, imports: [RegisterComponentModule,
        UpdateProfileModule,
        UpdateEmailModule,
        UpdatePasswordModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        CloseAccountModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RegisterComponentModule,
                        UpdateProfileModule,
                        UpdateEmailModule,
                        UpdatePasswordModule,
                        ForgotPasswordModule,
                        ResetPasswordModule,
                        CloseAccountModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3VzZXItcHJvZmlsZS1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFhN0UsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLFlBVHBDLHVCQUF1QjtRQUN2QixtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLGtCQUFrQjt5SEFHVCwyQkFBMkIsWUFUcEMsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsa0JBQWtCOzJGQUdULDJCQUEyQjtrQkFYdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsdUJBQXVCO3dCQUN2QixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3FCQUNuQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbG9zZUFjY291bnRNb2R1bGUgfSBmcm9tICcuL2Nsb3NlLWFjY291bnQvY2xvc2UtYWNjb3VudC5tb2R1bGUnO1xuaW1wb3J0IHsgRm9yZ290UGFzc3dvcmRNb2R1bGUgfSBmcm9tICcuL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQubW9kdWxlJztcbmltcG9ydCB7IFJlZ2lzdGVyQ29tcG9uZW50TW9kdWxlIH0gZnJvbSAnLi9yZWdpc3Rlci9yZWdpc3Rlci5tb2R1bGUnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZE1vZHVsZSB9IGZyb20gJy4vcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQubW9kdWxlJztcbmltcG9ydCB7IFVwZGF0ZUVtYWlsTW9kdWxlIH0gZnJvbSAnLi91cGRhdGUtZW1haWwvdXBkYXRlLWVtYWlsLm1vZHVsZSc7XG5pbXBvcnQgeyBVcGRhdGVQYXNzd29yZE1vZHVsZSB9IGZyb20gJy4vdXBkYXRlLXBhc3N3b3JkL3VwZGF0ZS1wYXNzd29yZC5tb2R1bGUnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZU1vZHVsZSB9IGZyb20gJy4vdXBkYXRlLXByb2ZpbGUvdXBkYXRlLXByb2ZpbGUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJlZ2lzdGVyQ29tcG9uZW50TW9kdWxlLFxuICAgIFVwZGF0ZVByb2ZpbGVNb2R1bGUsXG4gICAgVXBkYXRlRW1haWxNb2R1bGUsXG4gICAgVXBkYXRlUGFzc3dvcmRNb2R1bGUsXG4gICAgRm9yZ290UGFzc3dvcmRNb2R1bGUsXG4gICAgUmVzZXRQYXNzd29yZE1vZHVsZSxcbiAgICBDbG9zZUFjY291bnRNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlQ29tcG9uZW50c01vZHVsZSB7fVxuIl19