import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { GlobalMessageService } from './facade/global-message.service';
import {
  httpErrorInterceptors,
  errorHandlers,
} from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
import { GlobalMessageEffects } from './store/effects/global-message.effects';

import { Config, ConfigModule } from '../config/config.module';
import { defaultGlobalMessageConfig } from './config/default-global-message-config';
import { GlobalMessageConfig } from './config/global-message-config';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffects]),
    ConfigModule.withConfig(defaultGlobalMessageConfig),
  ],
  providers: [
    GlobalMessageService,
    { provide: GlobalMessageConfig, useExisting: Config },
  ],
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalMessageModule,
      providers: [...errorHandlers, ...httpErrorInterceptors],
    };
  }
}
