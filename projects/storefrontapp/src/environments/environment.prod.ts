import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: true,
  occBaseUrl:
    build.process.env.SPARTACUS_BASE_URL ??
    'https://cpqteamserver.mo.sap.corp:39002',
  occApiPrefix: build.process.env.SPARTACUS_API_PREFIX ?? '/occ/v2/',
  cds: build.process.env.SPARTACUS_CDS,
  b2b: build.process.env.SPARTACUS_B2B,
  cdc: build.process.env.SPARTACUS_CDC,
  productconfig: build.process.env.SPARTACUS_PRODUCTCONFIG,
};
