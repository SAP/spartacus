import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  orderApprovalTranslationChunksConfig,
  orderApprovalTranslations,
} from '@spartacus/organization/order-approval/assets';
import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';

@NgModule({
  imports: [OrderApprovalRootModule],
  providers: [
    provideConfig({
      featureModules: {
        organizationOrderApproval: {
          module: () =>
            import('@spartacus/organization/order-approval').then(
              (m) => m.OrderApprovalModule
            ),
        },
      },
      i18n: {
        resources: orderApprovalTranslations,
        chunks: orderApprovalTranslationChunksConfig,
      },
    }),
  ],
})
export class OrderApprovalFeatureModule {}
