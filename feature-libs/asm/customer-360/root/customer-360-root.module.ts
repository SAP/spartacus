import { NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { AsmCustomer360DialogComponent } from './components/asm-customer-360-dialog/asm-customer-360-dialog.component';
import { defaultCustomer360LayoutConfig } from './components/default-customer-360-layout.config';
import { defaultCustomer360Config } from './config';
import { ASM_360_CORE_FEATURE, ASM_360_FEATURE } from './feature-name';

@NgModule({
  imports: [PageComponentModule],
  providers: [
    provideDefaultConfig(defaultCustomer360Config),
    provideDefaultConfig(defaultCustomer360LayoutConfig),
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
  ],
  declarations: [AsmCustomer360DialogComponent],
  exports: [AsmCustomer360DialogComponent],
})
export class Customer360RootModule {}
