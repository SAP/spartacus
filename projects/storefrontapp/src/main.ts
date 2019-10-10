import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ExternalConfig } from '@spartacus/core';
import { OccExternalConfigLoader } from 'projects/core/src/occ/external-config/occ-external-config-loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  OccExternalConfigLoader.rehydrate()
    .catch(() => OccExternalConfigLoader.load())
    .then(config => {
      platformBrowserDynamic([
        { provide: ExternalConfig, useValue: config },
      ]).bootstrapModule(AppModule);
    })
    .catch(error => isDevMode() && console.error(error));
});
