import { GigyaModule } from 'projects/gigya/public_api';
import { FeatureEnvironment } from '../models/feature.model';

export const gigyaFeature: FeatureEnvironment = {
  imports: [
    GigyaModule.forRoot({
      gigya: [
        {
          baseSite: 'electronics-cdc',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
        {
          baseSite: 'electronics-spa',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
      ],
    }),
  ],
};
