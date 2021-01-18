import { NgModule } from '@angular/core';
import { UserComponentsModule } from 'feature-libs/user/profile/components/public_api';
import { UserCoreModule } from 'feature-libs/user/profile/core/public_api';
import { UserOccModule } from 'feature-libs/user/profile/occ/public_api';

@NgModule({
  imports: [UserCoreModule, UserOccModule, UserComponentsModule],
})
export class UserProfileModule {}
