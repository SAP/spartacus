import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  orderApprovalTranslationChunksConfig,
  orderApprovalTranslations,
} from '@spartacus/organization/order-approval/assets';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from 'feature-libs/organization/unit-order/root/feature-name';
import { UnitOrderModule } from 'feature-libs/organization/unit-order/unit-order.module';

@NgModule({
  imports: [UnitOrderModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_UNIT_ORDER_FEATURE]: {
          module: () =>
            import('@spartacus/organization/unit-order').then(
              (m) => m.UnitOrderModule
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
export class UnitOrderFeatureModule {}
