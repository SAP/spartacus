import { NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultCustomer360Config } from './config';
import { ASM_360_CORE_FEATURE, ASM_360_FEATURE } from './feature-name';

@NgModule({
  providers: [
    provideDefaultConfig(defaultCustomer360Config),
    provideDefaultConfig({
      featureModules: {
        [ASM_360_FEATURE]: {
          cmsComponents: [
            'AsmCustomer360Component',
            'AsmCustomer360ProfileComponent',
            'AsmCustomer360CustomerActivityComponent',
            'AsmCustomer360ActiveCartComponent',
            'AsmCustomer360SavedCartComponent',
            'AsmCustomer360ProductInterestsComponent',
            'AsmCustomer360ProductReviewsComponent',
            'AsmCustomer360MapComponent',
          ],
          dependencies: [ASM_FEATURE],
        },
        [ASM_360_CORE_FEATURE]: ASM_360_FEATURE,
      },
    }),
    // // Are these needed for customer360?
    // {
    //   provide: AuthStorageService,
    //   useExisting: AsmAuthStorageService,
    // },
    // {
    //   provide: AuthService,
    //   useExisting: AsmAuthService,
    // },
    // {
    //   provide: AuthHttpHeaderService,
    //   useExisting: AsmAuthHttpHeaderService,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useExisting: UserIdHttpHeaderInterceptor,
    //   multi: true,
    // },
  ],
})
export class Customer360RootModule {}
