import { NgModule, ModuleWithProviders } from '@angular/core';

import { GlobalMessageService } from './facade/index';
import { interceptors } from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';

@NgModule({
  imports: [GlobalMessageStoreModule],
  providers: [GlobalMessageService]
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalMessageModule,
      providers: [...interceptors]
    };
  }
}
