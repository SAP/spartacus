// import { GigyaModule } from '@spartacus/gigya';
import { FeatureEnvironment } from '../models/feature.model';
import { GigyaModule } from '@spartacus/gigya';

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
