import { CommonConfiguratorModule } from '@spartacus/product/configurators/common';
import { TextfieldConfiguratorModule } from '@spartacus/product/configurators/textfield';
import { VariantConfiguratorModule } from '@spartacus/product/configurators/variant';
import { FeatureEnvironment } from '../models/feature.model';
export const productConfigFeature: FeatureEnvironment = {
  imports: [
    TextfieldConfiguratorModule,
    CommonConfiguratorModule,
    VariantConfiguratorModule,
  ],
};
