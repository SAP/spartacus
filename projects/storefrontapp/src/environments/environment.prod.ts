import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: true,
  occBaseUrl:
    build.process.env.SPARTACUS_BASE_URL ??
    'https://dev-com-17.accdemo.b2c.ydev.hybris.com:9002',
  occApiPrefix: build.process.env.SPARTACUS_API_PREFIX ?? '/rest/v2/',
  cds: build.process.env.SPARTACUS_CDS,
  b2b: build.process.env.SPARTACUS_B2B,
};
