import { NgModule } from '@angular/core';

import { UserService } from './facade/index';
import { UserStoreModule } from './store/user-store.module';
import { UserOccModule } from './occ/user-occ.module';
import { ProcessModule } from '../process/process.module';

@NgModule({
  imports: [UserOccModule, UserStoreModule, ProcessModule],
  providers: [UserService]
})
export class UserModule {}
