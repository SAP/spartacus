import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultAnonymousConsentsConfig } from './config/default-anonymous-consents-config';
import { AnonymousConsentsService } from './facade/anonymous-consents.service';
import { interceptors } from './http-interceptors/index';
import { AnonymousConsentsStoreModule } from './store/anonymous-consents-store.module';
import { provideDefaultConfig } from '../config/config-providers';

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
        provideDefaultConfig(defaultAnonymousConsentsConfig),
      ],
    };
  }
}
