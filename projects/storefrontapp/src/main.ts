import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { fetchOccBaseSitesConfig } from '../../core/src/occ/base-site/fetch-occ-base-sites-config';
import { OccBaseSitesConfig } from '../../core/src/occ/base-site/occ-base-sites-config.providers';
import { AppModule } from './app/app.module';
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
