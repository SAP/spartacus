import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { cxExpressEngineFactory } from '@spartacus/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
export { AppServerModule } from './app/app.server.module';

export const cxExpressEngine = cxExpressEngineFactory(ngExpressEngine);
