import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import {
//   ConfigFromOccBaseSites,
//   fetchOccBaseSites,
//   getConfigFromOccBaseSites,
//   getOccBaseUrlFromMetaTag,
// } from '@spartacus/core';
import { AppModule } from './app/app.module';
import { fetchOccBaseSites } from './app/base-site/fetch-occ-base-sites';
import { getConfigFromOccBaseSites } from './app/base-site/get-config-from-occ-base-sites';
import { getOccBaseUrlFromMetaTag } from './app/base-site/get-occ-base-url-from-meta-tag';
import { rehydrateStateOccBaseSitesConfig } from './app/base-site/occ-base-sites-config-transfer-state';
import { ConfigFromOccBaseSites } from './app/base-site/occ-base-sites-config.providers';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  const rehydratedConfig = rehydrateStateOccBaseSitesConfig();
  const configPromise = rehydratedConfig
    ? Promise.resolve(rehydratedConfig)
    : fetchOccBaseSites({ baseUrl: getOccBaseUrlFromMetaTag() }).then(
        baseSites => {
          console.log(baseSites); // spike todo remove
          return getConfigFromOccBaseSites(baseSites, document.location.href);
        }
      );

  configPromise.then(config => {
    console.log(config); // spike todo remove
    platformBrowserDynamic([
      { provide: ConfigFromOccBaseSites, useValue: config },
    ]).bootstrapModule(AppModule);
  });
});
