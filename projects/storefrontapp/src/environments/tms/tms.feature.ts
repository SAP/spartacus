import { GoogleTagManagerModule } from '@spartacus/tms';
import { FeatureEnvironment } from '../models/feature.model';
export const tmsFeature: FeatureEnvironment = {
  imports: [GoogleTagManagerModule],
};
