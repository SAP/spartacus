import { ProductConfigurationModule } from '@spartacus/productconfig';
import { FeatureEnvironment } from '../models/feature.model';

export const productconfigFeature: FeatureEnvironment = {
  imports: [ProductConfigurationModule],
};
