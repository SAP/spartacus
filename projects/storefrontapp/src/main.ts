import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { fetchOccBaseSitesConfig } from './app/base-site/fetch-occ-base-sites-config';
import { OccBaseSitesConfig } from './app/base-site/occ-base-sites-config.providers';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchOccBaseSitesConfig()
    .then(config => {
      platformBrowserDynamic([
        { provide: OccBaseSitesConfig, useValue: config },
      ]).bootstrapModule(AppModule);
    })
    .catch(error => isDevMode() && console.error(error));
});
