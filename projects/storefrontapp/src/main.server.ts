/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import { enableProdMode } from '@angular/core';
import '@angular/localize/init';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
export { renderModule, renderModuleFactory } from '@angular/platform-server';
export { AppServerModule } from './app/app.server.module';
