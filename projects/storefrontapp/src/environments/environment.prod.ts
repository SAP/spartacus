import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: true,
  occBaseUrl:
    build.process.env.SPARTACUS_BASE_URL ??
    'https://spartacus-ci.eastus.cloudapp.azure.com',
  occApiPrefix: build.process.env.SPARTACUS_API_PREFIX ?? '/occ/v2/',
  cds: build.process.env.SPARTACUS_CDS,
  b2b: build.process.env.SPARTACUS_B2B,
  cdc: build.process.env.SPARTACUS_CDC,
};
