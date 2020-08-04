import { CDCModule } from '@spartacus/cdc';
import { FeatureEnvironment } from '../models/feature.model';
export const cdcFeature: FeatureEnvironment = {
  imports: [
    CDCModule.forRoot({
      cdc: [
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
