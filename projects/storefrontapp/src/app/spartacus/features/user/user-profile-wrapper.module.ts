import { NgModule, Type } from '@angular/core';
import { CDCUserProfileModule } from '@spartacus/cdc/components/register';
import { UserProfileModule } from '@spartacus/user/profile';

import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdc) {
  extensions.push(CDCUserProfileModule);
}

@NgModule({
  imports: [UserProfileModule, ...extensions],
})
export class UserProfileWrapperModule {}
