import { NgModule } from '@angular/core';
import { ProcessModule } from '../process/process.module';
import { UserService } from './facade/index';
import { UserOccModule } from './occ/user-occ.module';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserOccModule, UserStoreModule, ProcessModule],
  providers: [UserService],
})
export class UserModule {}
