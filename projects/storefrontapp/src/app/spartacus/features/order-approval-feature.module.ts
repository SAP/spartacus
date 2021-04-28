import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  orderApprovalTranslationChunksConfig,
  orderApprovalTranslations,
} from '@spartacus/organization/order-approval/assets';
import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';

@NgModule({
  imports: [OrderApprovalRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        organizationOrderApproval: {
          module: () =>
            import('@spartacus/organization/order-approval').then(
              (m) => m.OrderApprovalModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: orderApprovalTranslations,
        chunks: orderApprovalTranslationChunksConfig,
      },
    }),
  ],
})
export class OrderApprovalFeatureModule {}
