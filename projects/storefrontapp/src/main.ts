import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import {
//   ConfigFromOccBaseSites,
//   fetchOccBaseSites,
//   getConfigFromOccBaseSites,
//   getOccBaseUrlFromMetaTag,
// } from '@spartacus/core';
import { AppModule } from './app/app.module';
import { fetchOccBaseSitesConfig } from './app/base-site/get-occ-base-sites-config';
import { ConfigFromOccBaseSites } from './app/base-site/occ-base-sites-config.providers';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchOccBaseSitesConfig().then(config => {
    platformBrowserDynamic([
      { provide: ConfigFromOccBaseSites, useValue: config },
    ]).bootstrapModule(AppModule);
  });
});
