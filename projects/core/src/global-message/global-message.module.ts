import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  errorHandlers,
  httpErrorInterceptors,
} from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
import { GlobalMessageEffect } from './store/effects/global-message.effect';

import { provideDefaultConfigFactory } from '../config/config.module';
import { defaultGlobalMessageConfigFactory } from './config/default-global-message-config';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffect]),
  ],
  providers: [provideDefaultConfigFactory(defaultGlobalMessageConfigFactory)],
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders<GlobalMessageModule> {
    return {
      ngModule: GlobalMessageModule,
      providers: [...errorHandlers, ...httpErrorInterceptors],
    };
  }
}
