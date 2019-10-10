import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { isDevMode } from '@angular/core';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
export {
  ExternalConfig,
  OccBaseUrlMetaTagUtils,
  OccExternalConfigLoader,
} from '@spartacus/core';
export { AppServerModule } from './app/app.server.module';
