import { MyAccountModule } from '@spartacus/my-account';
import { FeatureEnvironment } from '../../models/feature.model';

export const myAccountFeature: FeatureEnvironment = {
  imports: [MyAccountModule],
};
