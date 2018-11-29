import { NgModule } from '@angular/core';

import { UserService } from './facade';
import { UserStoreModule } from './store/user-store.module';
import { UserOccModule } from './occ/user-occ.module';

@NgModule({
  imports: [UserOccModule, UserStoreModule],
  providers: [UserService]
})
export class UserModule {}
