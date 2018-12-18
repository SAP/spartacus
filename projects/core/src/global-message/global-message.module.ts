import { NgModule } from '@angular/core';
import { GlobalMessageService } from './facade/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
@NgModule({
  imports: [GlobalMessageStoreModule],
  providers: [GlobalMessageService]
})
export class GlobalMessageModule {}
