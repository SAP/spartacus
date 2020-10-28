import { CdsModule } from '@spartacus/cds';
import { FeatureEnvironment } from '../models/feature.model';

export const cdsFeature: FeatureEnvironment = {
  imports: [
    CdsModule.forRoot({
      cds: {
        tenant: 'argotest',
        baseUrl: 'https://api.stage.context.cloud.sap',
        endpoints: {
          strategyProducts:
            '/strategy/${tenant}/strategies/${strategyId}/products',
        },
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
        profileTag: {
          javascriptUrl:
            'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
          configUrl:
            'https://tag.static.stage.context.cloud.sap/config/dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
          allowInsecureCookies: true,
        },
      },
    }),
  ],
};
