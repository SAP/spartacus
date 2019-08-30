import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { GlobalMessageService } from './facade/global-message.service';
import {
  httpErrorInterceptors,
  errorHandlers,
} from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
import { GlobalMessageEffect } from './store/effects/global-message.effect';

import { Config, ConfigModule } from '../config/config.module';
import { defaultGlobalMessageConfigFactory } from './config/default-global-message-config';
import { GlobalMessageConfig } from './config/global-message-config';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffect]),
    ConfigModule.withConfigFactory(defaultGlobalMessageConfigFactory),
  ],
  providers: [
    GlobalMessageService,
    { provide: GlobalMessageConfig, useExisting: Config },
  ],
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders<GlobalMessageModule> {
    return {
      ngModule: GlobalMessageModule,
      providers: [...errorHandlers, ...httpErrorInterceptors],
    };
  }
}
