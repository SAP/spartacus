import { NgModule } from '@angular/core';
import { ProcessModule } from '../process/process.module';
import { UserService } from './facade/index';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserStoreModule, ProcessModule],
  providers: [UserService],
})
export class UserModule {}
