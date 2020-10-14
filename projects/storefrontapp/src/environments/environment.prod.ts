import { Environment } from './models/environment.model';

export const environment: Environment = {lazy
  production: true,
  occBaseUrl:
    build.process.env.SPARTACUS_BASE_URL ??
    'https://spartacus-dev0.eastus.cloudapp.azure.com:9002',
  // 'https://spartacus-dev3.eastus.cloudapp.azure.com:9002',
  occApiPrefix: build.process.env.SPARTACUS_API_PREFIX ?? '/occ/v2/',
  cds: false,
  b2b: true,
  cdc: false,
};
