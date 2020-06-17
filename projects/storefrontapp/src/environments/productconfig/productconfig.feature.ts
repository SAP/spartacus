import { ProductConfigurationModule } from '@spartacus/product/configuration';
import { FeatureEnvironment } from '../models/feature.model';
export const productConfigFeature: FeatureEnvironment = {
  imports: [ProductConfigurationModule],
};
