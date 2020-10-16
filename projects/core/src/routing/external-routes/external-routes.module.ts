import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { addExternalRoutesFactory } from './external-routes.providers';
import { ExternalRoutesService } from './external-routes.service';

/**
 * Prepends the external route that redirects to a different storefront system for configured URLs
 */
@NgModule()
export class ExternalRoutesModule {
  static forRoot(): ModuleWithProviders<ExternalRoutesModule> {
    return {
      ngModule: ExternalRoutesModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: addExternalRoutesFactory,
          deps: [ExternalRoutesService],
        },
      ],
    };
  }
}
