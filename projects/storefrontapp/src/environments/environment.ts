// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: false,
  occBaseUrl:
    'https://spartacus-dev0.eastus.cloudapp.azure.com:9002' ||
    // 'https://spartacus-dev3.eastus.cloudapp.azure.com:9002' ||
    // 'https://api.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com' ||
    build.process.env.SPARTACUS_BASE_URL,
  occApiPrefix: '/occ/v2/',
  b2b: true,
  cds: false,
  cdc: false,
};
