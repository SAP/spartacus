/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/core';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}

export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
export { AppServerModule } from './app/app.server.module';
export const ngExpressEngine = NgExpressEngineDecorator.get(engine);

export { renderModule, renderModuleFactory } from '@angular/platform-server';
