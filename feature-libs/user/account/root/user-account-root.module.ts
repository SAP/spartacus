import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { LoginRouteModule } from './login-route/login-route.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
  imports: [LoginRouteModule, LogoutModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
        userDetails: {
          cmsComponents: [
            'LoginComponent',
            // 'ReturningCustomerLoginComponent',
            'ReturningCustomerRegisterComponent',
          ],
        },
      },
    }),
  ],
})
export class UserAccountRootModule {}
