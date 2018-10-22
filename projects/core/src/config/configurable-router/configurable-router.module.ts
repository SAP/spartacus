import { Routes, ROUTES, provideRoutes } from '@angular/router';
import {
  ModuleWithProviders,
  ANALYZE_FOR_ENTRY_COMPONENTS,
  InjectionToken,
  NgModule
} from '@angular/core';
import { Config } from '../config.module';
import { ServerConfig } from '../server-config/server-config';
import { CommonModule } from '@angular/common';
import { ConfigurableRoutes } from './configurable-routes';

export const CONFIGURABLE_ROUTES = new InjectionToken('CONFIGURABLE_ROUTES');

const provideChildRoutes = (
  configModule: ServerConfig,
  configurableRoutes: ConfigurableRoutes
): Routes => {
  return Object.keys(configurableRoutes).map(routeName => {
    const { defaultPath, route } = configurableRoutes[routeName];
    const path = configModule.routePaths[routeName] || defaultPath;
    return Object.assign({}, route, { path });
  });
};

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ConfigurableRouterModule {
  static forChild(configurableRoutes: ConfigurableRoutes): ModuleWithProviders {
    return {
      ngModule: ConfigurableRouterModule,
      providers: [
        provideRoutes([]),

        // pass configurable routes value to provideChildRoutes second parameter
        // TODO check if multi is needed here - in case of many routes
        {
          provide: CONFIGURABLE_ROUTES,
          useValue: configurableRoutes
        },

        // inject routers to angular router
        {
          provide: ROUTES,
          useFactory: provideChildRoutes,
          deps: [Config, CONFIGURABLE_ROUTES],
          multi: true
        },

        // TODO: chcek why it's needed, but angular router uses it
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: configurableRoutes,
          multi: true
        }
      ]
    };
  }
}
