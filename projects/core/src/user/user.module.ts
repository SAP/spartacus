import { NgModule } from '@angular/core';
import { UserService } from './facade/index';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserStoreModule],
  providers: [UserService],
})
export class UserModule {}
