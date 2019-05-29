import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { GlobalMessageService } from './facade/global-message.service';
import {
  httpErrorInterceptors,
  errorHandlers,
} from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
import { GlobalMessageEffects } from './store/effects/global-message.effects';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffects]),
  ],

  providers: [GlobalMessageService],
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalMessageModule,
      providers: [...errorHandlers, ...httpErrorInterceptors],
    };
  }
}
