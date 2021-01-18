import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { LoginRouteModule } from '../components/login-route/login-route.module';
import { LogoutModule } from '../components/logout/logout.module';

@NgModule({
  imports: [LoginRouteModule, LogoutModule],
  providers: [
    provideDefaultConfig({
      featureModules: {
        userDetails: {
          cmsComponents: [
            'LoginComponent',
            'ReturningCustomerLoginComponent',
            'ReturningCustomerRegisterComponent',
          ],
        },
      },
    }),
  ],
})
export class UserDetailsRootModule {}
