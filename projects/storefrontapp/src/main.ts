import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ExternalConfig, OccExternalConfigLoader } from '@spartacus/core';
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
