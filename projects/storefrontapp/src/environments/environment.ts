// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: false,
  occBaseUrl:
    build.process.env.SPARTACUS_BASE_URL ??
    'https://spartacus-devci767.eastus.cloudapp.azure.com:9002',
  // 'https://spartacus-dev0.eastus.cloudapp.azure.com:9002',
  occApiPrefix: build.process.env.SPARTACUS_API_PREFIX ?? '/occ/v2/',
  cds: build.process.env.SPARTACUS_CDS ?? false,
  b2b: build.process.env.SPARTACUS_B2B ?? false,
  cdc: build.process.env.SPARTACUS_CDC ?? false,
  tracking: build.process.env.SPARTACUS_TRACKING ?? true,
};
