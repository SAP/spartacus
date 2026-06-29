import { ApplicationConfig, importProvidersFrom, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';
import { AppServerModule } from './app.module.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), importProvidersFrom(AppServerModule)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
