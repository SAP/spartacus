import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: () =>
            import('./custom-login-form.component').then(
              (m) => m.CustomLoginFormComponent
            ),
        },
      },
    }),
  ],
})
export class CustomLoginModule {}
