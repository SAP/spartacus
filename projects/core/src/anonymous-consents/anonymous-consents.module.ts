import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '../config/config.module';
import { AnonymousConsentsConfig } from './config/anonymous-consents-config';
import { defaultAnonymousConsentsConfig } from './config/default-anonymous-consents-config';
import { AnonymousConsentsService } from './facade/anonymous-consents.service';
import { interceptors } from './http-interceptors/index';
import { AnonymousConsentsStoreModule } from './store/anonymous-consents-store.module';

@NgModule({
  imports: [AnonymousConsentsStoreModule],
})
export class AnonymousConsentsModule {
  static forRoot(): ModuleWithProviders<AnonymousConsentsModule> {
    return {
      ngModule: AnonymousConsentsModule,
      providers: [
        ...interceptors,
        AnonymousConsentsService,
        { provide: AnonymousConsentsConfig, useExisting: Config },
        provideDefaultConfig(defaultAnonymousConsentsConfig),
      ],
    };
  }
}
