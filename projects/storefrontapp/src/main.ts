import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  ConfigFromOccBaseSites,
  fetchOccBaseSites,
  getConfigFromOccBaseSites,
} from '@spartacus/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchOccBaseSites()
    .then(baseSites => {
      console.log(baseSites); // spike todo remove
      return getConfigFromOccBaseSites(baseSites, document.location.href);
    })
    .then(config => {
      console.log(config); // spike todo remove
      platformBrowserDynamic([
        { provide: ConfigFromOccBaseSites, useValue: config },
      ]).bootstrapModule(AppModule);
    });
});
